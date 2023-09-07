import json
import uuid
from random import randint

import requests
from flask import Flask, Response, stream_with_context, request
from g4f import ChatCompletion, Provider
from werkzeug.exceptions import BadRequest

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


if __name__ == '__main__':
    app.run(debug=False, port=1337, host="0.0.0.0")
