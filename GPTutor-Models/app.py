import asyncio
from concurrent import futures

from flask import Flask, Response, request

from images.dalle3 import generate_dalle
from images.prodia import txt2img
from llm.index import create_completions
from llm.models import models
from vk.bot import run_long_pool
from vk_docs.index import create_question_vk_doc

app = Flask(__name__)


@app.post('/llm')
def llm_post():
    return Response(
        create_completions(
            request.json["model"],
            request.json["messages"]
        ),
        mimetype='text/event-stream;charset=UTF-8'
    )


@app.get('/llm')
def llm_get():
    return models


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
    try:
        result = generate_dalle(
            prompt=request.json["prompt"],
        )

        if result['image'] is None:
            raise Exception()

        return {"output": [result['image']]}

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
    app.run(debug=False, port=1337, host="0.0.0.0")


if __name__ == '__main__':
    with futures.ThreadPoolExecutor(max_workers=2) as executor:
        future1 = executor.submit(run_long_pool)
        future2 = executor.submit(run_flask)
