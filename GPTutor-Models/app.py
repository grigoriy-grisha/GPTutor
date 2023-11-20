import json
import uuid
from random import randint

from flask import Flask, Response, request
from g4f import ChatCompletion, Provider
from werkzeug.exceptions import BadRequest

from images.sd import textToImage

app = Flask(__name__)


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


if __name__ == '__main__':
    app.run(debug=True, port=1337, host="0.0.0.0")
