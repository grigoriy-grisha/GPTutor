import random

proxies = [
    "http://WGyGBM:ZZukJ8@38.170.121.59:9657",
    "http://QjMjGe:mwZ9aM@38.170.95.87:9099",
    "http://QjMjGe:mwZ9aM@181.177.103.79:9674",
    "http://QjMjGe:mwZ9aM@131.108.17.84:9653",
    "http://QjMjGe:mwZ9aM@95.164.111.84:9890",
    "http://QjMjGe:mwZ9aM@95.164.110.128:9894",

]


def get_proxy():
    return random.choice(proxies)
