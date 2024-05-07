import threading

from flask import Flask, Response, request

from images.prodia import txt2img
from llm.index import create_completions
from llm.models import models, run_check_models
from vk.bot import run_long_pool

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


def run_flask():
    app.run(debug=False, port=1337, host="0.0.0.0")


if __name__ == '__main__':
    flask_thread = threading.Thread(target=run_flask)
    check_models_thread = threading.Thread(target=run_check_models)
    run_long_pool_thread = threading.Thread(target=run_long_pool)

    flask_thread.start()
    check_models_thread.start()
    run_long_pool_thread.start()
