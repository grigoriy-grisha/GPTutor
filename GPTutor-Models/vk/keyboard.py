import json
from enum import Enum
from typing import Any


class ButtonColor(Enum):
    NEGATIVE = "negative"
    POSITIVE = "positive"
    PRIMARY = "primary"
    SECONDARY = "secondary"

    def __str__(self) -> str:
        return self.value


class Text:

    def __new__(
            cls,
            label: str,
            color: str | ButtonColor = ButtonColor.SECONDARY,
            payload: str | None = None
    ) -> dict[str, Any] | None:
        return {
            "action": {
                "type": "text",
                "label": label,
                "payload": payload
            },
            "color": color.value if isinstance(color, ButtonColor) else color
        }


class OpenLink:

    def __new__(
            cls,
            label: str | None,
            link: str | None,
            payload: str | None = None
    ) -> dict[str, Any] | None:
        return {
            "action": {
                "type": "open_link",
                "label": label,
                "link": link,
                "payload": payload
            }
        }


class Location:

    def __new__(
            cls,
            payload: str | None = None
    ) -> dict[str, Any] | None:
        return {
            "action": {
                "type": "location",
                "payload": payload
            }
        }


class VkPay:

    def __new__(
            cls,
            pay_hash: str,
            payload: str | None = None
    ) -> dict[str, Any] | None:
        return {
            "action": {
                "type": "vkpay",
                "hash": pay_hash,
                "payload": payload
            }
        }


class VkApps:

    def __new__(
            cls,
            app_id: int,
            owner_id: int,
            label: str,
            app_hash: str,
            payload: str | None = None
    ) -> dict[str, Any] | None:
        return {
            "action": {
                "type": "vkapps",
                "app_id": app_id,
                "owner_id": owner_id,
                "label": label,
                "hash": app_hash,
                "payload": payload
            }
        }


class OpenApp:

    def __new__(
            cls,
            app_id: int,
            owner_id: int,
            label: str,
            app_hash: str,
            payload: str | None = None,
    ) -> dict[str, Any] | None:
        return {
            "action": {
                "type": "open_app",
                "app_id": app_id,
                "owner_id": owner_id,
                "label": label,
                "hash": app_hash,
                "payload": payload
            }
        }


class Callback:

    def __new__(
            cls,
            label: str,
            payload: str | None = None
    ) -> dict[str, Any] | None:
        return {
            "action": {
                "type": "callback",
                "label": label,
                "payload": payload
            }
        }


class Keyboard:

    def __init__(
            self,
            buttons: list[
                Text | OpenLink | Location | VkPay | VkApps | OpenApp | Callback
                ],
            *,
            one_time: bool = False,
            inline: bool = False
    ) -> None:
        self.one_time = one_time
        self.inline = inline

        self.keyboard = {
            "one_time": self.one_time,
            "inline": self.inline,
            "buttons": buttons
        }

    def add_keyboard(self) -> str:
        obj = json.dumps(self.keyboard, ensure_ascii=False).encode("utf-8")
        return obj.decode("utf-8")

    def get_empty_keyboard(self) -> str:
        self.keyboard["buttons"] = []
        return self.add_keyboard()
