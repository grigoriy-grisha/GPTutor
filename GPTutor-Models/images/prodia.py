import asyncio
import random
import typing

import aiohttp

from images import enums

PRODIA_API = "https://api.prodia.com"


async def prodia(
        prompt: str,
        model,
        steps: int = 30,
        cfg: float = 7.5,
        seed: int = -1,
        sampler: enums.ProdiaSampler = enums.ProdiaSampler.DPMPP_SDE_KARRAS,
        negative: bool = True,
        negative_prompt: str = "",
        sleep: float = 1,
        request_args: typing.Optional[typing.Dict[str, typing.Any]] = None,
        session_args: typing.Optional[typing.Dict[str, typing.Any]] = None,
) -> bytes:
    request_args = request_args or {}

    async with aiohttp.ClientSession(**(session_args or {})) as session:
        params = {
            "new": "true",
            "prompt": prompt,
            "model": model,
            "negative_prompt": negative_prompt if negative else "nudity,nipples,unclothes,sex,vagina,penis,tits ,boobs,nude, naked, explicit, drugs, cocaine, heroin, "
                                                                "marijuana, murder, violence, porn, adult content, "
                                                                "explicit materia, homophobic, sexist, fascist, "
                                                                "racist, terrorists, extremists, hate groups, "
                                                                "(nsfw:1.5),verybadimagenegative_v1.3, "
                                                                "ng_deepnegative_v1_75t, (ugly face:0.5),cross-eyed,"
                                                                "sketches, (worst quality:2), (low quality:2.1), "
                                                                "(normal quality:2), lowres, normal quality, "
                                                                "((monochrome)), ((grayscale)), skin spots, acnes, "
                                                                "skin blemishes, bad anatomy, DeepNegative, "
                                                                "facing away, tilted head, {Multiple people}, lowres, "
                                                                "bad anatomy, bad hands, text, error, "
                                                                "missing fingers, extra digit, fewer digits, cropped, "
                                                                "worstquality, low quality, normal quality, "
                                                                "jpegartifacts, signature, watermark, username, "
                                                                "blurry, bad feet, cropped, poorly drawn hands, "
                                                                "poorly drawn face, mutation, deformed, "
                                                                "worst quality, low quality, normal quality, "
                                                                "jpeg artifacts, signature, watermark, extra fingers, "
                                                                "fewer digits, extra limbs, extra arms,extra legs, "
                                                                "malformed limbs, fused fingers, too many fingers, "
                                                                "long neck, cross-eyed,mutated hands, polar lowres, "
                                                                "bad body, bad proportions, gross proportions, text, "
                                                                "error, missing fingers, missing arms, missing legs, "
                                                                "extra digit, extra arms, extra leg, extra foot, "
                                                                "repeating hair",
            "steps": steps,
            "cfg": cfg,
            "seed": random.randint(0, 9999999999999) if seed < 0 else seed,
            "sampler": sampler.value,
            "aspect_ratio": "square",
        }

        async with session.get(
                url=f"{PRODIA_API}/generate",
                params=params,
                **request_args,
        ) as response:
            job_id = (await response.json())["job"]

        while True:
            async with session.get(
                    url=f"{PRODIA_API}/job/{job_id}",
                    **request_args,
            ) as response:
                status = (await response.json())["status"]

            if status == "succeeded":
                url = f"https://images.prodia.xyz/{job_id}.png?download=1"
                async with session.get(url=url, **request_args) as response:
                    return await response.read()

            await asyncio.sleep(sleep)
