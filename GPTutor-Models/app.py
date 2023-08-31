import json
import uuid
from random import randint

from flask import Flask, Response, stream_with_context, request
from g4f import ChatCompletion
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


def generate_stream(stream):
    count = 0
    for chunk in stream:
        count += 1
        yield 'data:' + get_event_message(chunk) + '\n\n'

    if count == 0:
        raise BadRequest()
    else:
        print("DONE")
        yield "data: [DONE]\n\n"


@app.post('/gpt')
def gpt():
    response = ChatCompletion.create(
        model=request.json["model"],
        messages=request.json["messages"],
        chatId=uuid.uuid4(),
        stream=True
    )

    return Response(generate_stream(stream_with_context(response)), mimetype='text/event-stream;charset=UTF-8')


if __name__ == '__main__':
    app.run(debug=False, port=1338, host="localhost")
