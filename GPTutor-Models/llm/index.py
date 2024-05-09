import json
from random import randint

from g4f.client import Client

from llm.models import models_dict
from llm.proxy import get_proxy


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


def handle_llm(messages, model, stream):
    if model == "gpt_35_turbo":
        return handle_gpt_35(messages)

    client = Client()

    return client.chat.completions.create(
        api_key="1r_x8Y1GaZoHnUtZeRXYaTVyjPkmPEEPNBMOA0rLZmA7t2l2PyxjIBi0oNuhPCZz0hLT8szD6EtmrKAA1f5bgHtTvyk82l6dw_GoSO8VQpuoXJDDcacvWnCE5a3e6JW7OzLz43zpyuSuI49yawY9IUMt5I9dRaPgFYXtyOTvwIzUfJMXLln18Y3EcrZr-AolskGMND04GZfq-HsaCOFTl_OUOc2w9ZA5N7gWmxvftLdaJN6m4YxSSS9Cwx08oudfb",
        model=models_dict[model]["model"],
        stream=stream,
        messages=normalize_messages(model, messages),
        proxy=get_proxy(),
        web_search=True
    )


def handle_gpt_35(messages):
    client = Client()

    try:
        return client.chat.completions.create(
            model=models_dict["gpt_35_turbo"]["model"],
            stream=models_dict["gpt_35_turbo"]["stream"],
            messages=messages,
            proxy=get_proxy()
        )

    except Exception:
        return client.chat.completions.create(
            model=models_dict["mixtral_8x22b"]["model"],
            stream=models_dict["mixtral_8x22b"]["stream"],
            messages=messages,
            proxy=get_proxy()
        )


def create_completions(model, messages):
    stream = models_dict[model]["stream"]

    response = handle_llm(messages, model, stream)

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
