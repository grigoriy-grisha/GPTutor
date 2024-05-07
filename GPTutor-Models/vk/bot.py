import os

import vk_api
from vk_api.keyboard import VkKeyboard
from vk_api.longpoll import VkLongPoll, VkEventType

vk_session = vk_api.VkApi(token=os.environ.get('VK_COMMUNITY_TOKEN'))

session_api = vk_session.get_api()
long_pool = VkLongPoll(vk_session)


def send_some_msg(user_id, message, keyboard):
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
    keyboard.add_openlink_button("Открыть GPT бота", "https://vk.com/app5160232")
    keyboard.add_line()
    keyboard.add_openlink_button("Открыть Генератор картинок", "https://vk.com/app51692825")

    return keyboard


for event in long_pool.listen():

    if event.type == VkEventType.MESSAGE_NEW:
        if event.to_me:
            send_some_msg(
                event.user_id,
                """
                Бот находится в отдельном приложении!
                
                GPT Бот: https://vk.com/app5160232
                Генератор картинок: https://vk.com/app5160232
                
                """,
                create_keyboard()
            )
