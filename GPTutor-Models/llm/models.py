import random
import sched
import time

from g4f.Provider import Bing, DeepInfra
from g4f.models import blackbox, llama3_70b_instruct, llama3_8b_instruct, llama2_7b, llama2_13b, llama2_70b, \
    dbrx_instruct, mixtral_8x22b, Model, claude_3_opus, pi
from g4f.providers.retry_provider import RetryProvider
from g4f.client import Client

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
        "model": llama2_7b
    },
    "llama2_13b": {
        "stream": True,
        "model": llama2_13b
    },
    "llama2_70b": {
        "stream": True,
        "model": llama2_70b
    },
    "dbrx_instruct": {
        "stream": True,
        "model": dbrx_instruct
    },
    "mixtral_8x22b": {
        "stream": True,
        "model": Model(
            name="mistralai/Mixtral-8x22B-Instruct-v0.1",
            base_provider="huggingface",
            best_provider=DeepInfra
        )
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

models = [
    {
        "model": "gpt-4-bing",
        "description":
            "GPT-4 от Бинг. Самая умная модель из всех существующих на данный момент. Имеет доступ в интернет, в ней всегда актуальные данные",
        "lang": "Имеется поддержка Русского языка",
        "active": True,
    },
    {
        "model": "llama3_70b",
        "description":
            "Llama-3 70b. Аналог GPT-4. Обучена до 2024 года. Новая, одна из самых мощных моделей.",
        "lang": "Имеется частичная поддержка Русского языка",
        "active": True,
    },
    {
        "model": "mixtral_8x22b",
        "description": "Аналог GPT-3.5, Во многих аспектах превосходит GPT-3.5. Обучена до 2024 года",
        "lang": "Имеется поддержка русского",
        "active": True,
    },
    {
        "model": "dbrx_instruct",
        "description": "Аналог GPT-3.5, Модель адаптированная под программирование. Обучена до 2024 года",
        "lang": "Имеется поддержка русского",
        "active": True,
    },
    {
        "model": "llama2_70b",
        "description":
            "Llama-2 70b. Аналог GPT-4. Обучена до 2023 года. Модель чуть хуже, чем Llama-3 70b, но имеет скорость повыше, чем его старшая модель. ",
        "lang": "Имеется частичная поддержка Русского языка",
        "active": True,
    },
    {
        "model": "blackbox",
        "description": "Аналог GPT-4, Имеет доступ интернет, работает быстро",
        "lang": "Плохая поддержка русского языка",
        "active": True,
    },
    {
        "model": "llama3_8b",
        "description":
            "Llama-3 8b. Аналог GPT-3.5. Обучена до 2024 года. Новая и быстрая модель. Отключена поддержа потоковой генерации",
        "lang": "Имеется частичная поддержка Русского языка",
        "active": True,
    },
    {
        "model": "llama2_13b",
        "description":
            "Llama-2 13b. Аналог GPT-3.5. Обучена до 2023 года. Быстрая модель.",
        "lang": "Имеется частичная поддержка Русского языка",
        "active": True,
    },
    {
        "model": "llama2_7b",
        "description":
            "Llama-2 7b. Аналог GPT-3.5. Обучена до 2023 года. Очень быстрая модель.",
        "lang": "Имеется частичная поддержка Русского языка",
        "active": True,
    },
]


def check_model(model, attempts):
    if attempts == 0:
        model["active"] = False
        print("Exception!!!!")
        return

    model_name = model["model"]
    client = Client()
    print("Model: " + model_name)

    try:
        response = client.chat.completions.create(
            api_key="1r_x8Y1GaZoHnUtZeRXYaTVyjPkmPEEPNBMOA0rLZmA7t2l2PyxjIBi0oNuhPCZz0hLT8szD6EtmrKAA1f5bgHtTvyk82l6dw_GoSO8VQpuoXJDDcacvWnCE5a3e6JW7OzLz43zpyuSuI49yawY9IUMt5I9dRaPgFYXtyOTvwIzUfJMXLln18Y3EcrZr-AolskGMND04GZfq-HsaCOFTl_OUOc2w9ZA5N7gWmxvftLdaJN6m4YxSSS9Cwx08oudfb",
            model=models_dict[model_name]["model"],
            messages=[{"role": "user", "content": random.randint(0, 10000000)}],
        )

        print(response.choices[0].message.content)
        model["active"] = True
    except Exception as e:
        print(e)
        model["active"] = False
        print("Exception!!!!")

        check_model(model, attempts - 1)


def check_llm_models(scheduler=None):
    for model in models:
        if "skip_check" in model:
            continue

        check_model(model, 10)

    if scheduler is not None:
        scheduler.enter(600, 1, check_llm_models, (scheduler,))


def run_check_models():
    check_llm_models()

    my_scheduler = sched.scheduler(time.time, time.sleep)
    my_scheduler.enter(600, 1, check_llm_models, (my_scheduler,))
    my_scheduler.run()
