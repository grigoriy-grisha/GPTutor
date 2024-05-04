import json
import os
from random import randint

from g4f.client import Client

from llm.models import models_dict

os.environ["G4F_PROXY"] = "http://bFLvNd:V0TPu2@45.155.203.207:8000"


def get_event_message(chunk, model, finish_reason):
    return json.dumps({
        "id": str(randint(0, 10000000)),
        "object": "chat.completion.chunk",
        "model": model,
        "choices": [
            {
                "index": 0,
                "delta": {"content": chunk},
                "finish_reason": finish_reason
            }
        ]
    })


def normalize_messages(model, messages):
    if model == 'blackbox':
        return [messages[-1]]
    return messages


def create_completions(model, messages):
    client = Client()

    stream = models_dict[model]["stream"]

    print(normalize_messages(model, messages))

    response = client.chat.completions.create(
        api_key="1r_x8Y1GaZoHnUtZeRXYaTVyjPkmPEEPNBMOA0rLZmA7t2l2PyxjIBi0oNuhPCZz0hLT8szD6EtmrKAA1f5bgHtTvyk82l6dw_GoSO8VQpuoXJDDcacvWnCE5a3e6JW7OzLz43zpyuSuI49yawY9IUMt5I9dRaPgFYXtyOTvwIzUfJMXLln18Y3EcrZr-AolskGMND04GZfq-HsaCOFTl_OUOc2w9ZA5N7gWmxvftLdaJN6m4YxSSS9Cwx08oudfb",
        model=models_dict[model]["model"],
        stream=models_dict[model]["stream"],
        messages=normalize_messages(model, messages),
        web_search=True
    )

    if stream:
        for token in response:
            content = token.choices[0].delta.content
            if content is not None:
                yield 'data:' + get_event_message(token.choices[0].delta.content, model,
                                                  token.choices[0].finish_reason) + '\n\n'

        yield "data: [DONE]\n\n"

        return

    yield 'data:' + get_event_message(response.choices[0].message.content, model, None) + '\n\n'
    yield "data: [DONE]\n\n"
