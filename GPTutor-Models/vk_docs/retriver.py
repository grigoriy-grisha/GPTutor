### Index
import os
from pprint import pprint

import numpy as np
from langchain.retrievers import MergerRetriever
from langchain.vectorstores import faiss
from langchain_community.embeddings import GigaChatEmbeddings
from langchain_community.llms.gigachat import GigaChat
from langchain_community.vectorstores import FAISS

from vk_docs.utils import unique_objects_by_field

os.environ[
    "GIGACHAT_CREDENTIALS"] = "OTEwZmNhMDAtOGQ1Mi00ZWM5LWFjMjgtZGZjMWVjNDdjNmE4OmE2NDM3ODY1LWI4YjgtNDRlYS1hNjUyLWNmNjVhZGY0MzcwZA=="

embeddings = GigaChatEmbeddings(ssl_verify=False,
                                verify_ssl_certs=False,
                                scope="GIGACHAT_API_PERS")

llm = GigaChat(model="GigaChat-Plus", profanity_check=False, ssl_verify=False,
               verify_ssl_certs=False, temperature=0.1)

script_dir = os.path.dirname(os.path.realpath(__file__))

vectorstore_vk_docs_index = FAISS.load_local(os.path.join(script_dir, "faiss_vk_docs_index"), embeddings=embeddings,
                                             allow_dangerous_deserialization=True)
vectorstore_vk_ui_docs_index = FAISS.load_local(os.path.join(script_dir, "faiss_vk_ui_docs_index"),
                                                embeddings=embeddings,
                                                allow_dangerous_deserialization=True)
vectorstore_vk_videos_index = FAISS.load_local(os.path.join(script_dir, "faiss_vk_videos_index"), embeddings=embeddings,
                                               allow_dangerous_deserialization=True)


def get_docs_index(vectorstore, field):
    docs = []

    for doc_id in vectorstore.index_to_docstore_id.values():
        docs.append(vectorstore.docstore.search(doc_id).metadata)
    return unique_objects_by_field(docs, field)


# print(get_docs_index(vectorstore_vk_docs_index, "source"))
# print(get_docs_index(vectorstore_vk_ui_docs_index, "source"))
# print(get_docs_index(vectorstore_vk_videos_index, "link"))

# def get_docs(source: str):
# if source == "vk_api_docs":


