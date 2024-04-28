import json
import os
from random import randint

from g4f.Provider import Bing
from g4f.client import Client
from g4f.models import dbrx_instruct, mixtral_8x22b, command_r_plus, Model
from g4f.providers.retry_provider import RetryProvider

os.environ["G4F_PROXY"] = "http://bFLvNd:V0TPu2@45.155.203.207:8000"

models = [
    {
        "model": "gpt-3.5",
        "description": "Основная модель. Обучена до 2021 года",
        "lang": "Имеется поддержка русского",
    },
    {
        "model": "mixtral_8x22b",
        "description": "Аналог GPT-3.5, Во многих аспектах превосходит GPT-3.5. Обучена до 2024 года",
        "lang": "Имеется поддержка русского",
    },
    {
        "model": "dbrx_instruct",
        "description": "Аналог GPT-3.5, Модель адаптированная под программирование. Обучена до 2024 года",
        "lang": "Имеется поддержка русского",
    },
    {
        "model": "codellama_70b_instruct",
        "description": "Аналог GPT-3.5, Модель адаптированная под программирование. Обучена до 2023 года",
        "lang": "Слабая поддержка русского",
    },

]

models_dict = {
    "llama3_70b": {
        "stream": False,
        "model": Model(
            name="meta-llama/Meta-Llama-3-70B-Instruct",
            base_provider="meta",
            best_provider=Llama
        )
    },
    "llama3_8b": {
        "stream": False,
        "model": Model(
            name="meta-llama/Meta-Llama-3-8B-Instruct",
            base_provider="meta",
            best_provider=Llama
        )
    },
    "dbrx_instruct": {
        "stream": True,
        "model": dbrx_instruct
    },
    "mixtral_8x22b": {
        "stream": True,
        "model": dbrx_inmixtral_8x22bstruct
    },
}


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


def create_completions(model, messages):
    client = Client()

    stream = models_dict[model]["stream"]

    response = client.chat.completions.create(
        model=models_dict[model]["model"],
        stream=models_dict[model]["stream"],
        messages=messages,
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


