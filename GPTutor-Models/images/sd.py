import json
import os
import time

import requests

negative_prompt_default = (
    "woman,(((vaginal))),(((childish))),(((nsfw))),(((orgasm))),(((pussy out))),(((cum))),(((pussy))),(((sexy))),"
    "(((horny))), (((topless))),(((erotic))),(((milf))),((breasts)),(((nude woman))),(((nude woman))),((nude)),"
    "(((nudity))),(((boobs))),(((nudity))),(((tits))),((nipples)),((sex)),((vigina)),((genitals)),((penis))")


def textToImage(
        model_id,
        prompt,
        negative_prompt,
        scheduler,
        width,
        height,
        samples=1,
        num_inference_steps=20,
        seed=None,
        guidance_scale=7,
        upscale='no',
        attempts=1
):
    if attempts == 6:
        return {
            "status": "failed"
        }

    payload = json.dumps({
        "key": "YtbAxupBBktr6Mlmyc2m6yUYXex7y1bBrESTDFhuovoS4wRaOPJ0U7Lv9SQI",
        "prompt": prompt,
        "negative_prompt": negative_prompt_default + negative_prompt,
        "model_id": model_id,
        "width": str(width),
        "height": str(height),
        "samples": str(samples),
        "num_inference_steps": str(num_inference_steps),
        "guidance_scale": guidance_scale,
        "upscale": "no",
        "safety_checker": "no",
        "multi_lingual": "no",
        "enhance_prompt": "no",
        "panorama": "no",
        "safety_checker_type": "blur",
        "self_attention": "no",
        "embeddings_model": None,
        "webhook": None,
        "track_id": None,
        **getScheduler(scheduler),
        **getSeed(seed)
    })

    print(payload)

    headers = {'Content-Type': 'application/json'}

    if model_id == "sd":
        print(model_id)
        response = requests.request("POST", "https://stablediffusionapi.com/api/v3/text2img", headers=headers,
                                    data=payload)
    else:
        response = requests.request("POST", "https://stablediffusionapi.com/api/v4/dreambooth", headers=headers,
                                    data=payload)

    result = response.json()

    if result['status'] == "failed":
        time.sleep(3)
        return textToImage(model_id=model_id,
                           prompt=prompt,
                           negative_prompt=negative_prompt,
                           scheduler=scheduler,
                           width=width,
                           height=height,
                           samples=samples,
                           num_inference_steps=num_inference_steps,
                           seed=seed,
                           guidance_scale=guidance_scale,
                           upscale=upscale, attempts=attempts + 1
                           )

    if result['status'] == "processing":
        time.sleep(result['eta'])
        status = True
        while status is True:
            result_job = requests.request(
                "POST",
                result["fetch_result"],
                headers=headers,
                data=json.dumps({"key": "YtbAxupBBktr6Mlmyc2m6yUYXex7y1bBrESTDFhuovoS4wRaOPJ0U7Lv9SQI"})
            ).json()

            print(result_job)

            process_status = result_job["status"]
            if process_status == "success":
                time.sleep(2)
                return result_job
            elif process_status == "processing":
                time.sleep(2)
            else:
                print(f"ERROR: Something went wrong! Please try later, error: {status}")
                return result_job

    time.sleep(2)

    return result


def getScheduler(scheduler) -> dict:
    schedulersDict = {
        "DPM++ 2M": {"scheduler": "DPMSolverMultistepScheduler"},
        "DPM++ 2M Karras": {"scheduler": "DPMSolverMultistepScheduler", "use_karras_sigmas": "yes"},
        "DPM++ 2M SDE": {"scheduler": "DPMSolverMultistepScheduler", "use_karras_sigmas": "yes"},
        "DPM++ 2M SDE Karras": {"scheduler": "DPMSolverMultistepScheduler", "algorithm_type": "dpmsolver+++",
                                "use_karras_sigmas": "yes"},
        "DPM++ SDE": {"scheduler": "DPMSolverSinglestepScheduler"},
        "DPM++ SDE Karras": {"scheduler": "DPMSolverSinglestepScheduler", "use_karras_sigmas": "yes"},
        "DPM2": {"scheduler": "KDPM2DiscreteScheduler", },
        "DPM2 Karras": {"scheduler": "KDPM2DiscreteScheduler", "use_karras_sigmas": "yes"},
        "DPM2 a": {"scheduler": "KDPM2AncestralDiscreteScheduler"},
        "DPM2 a Karras": {"scheduler": "KDPM2AncestralDiscreteScheduler", "use_karras_sigmas": "yes"},
        "Euler": {"scheduler": "EulerDiscreteScheduler"},
        "Euler a": {"scheduler": "EulerAncestralDiscreteScheduler"},
        "Heun": {"scheduler": "HeunDiscreteScheduler"},
        "LMS": {"scheduler": "LMSDiscreteScheduler"},
        "LMS Karras": {"scheduler": "LMSDiscreteScheduler", "use_karras_sigmas": "yes"},
        "DDPMScheduler": {"scheduler": "DDPMScheduler"}
    }

    return schedulersDict[scheduler]


def getSeed(seed):
    if seed == -1 or seed == "-1":
        return {}

    return {"seed": str(seed)}
