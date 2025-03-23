from flask import Flask, request

from images.dalle3 import generate_dalle
from images.prodia import txt2img
from vk_docs.index import create_question_vk_doc

app = Flask(__name__)


@app.post('/llm')
def llm_post():
    return None


@app.get('/llm')
def llm_get():
    return []


@app.post("/image")
def image():
    return txt2img(
        prompt=request.json["prompt"],
        model=request.json["modelId"],
        negative_prompt=request.json["negativePrompt"],
        scheduler=request.json["scheduler"],
        guidance_scale=request.json["guidanceScale"],
        seed=request.json["seed"],
        steps=request.json["numInferenceSteps"],
    )


@app.post("/vk-doc-question")
def vk_doc_question():
    return create_question_vk_doc(
        question=request.json["question"],
        source=request.json["source"]
    )


@app.post("/dalle")
def dalle():
    print(request.json)

    try:
        return txt2img(
            prompt=request.json["prompt"],
            model=request.json["modelId"],
            negative_prompt=request.json["negativePrompt"],
            scheduler=request.json["scheduler"],
            guidance_scale=request.json["guidanceScale"],
            seed=request.json["seed"],
            steps=request.json["numInferenceSteps"],
        )

    except Exception as e:
        print(e)
        return txt2img(
            prompt=request.json["prompt"],
            model=request.json["modelId"],
            negative_prompt=request.json["negativePrompt"],
            scheduler=request.json["scheduler"],
            guidance_scale=request.json["guidanceScale"],
            seed=request.json["seed"],
            steps=request.json["numInferenceSteps"],
        )


def run_flask():
    app.run(debug=True, port=1337, host="0.0.0.0")


if __name__ == '__main__':
    run_flask()
