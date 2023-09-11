import json
import uuid
from io import BytesIO
from random import randint

import freeGPT
from flask import Flask, Response, request, make_response
from g4f import ChatCompletion, Provider
from werkzeug.exceptions import BadRequest

from images.prodia import prodia

app = Flask(__name__)


def get_event_message(chunk):
    return json.dumps({
        "id": str(randint(0, 10000000)),
        "object": "chat.completion.chunk",
        "model": "gpt-3.5-turbo",
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
                model=request.json["model"],
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


async def generate_image(prompt):
    return await getattr(freeGPT, "prodia").Generation().create(prompt)


@app.post("/image")
async def image():
    print(request.json["model"])
    response = make_response(BytesIO(await prodia(prompt=request.json["prompt"], model=request.json["model"])).getvalue())
    response.headers['Content-Type'] = 'image/png'

    return response


if __name__ == '__main__':
    app.run(debug=False, port=1337, host="0.0.0.0")
