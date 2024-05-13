import os

import vk_api
from vk_api.keyboard import VkKeyboard
from vk_api.longpoll import VkLongPoll, VkEventType

print(os.environ.get('VK_COMMUNITY_TOKEN'))
vk_session = vk_api.VkApi(token=os.environ.get('VK_COMMUNITY_TOKEN'))

session_api = vk_session.get_api()
long_pool = VkLongPoll(vk_session)


def send_msg(user_id: str, message: str, keyboard: VkKeyboard):
    vk_session.method(
        "messages.send",
        {
            "user_id": user_id,
            "message": message,
            "random_id": 0,
            "keyboard": keyboard.get_keyboard()
        }
    )


def create_keyboard():
    keyboard = VkKeyboard()
    keyboard.add_openlink_button("Открыть GPT бота 🤖", "https://vk.com/app51602327")
    keyboard.add_line()
    keyboard.add_openlink_button("Открыть Генератор картинок 🖼", "https://vk.com/app51692825")

    return keyboard


help_message = """
Привет!
                    
Бот находится в отдельном сервисе ВКонтакте!
                    
GPT Бот 🤖: https://vk.com/app51602327 
Генератор картинок 🖼: https://vk.com/app5160232
"""


def run_long_pool():
    for event in long_pool.listen():
        if event.type == VkEventType.MESSAGE_NEW and event.to_me:
            if event.text == "Начать" or event.text == "Start":
                send_msg(event.user_id, help_message, create_keyboard())
