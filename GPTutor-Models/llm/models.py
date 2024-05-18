import random
import sched
import time

from g4f.Provider import Bing, You, OpenaiChat, ChatgptNext, Aichatos, Feedough, Koala
from g4f.client import Client
from g4f.models import blackbox, Model, claude_3_opus, pi
from g4f.providers.retry_provider import RetryProvider

from llm.DeepInfra import DeepInfra
from llm.proxy import get_proxy

wizardLM_2_8x22B = Model(
    name="microsoft/WizardLM-2-8x22B",
    base_provider="huggingface",
    best_provider=RetryProvider([DeepInfra])
)

wizardLM_2_7B = Model(
    name="microsoft/WizardLM-2-7B",
    base_provider="huggingface",
    best_provider=RetryProvider([DeepInfra])
)

gemma_1_1_7b = Model(
    name="google/gemma-1.1-7b-it",
    base_provider="huggingface",
    best_provider=RetryProvider([DeepInfra])
)

mixtral_8x7B = Model(
    name="mistralai/Mixtral-8x7B-Instruct-v0.1",
    base_provider="huggingface",
    best_provider=RetryProvider([DeepInfra])
)

mistral_7B = Model(
    name="mistralai/Mistral-7B-Instruct-v0.2",
    base_provider="huggingface",
    best_provider=RetryProvider([DeepInfra])
)

dolphin_26_mixtral_8x7b = Model(
    name="cognitivecomputations/dolphin-2.6-mixtral-8x7b",
    base_provider="huggingface",
    best_provider=RetryProvider([DeepInfra])
)

lzlv_70b_fp16_hf = Model(
    name="lizpreciatior/lzlv_70b_fp16_hf",
    base_provider="huggingface",
    best_provider=RetryProvider([DeepInfra])
)

openchat_35 = Model(
    name="openchat/openchat_3.5",
    base_provider="huggingface",
    best_provider=RetryProvider([DeepInfra])
)

airoboros_70b = Model(
    name="deepinfra/airoboros-70b",
    base_provider="huggingface",
    best_provider=RetryProvider([DeepInfra])
)

llama3_70b_instruct = Model(
    name="meta-llama/Meta-Llama-3-70B-Instruct",
    base_provider="meta",
    best_provider=RetryProvider([DeepInfra])
)

llama3_8b_instruct = Model(
    name="meta-llama/Meta-Llama-3-8B-Instruct",
    base_provider="meta",
    best_provider=RetryProvider([DeepInfra])
)

codellama_34b_v2 = Model(
    name="Phind/Phind-CodeLlama-34B-v2",
    base_provider="meta",
    best_provider=RetryProvider([DeepInfra])
)

llama2_7b = Model(
    name="meta-llama/Llama-2-7b-chat-hf",
    base_provider='meta',
    best_provider=RetryProvider([DeepInfra])
)

llama2_13b = Model(
    name="meta-llama/Llama-2-13b-chat-hf",
    base_provider='meta',
    best_provider=RetryProvider([DeepInfra])
)

llama2_70b = Model(
    name="meta-llama/Llama-2-70b-chat-hf",
    base_provider="meta",
    best_provider=RetryProvider([DeepInfra])
)

dbrx_instruct = Model(
    name='databricks/dbrx-instruct',
    base_provider='mistral',
    best_provider=RetryProvider([DeepInfra])
)

gpt_35_turbo = Model(
    name='gpt-3.5-turbo',
    base_provider='openai',
    best_provider=RetryProvider([
        ChatgptNext,
        Koala,
        OpenaiChat,
        Aichatos,
        Feedough,
    ])
)

