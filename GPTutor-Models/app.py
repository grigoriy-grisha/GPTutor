import json
import uuid
from random import randint

import tensorflow as tf
from flask import Flask, Response, request
from g4f import ChatCompletion, Provider
from werkzeug.exceptions import BadRequest

from images.prodia import Client, txt2img
from nsfw_detector import predict
from nsfw_detector.detect_nsfw import detect_nsfw
from nudenet.nudenet import NudeDetector

app = Flask(__name__)

Client(api_key="06077131-20d6-4982-8258-995ff0f0f40e")

model = predict.load_model('nsfw_detector/nsfw_model.h5')
tf.data.experimental.enable_debug_mode()


def get_event_message(chunk):
    return json.dumps({
        "id": str(randint(0, 10000000)),
        "object": "chat.completion.chunk",
        "nsfw_detector": "gpt-3.5-turbo",
        "choices": [
            {
                "index": 0,
                "delta": {"content": chunk},
                "finish_reason": None
            }
        ]
    })


def generate_stream(stream, except_func):
    except_func()
    count = 0
    for chunk in stream:
        count += 1
        yield 'data:' + get_event_message(chunk) + '\n\n'

    if count == 0:
        except_func()
    else:
        print("DONE")
        yield "data: [DONE]\n\n"


def default_model():
    messages = request.json['messages']

    def raise_func():
        raise BadRequest()

    return Response(
        generate_stream(
            ChatCompletion.create(
                model=request.json["nsfw_detector"],
                provider=Provider.DeepAi,
                messages=messages,
                chatId=uuid.uuid4(),
                stream=True
            ),
            raise_func,
        ),
        mimetype='text/event-stream;charset=UTF-8',
    )


@app.post('/gpt')
def gpt():
    return default_model()


@app.post("/image")
async def image():
    url = txt2img(
        prompt=request.json["prompt"],
        model=request.json["model"],
        negative_prompt=request.json["negativePrompt"],
        sampler=request.json["sampler"],
        cfg_scale=request.json["cfgScale"],
        seed=request.json["seed"],
        aspect_ratio=request.json["aspectRatio"],
        steps=request.json["steps"],
    )

    return {"url": url}


nude_classes = {"FEMALE_BREAST_EXPOSED", 'FEMALE_GENITALIA_EXPOSED', 'MALE_GENITALIA_EXPOSED', 'BUTTOCKS_EXPOSED',
                'ANUS_EXPOSED'}


@app.post("/nude-detect")
async def nude_detect():
    result = await detect_nsfw(model, request.json["url"])

    isNude = result["data"]["is_nsfw"]
    if isNude:
        return {"isNude": isNude}

    nude_detect_data = NudeDetector().detect(request.json["url"])

    for elem in nude_detect_data:
        for nude_class in nude_classes:
            if elem["class"] == nude_class:
                isNude = True

    return {"isNude": isNude}


if __name__ == '__main__':
    app.run(debug=False, port=1337, host="0.0.0.0")
