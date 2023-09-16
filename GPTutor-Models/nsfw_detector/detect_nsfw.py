import os

from nsfw_detector import predict
from nsfw_detector.functions import download_image


async def detect_nsfw(model, url: str):
    if not url:
        return {"ERROR": "URL PARAMETER EMPTY"}
    image = await download_image(url)
    if not image:
        return {"ERROR": "IMAGE SIZE TOO LARGE OR INCORRECT URL"}
    results = predict.classify(model, image)
    os.remove(image)

    hentai = results['data']['hentai']
    sexy = results['data']['sexy']
    porn = results['data']['porn']
    drawings = results['data']['drawings']
    neutral = results['data']['neutral']

    if neutral >= 35:
        results['data']['is_nsfw'] = False
        return results
    elif (porn + hentai) >= 50:
        results['data']['is_nsfw'] = True
        return results
    elif drawings >= 40:
        results['data']['is_nsfw'] = False
        return results
    else:
        results['data']['is_nsfw'] = False
        return results