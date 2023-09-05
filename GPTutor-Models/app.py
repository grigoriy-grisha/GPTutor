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


def generate_stream(stream, except_func, attempt):
    if attempt == 10:
        except_func()

    count = 0
    for chunk in stream:
        count += 1
        yield 'data:' + get_event_message(chunk) + '\n\n'

    if count == 0:
        yield from generate_stream(stream, except_func, attempt + 1)
    else:
        print("DONE")
        yield "data: [DONE]\n\n"


def default_model():
    messages = request.json['messages']

    def raise_func():
        raise BadRequest()

    return Response(
        stream_with_context(
            generate_stream(
                ChatCompletion.create(
                    model=request.json["model"],
                    provider=Provider.DeepAi,
                    messages=messages,
                    chatId=uuid.uuid4(),
                    stream=True
                ),
                raise_func,
                1
            ),

        ),
        mimetype='text/event-stream;charset=UTF-8',
    )


@app.post('/gpt')
def gpt():
    return default_model()


def stream_download_conversation(messages):
    response = requests.post(url="https://api.binjie.fun/api/generateStream",
                             headers={
                                 "origin": "https://chat.jinshutuan.com",
                                 "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ("
                                               "KHTML, like Gecko) Chrome/104.0.5112.79 Safari/537.36",
                             },
                             json={
                                 "system": "",
                                 "withoutContext": False,
                                 "stream": True,
                                 "messages": messages
                             }, stream=True)

    for chunk in response.iter_content(chunk_size=8):
        yield chunk.decode('utf-8', "ignore")


if __name__ == '__main__':
    app.run(debug=True, port=1337, host="0.0.0.0")
