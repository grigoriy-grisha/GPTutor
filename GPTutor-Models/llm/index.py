import json
import os
from random import randint

from g4f.Provider import Bing, Llama
from g4f.client import Client
from g4f.models import dbrx_instruct, mixtral_8x22b, llama3_8b_instruct, llama3_70b_instruct, Model, claude_3_opus, pi, \
    blackbox
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
    "blackbox": {
        "stream": True,
        "model": blackbox,
    },
    "llama3_70b": {
        "stream": True,
        "model": llama3_70b_instruct
    },
    "llama3_8b": {
        "stream": True,
        "model": llama3_8b_instruct
    },
    "llama2_7b": {
        "stream": True,
        "model": Model(
            name="meta-llama/Llama-2-7b-chat-hf",
            base_provider='meta',
            best_provider=RetryProvider([Llama])
        )
    },
    "llama2_13b": {
        "stream": True,
        "model": Model(
            name="meta-llama/Llama-2-13b-chat-hf",
            base_provider='meta',
            best_provider=RetryProvider([Llama])
        )
    },
    "llama2_70b": {
        "stream": True,
        "model": Model(
            name="meta-llama/Llama-2-70b-chat-hf",
            base_provider="meta",
            best_provider=RetryProvider([Llama])
        )
    },
    "dbrx_instruct": {
        "stream": True,
        "model": dbrx_instruct
    },
    "mixtral_8x22b": {
        "stream": True,
        "model": mixtral_8x22b
    },
    "gpt-4-bing": {
        "stream": True,
        "model": Model(
            name='gpt-4',
            base_provider='openai',
            best_provider=RetryProvider([Bing])
        )
    },
    "claude_3_opus": {
        "stream": True,
        "model": claude_3_opus
    },
    "claude_3_sonnet": {
        "stream": True,
        "model": claude_3_opus
    },
    "pi": {
        "stream": True,
        "model": pi
    }
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


def normalize_messages(model, messages):
    if model == 'blackbox':
        return [messages[-1]]
    return messages


def create_completions(model, messages):
    client = Client()

    stream = models_dict[model]["stream"]

    print(normalize_messages(model, messages))

    response = client.chat.completions.create(
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
