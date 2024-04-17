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
    "command_r_plus": command_r_plus,
    "dbrx_instruct": dbrx_instruct,
    "mixtral_8x22b": mixtral_8x22b,
    "gpt-4-bing": Model(
        name='gpt-4',
        base_provider='openai',
        best_provider=RetryProvider([Bing])
    )
}


def get_event_message(chunk, model):
    return json.dumps({
        "id": str(randint(0, 10000000)),
        "object": "chat.completion.chunk",
        "model": model,
        "choices": [
            {
                "index": 0,
                "delta": {"content": chunk},
                "finish_reason": None
            }
        ]
    })


def create_completions(model, messages):
    client = Client()

    response = client.chat.completions.create(
        model=models_dict[model],
        messages=messages,
        stream=True,
        web_search=True
    )

    for token in response:
        content = token.choices[0].delta.content
        if content is not None:
            yield 'data:' + get_event_message(token.choices[0].delta.content, model) + '\n\n'

    yield "data: [DONE]\n\n"
