import random

proxies = [
    "http://dXo2w0:Y7jJDd@38.170.124.149:9016",
    "http://dXo2w0:Y7jJDd@38.170.121.94:9521",
    "http://dXo2w0:Y7jJDd@38.170.121.148:9651",
    "http://dXo2w0:Y7jJDd@138.219.122.242:9388",
]


def get_proxy():
    return random.choice(proxies)