def create_retriever_app(source: str):
    def get_retriever():
        if source == "all":
            retrievers = [
                vector.as_retriever(
                    search_kwargs={"k": 3},
                )
                for vector in [vectorstore_vk_docs_index, vectorstore_vk_ui_docs_index, vectorstore_vk_videos_index]
            ]

            return MergerRetriever(retrievers=retrievers)

        if source == "vk_api_docs":
            return vectorstore_vk_docs_index.as_retriever(search_kwargs={"k": 6})

        if source == "vk_ui":
            return vectorstore_vk_ui_docs_index.as_retriever(search_kwargs={"k": 6})

        return vectorstore_vk_videos_index.as_retriever(search_kwargs={"k": 6})

    from langchain_core.prompts import ChatPromptTemplate
    from langchain_core.output_parsers import StrOutputParser

    retriever = get_retriever()

    # Prompt
    system = """Вы являетесь оценщиком, оценивающим соответствие полученного документа вопросу пользователя. \n
     Это не обязательно должен быть строгий тест. Цель состоит в том, чтобы отфильтровать ошибочные результаты поиска. \n
     Если документ содержит ключевые слова или семантическое значение, связанное с вопросом пользователя, оцените его как относящийся к делу. \n
     Укажите двоичную оценку "yes" или "no", чтобы указать, соответствует ли документ заданному вопросу."""
    grade_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system),
            ("human", "Retrieved document: \n\n {document} \n\n User question: {question}"),
        ]
    )

    retrieval_grader = grade_prompt | llm | StrOutputParser()

    from langchain_core.output_parsers import StrOutputParser

    system = """Вы являетесь профессионалом по экосистеме вконтакте, вы знаете все о документации VK API и VKUI c React, VK Bridge.
    Все, что касается VKUI и Рекат компонентов должно быть реализовано в реакте.
    Используйте следующие фрагменты полученного контекста, чтобы ответить на вопрос.
    Если вы не знаете ответа, просто скажите, что не знаете.
    Старайтесь подробно описывать и вдумываться в контекст, который был вам передам.
    \nВопрос: {question} \nКонтекст: {context} \nОтвет:
    """

    prompt = ChatPromptTemplate.from_template(system)

    def format_docs(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    llm_generate = GigaChat(model="GigaChat-Plus", profanity_check=False, ssl_verify=False,
                            verify_ssl_certs=False, temperature=1)

    rag_chain = prompt | llm_generate | StrOutputParser()

    system = """Вы являетесь оценщиком, который оценивает, основано ли поколение LLM на наборе извлеченных фактов или подкреплено им. \n
     Поставьте оценку "yes" или "no". "yes" означает, что ответ основан на наборе фактов или подтверждается ими."""
    hallucination_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system),
            ("human", "Факты: \n\n {documents} \n\n генерация LLM: {generation}"),
        ]
    )

    hallucination_grader = hallucination_prompt | llm | StrOutputParser()

    # Prompt
    system = """Вы оценщик, который оценивает, касается ли ответ вопроса/решает ли его\n
    Дайте двоичную оценку «yes» или «no». «yes» означает, что ответ решает вопрос."""
    answer_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system),
            ("human", "Вопрос пользователя: \n\n {question} \n\n генерация LLM: {generation}"),
        ]
    )

    answer_grader = answer_prompt | llm | StrOutputParser()

    system = """Вы переписчик вопросов, который преобразует исходный вопрос в улучшенную версию, оптимизированную
    для поиска в vectorstore. Посмотрите на исходные данные и попытайтесь разобраться в семантическом смысле, лежащем в их основе."""
    re_write_prompt = ChatPromptTemplate.from_messages(
        [
            ("system", system),
            ("human", "Тут изначальнйы вопрос: \n\n {question} \n Сформулируй более улучшенную версию вопроса."),
        ]
    )

    question_rewriter = re_write_prompt | llm_generate | StrOutputParser()

    from typing_extensions import TypedDict
    from typing import List

    class GraphState(TypedDict):
        """
        Represents the state of our graph.

        Attributes:
            question: question
            generation: LLM generation
            documents: list of documents
        """
        question: str
        generation: str
        documents: List[str]

    def retrieve(state):
        """
        Retrieve documents

        Args:
            state (dict): The current graph state

        Returns:
            state (dict): New key added to state, documents, that contains retrieved documents
        """
        print("---RETRIEVE---")
        question = state["question"]

        # Retrieval
        documents = retriever.get_relevant_documents(question, )
        return {"documents": documents, "question": question}

    def generate(state):
        """
        Generate answer

        Args:
            state (dict): The current graph state

        Returns:
            state (dict): New key added to state, generation, that contains LLM generation
        """
        print("---GENERATE---")
        question = state["question"]
        documents = state["documents"]

        # RAG generation
        generation = rag_chain.invoke({"context": documents, "question": question})
        return {"documents": documents, "question": question, "generation": generation}

    def grade_documents(state):
        """
        Determines whether the retrieved documents are relevant to the question.

        Args:
            state (dict): The current graph state

        Returns:
            state (dict): Updates documents key with only filtered relevant documents
        """

        print("---CHECK DOCUMENT RELEVANCE TO QUESTION---")
        question = state["question"]
        documents = state["documents"]

        # Score each doc
        filtered_docs = []
        for d in documents:
            grade = retrieval_grader.invoke({"question": question, "document": d.page_content})
            if grade.lower() == "yes":
                print("---GRADE: DOCUMENT RELEVANT---")
                filtered_docs.append(d)
            else:
                print("---GRADE: DOCUMENT NOT RELEVANT---")
                continue
        return {"documents": filtered_docs, "question": question}

    def transform_query(state):
        """
        Transform the query to produce a better question.

        Args:
            state (dict): The current graph state

        Returns:
            state (dict): Updates question key with a re-phrased question
        """

        print("---TRANSFORM QUERY---")
        question = state["question"]
        documents = state["documents"]

        # Re-write question
        better_question = question_rewriter.invoke({"question": question})
        print(better_question)
        return {"documents": documents, "question": better_question}

    def decide_to_generate(state):
        """
        Determines whether to generate an answer, or re-generate a question.

        Args:
            state (dict): The current graph state

        Returns:
            str: Binary decision for next node to call
        """

        print("---ASSESS GRADED DOCUMENTS---")
        question = state["question"]
        filtered_documents = state["documents"]

        if not filtered_documents:
            # All documents have been filtered check_relevance
            # We will re-generate a new query
            print("---DECISION: ALL DOCUMENTS ARE NOT RELEVANT TO QUESTION, TRANSFORM QUERY---")
            return "transform_query"
        else:
            # We have relevant documents, so generate answer
            print("---DECISION: GENERATE---")
            return "generate"

    def grade_generation_v_documents_and_question(state):
        """
        Determines whether the generation is grounded in the document and answers question.

        Args:
            state (dict): The current graph state

        Returns:
            str: Decision for next node to call
        """

        print("---CHECK HALLUCINATIONS---")
        question = state["question"]
        documents = state["documents"]
        generation = state["generation"]

        grade = hallucination_grader.invoke({"documents": documents, "generation": generation})
        print(grade)
        # Check hallucination
        if grade.lower() == "yes":
            print("---DECISION: GENERATION IS GROUNDED IN DOCUMENTS---")
            # Check question-answering
            print("---GRADE GENERATION vs QUESTION---")
            grade = answer_grader.invoke({"question": question, "generation": generation})
            if grade.lower() == "yes":
                print("---DECISION: GENERATION ADDRESSES QUESTION---")
                return "useful"
            else:
                print("---DECISION: GENERATION DOES NOT ADDRESS QUESTION---")
                return "not useful"
        else:
            pprint("---DECISION: GENERATION IS NOT GROUNDED IN DOCUMENTS, RE-TRY---")
            return "not supported"

    from langgraph.graph import END, StateGraph

    workflow = StateGraph(GraphState)

    workflow.add_node("retrieve", retrieve)  # retrieve
    workflow.add_node("grade_documents", grade_documents)  # grade documents
    workflow.add_node("generate", generate)  # generatae
    workflow.add_node("transform_query", transform_query)  # transform_query

    workflow.set_entry_point("retrieve")
    workflow.add_edge("retrieve", "grade_documents")
    workflow.add_conditional_edges(
        "grade_documents",
        decide_to_generate,
        {
            "transform_query": "transform_query",
            "generate": "generate",
        },
    )

    workflow.add_edge("transform_query", "retrieve")
    workflow.add_conditional_edges(
        "generate",
        grade_generation_v_documents_and_question,
        {
            "not supported": "generate",
            "useful": END,
            "not useful": "transform_query",
        },
    )

    return workflow.compile()
