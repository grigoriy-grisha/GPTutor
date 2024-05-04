import asyncio
import json
import threading

from flask import Flask, Response, request

from images.sd import textToImage
from llm.index import create_completions
from llm.models import run_check_models, models

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
    return json.dumps({
        "response": models
    })


@app.post("/image")
def image():
    print(request.json["loraModel"])
    return textToImage(
        prompt=request.json["prompt"],
        model_id=request.json["modelId"],
        negative_prompt=request.json["negativePrompt"],
        scheduler=request.json["scheduler"],
        guidance_scale=request.json["guidanceScale"],
        seed=request.json["seed"],
        width=request.json["width"],
        height=request.json["height"],
        num_inference_steps=request.json["numInferenceSteps"],
        upscale=request.json["upscale"],
        samples=request.json["samples"],
        lora_model=request.json["loraModel"]
    )


def run_flask():
    app.run(debug=False, port=1337, host="0.0.0.0")


if __name__ == '__main__':
    flask_thread = threading.Thread(target=run_flask)
    check_models_thread = threading.Thread(target=run_check_models)
    flask_thread.start()
    check_models_thread.start()
