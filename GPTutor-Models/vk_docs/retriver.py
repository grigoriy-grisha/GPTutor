### Index
import os
from pprint import pprint

from langchain.retrievers import MultiVectorRetriever, MergerRetriever
from langchain_community.embeddings import GigaChatEmbeddings
from langchain_community.llms.gigachat import GigaChat
from langchain_community.vectorstores import FAISS

os.environ[
    "GIGACHAT_CREDENTIALS"] = "OTEwZmNhMDAtOGQ1Mi00ZWM5LWFjMjgtZGZjMWVjNDdjNmE4OmE2NDM3ODY1LWI4YjgtNDRlYS1hNjUyLWNmNjVhZGY0MzcwZA=="

# print(len(vk_links))
# docs = [WebBaseLoader(url).load() for url in vk_links]
# docs_list = [item for sublist in docs for item in sublist]
#
# text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
#     chunk_size=500, chunk_overlap=150
# )
# doc_splits = text_splitter.split_documents(docs_list)

embeddings = GigaChatEmbeddings(ssl_verify=False,
                                verify_ssl_certs=False,
                                scope="GIGACHAT_API_PERS")

llm = GigaChat(profanity_check=False, ssl_verify=False,
               verify_ssl_certs=False, temperature=0.1)

script_dir = os.path.dirname(os.path.realpath(__file__))

print(os.path.join(script_dir, "faiss_vk_docs_index"))
vectorstore_vk_docs_index = FAISS.load_local(os.path.join(script_dir, "faiss_vk_docs_index"), embeddings=embeddings,
                                             allow_dangerous_deserialization=True)
vectorstore_vk_ui_docs_index = FAISS.load_local(os.path.join(script_dir, "faiss_vk_docs_index"), embeddings=embeddings,
                                                allow_dangerous_deserialization=True)
vectorstore_vk_videos_index = FAISS.load_local(os.path.join(script_dir, "faiss_vk_docs_index"), embeddings=embeddings,
                                               allow_dangerous_deserialization=True)

# retriever = vectorstore.as_retriever(search_kwargs={"k": 6})

retrievers = [
    vector.as_retriever(
        search_kwargs={"k": 4},
    )
    for vector in [vectorstore_vk_docs_index, vectorstore_vk_ui_docs_index, vectorstore_vk_videos_index]
]

retriever = MergerRetriever(retrievers=retrievers)

#
# retriever = MultiVectorRetriever(
#     vectorstore=vectorstore,
#     vectorstore2=vectorstore2,
#     vectorstore3=vectorstore3,
# )

### Retrieval Grader

from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# # Data model
# prompt = PromptTemplate(
#     template="""<|begin_of_text|><|start_header_id|>system<|end_header_id|> You are a grader assessing relevance
#     of a retrieved document to a user question. If the document contains keywords related to the user question,
#     grade it as relevant. It does not need to be a stringent test. The goal is to filter out erroneous retrievals. \n
#     Give a binary_score 'yes' or 'no' score to indicate whether the document is relevant to the question. \n
#     Provide the binary score as a JSON with a single key 'score' and no premable or explaination.
#      <|eot_id|><|start_header_id|>user<|end_header_id|>
#     Here is the retrieved document: \n\n {document} \n\n
#     Here is the user question: {question} \n <|eot_id|><|start_header_id|>assistant<|end_header_id|>
#     """,
#     input_variables=["question", "document"],
# )
#
# retrieval_grader = prompt | llm | StrOutputParser()

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

from langchain import hub
from langchain_core.output_parsers import StrOutputParser

# Prompt
prompt = hub.pull("rlm/rag-prompt")


# Post-processing
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


llm_generate = GigaChat(profanity_check=False, ssl_verify=False,
                        verify_ssl_certs=False, temperature=1)

# Chain
rag_chain = prompt | llm_generate | StrOutputParser()

### Hallucination Grader

# Data model

# Prompt
system = """Вы являетесь оценщиком, который оценивает, основано ли поколение LLM на наборе извлеченных фактов или подкреплено им. \n
 Поставьте оценку "yes" или "no". "yes" означает, что ответ основан на наборе фактов или подтверждается ими."""
hallucination_prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system),
        ("human", "Факты: \n\n {documents} \n\n генерация LLM: {generation}"),
    ]
)

hallucination_grader = hallucination_prompt | llm | StrOutputParser()

### Answer Grader


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

# Prompt
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
    print(documents)
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

    grade = "yes"
    # Check hallucination
    if grade.lower() == "yes":
        print("---DECISION: GENERATION IS GROUNDED IN DOCUMENTS---")
        # Check question-answering
        print("---GRADE GENERATION vs QUESTION---")
        grade = "yes"
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

# Define the nodes
workflow.add_node("retrieve", retrieve)  # retrieve
workflow.add_node("grade_documents", grade_documents)  # grade documents
workflow.add_node("generate", generate)  # generatae
workflow.add_node("transform_query", transform_query)  # transform_query

# Build graph
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

app_vk_docs = workflow.compile()
