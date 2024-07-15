from vk_docs.retriver import app_vk_docs


def create_question_vk_doc(question):
    for output in app_vk_docs.stream({"question": question}):
        if "generate" in output:
            def get_document(document):
                print(document)
                return {
                    "metadata": document.metadata,
                    "page_content": document.page_content
                }

            return {
                "question": question,
                "generation": output["generate"]["generation"],
                "documents": list(map(get_document, output["generate"]["documents"]))
            }