models_dict = {
    "gpt_35_turbo": {
        "stream": True,
        "model": gpt_35_turbo,
    },
    "blackbox": {
        "stream": True,
        "model": blackbox,
    },
    "codellama_34b_v2": {
        "stream": True,
        "model": codellama_34b_v2
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
    "wizardLM_2_8x22B": {
        "stream": True,
        "model": wizardLM_2_8x22B
    },
    "wizardLM_2_7B": {
        "stream": True,
        "model": wizardLM_2_7B
    },
    "lzlv_70b_fp16_hf": {
        "stream": True,
        "model": lzlv_70b_fp16_hf
    },
    "openchat_35": {
        "stream": True,
        "model": openchat_35
    },
    "airoboros_70b": {
        "stream": True,
        "model": airoboros_70b
    },
    "mixtral_8x7B": {
        "stream": True,
        "model": mixtral_8x7B
    },
    "mistral_7B": {
        "stream": True,
        "model": mistral_7B
    },
    "dolphin_26_mixtral_8x7b": {
        "stream": True,
        "model": dolphin_26_mixtral_8x7b
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
        "model": "gpt_35_turbo",
        "description": "GPT-3.5. Основная модель. Обучена до 2021 года",
        "lang": "Имеется поддержка Русского языка",
        "free": True,
        "active": True,
    },
    {
        "model": "gpt-4-bing",
        "description":
            "GPT-4 от Бинг. Самая умная модель из всех существующих на данный момент. Имеет доступ в интернет, в ней всегда актуальные данные",
        "lang": "Имеется поддержка Русского языка",
        "free": False,
        "active": True,
    },

    {
        "model": "llama3_70b",
        "description":
            "Llama-3 70b. Аналог GPT-4. Обучена до 2024 года. Новая, одна из самых мощных моделей.",
        "lang": "Имеется частичная поддержка Русского языка",
        "free": False,
        "active": True,
    },
    {
        "model": "airoboros_70b",
        "description": "Аналог GPT-4. Улучшенная версия Llama2-70b",
        "lang": "Имеется поддержка Русского языка",
        "free": False,
        "active": True,
    },
    {
        "model": "codellama_34b_v2",
        "description":
            "Аналог GPT-4. Улучшенная модель llama-2 70b заточенная специально под программирование.",
        "lang": "Имеется частичная поддержка Русского языка",
        "free": False,
        "active": True,
    },
    {
        "model": "dolphin_26_mixtral_8x7b",
        "description":
            "Аналог GPT-3.5. Модель заточенная специально под программирование",
        "lang": "Имеется поддержка Русского языка",
        "free": False,
        "active": True,
    },
    {
        "model": "wizardLM_2_8x22B",
        "description":
            "Аналог GPT-3.5. Модель от microsoft. Хорошо подходит для обычного общения и соченения историй",
        "lang": "Имеется поддержка Русского языка",
        "free": False,
        "active": True,
    },
    {
        "model": "gemma_1_1_7b",
        "description":
            "Аналог GPT-3.5. Модель от goggle. Хорошо подходит для программирования и обычного общения",
        "lang": "Имеется поддержка Русского языка",
        "free": False,
        "active": True,
    },
    {
        "model": "mixtral_8x7B",
        "description":
            "Аналог чем GPT-3.5. Хорошо подходит для программирования, работает быстро",
        "lang": "Имеется поддержка Русского языка",
        "free": False,
        "active": True,
    },
    {
        "model": "mistral_7B",
        "description":
            "Аналог чем GPT-3.5. Хорошо подходит для программирования, работает быстро",
        "lang": "Имеется поддержка Русского языка",
        "free": False,
        "active": True,
    },
    {
        "model": "lzlv_70b_fp16_hf",
        "description":
            "Аналог GPT-3.5. Креативная модель, хорошо подходит для развлечения и создания контента",
        "lang": "Имеется поддержка Русского языка",
        "free": False,
        "active": True,
    },
    {
        "model": "openchat_35",
        "description":
            "Полный аналог gpt-3.5",
        "lang": "Имеется поддержка Русского языка",
        "free": False,
        "active": True,
    },

    {
        "model": "mixtral_8x22b",
        "description": "Аналог GPT-3.5, Во многих аспектах превосходит GPT-3.5. Обучена до 2024 года",
        "lang": "Имеется поддержка русского",
        "free": False,
        "active": True,
    },
    # {
    #     "model": "dbrx_instruct",
    #     "description": "Аналог GPT-3.5, Модель адаптированная под программирование. Обучена до 2024 года",
    #     "lang": "Имеется поддержка русского",
    #     "free": False,
    #     "active": True,
    # },
    {
        "model": "llama2_70b",
        "description":
            "Llama-2 70b. Аналог GPT-4. Обучена до 2023 года. Модель чуть хуже, чем Llama-3 70b, но имеет скорость повыше, чем его старшая модель. ",
        "lang": "Имеется частичная поддержка Русского языка",
        "free": False,
        "active": True,
    },
    # {
    #     "model": "blackbox",
    #     "description": "Аналог GPT-4, Имеет доступ интернет, работает быстро",
    #     "lang": "Плохая поддержка русского языка",
    #     "free": False,
    #     "active": True,
    # },
    {
        "model": "llama3_8b",
        "description":
            "Llama-3 8b. Аналог GPT-3.5. Обучена до 2024 года. Новая и быстрая модель. Отключена поддержа потоковой генерации",
        "lang": "Имеется частичная поддержка Русского языка",
        "free": False,
        "active": True,
    },
    # {
    #     "model": "llama2_13b",
    #     "description":
    #         "Llama-2 13b. Аналог GPT-3.5. Обучена до 2023 года. Быстрая модель.",
    #     "lang": "Имеется частичная поддержка Русского языка",
    #     "free": False,
    #     "active": True,
    # },
    {
        "model": "llama2_7b",
        "description":
            "Llama-2 7b. Аналог GPT-3.5. Обучена до 2023 года. Очень быстрая модель.",
        "lang": "Имеется частичная поддержка Русского языка",
        "free": False,
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
            proxy=get_proxy()
        )

        print(response.choices[0].message.content)
        model["active"] = True
    except Exception as e:
        print(e)
        model["active"] = False
        print("Exception!!!!")

        check_model(model, attempts - 1)


def get_delay():
    return random.randint(1200, 2000) * random.randint(1, 5)


def check_llm_models(scheduler=None):
    for model in models:
        if "skip_check" in model:
            continue
        if model["model"] == "gpt_35_turbo":
            continue

        check_model(model, 10)

    if scheduler is not None:
        scheduler.enter(get_delay(), 1, check_llm_models, (scheduler,))


def run_check_models():
    check_llm_models()

    my_scheduler = sched.scheduler(time.time, time.sleep)
    my_scheduler.enter(get_delay(), 1, check_llm_models, (my_scheduler,))
    my_scheduler.run()
