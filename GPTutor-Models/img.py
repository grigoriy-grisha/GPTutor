import openai
import json

# Example dummy function hard coded to return the same weather
# In production, this could be your backend API or an external API

openai.api_key = "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"


def get_midjourney_prompt(image, keywords, cameraType, timeOfDay, photoStyle, filmType, cameraSettings):
    """Get the current weather in a given location"""
    weather_info = {
        "image": image,
        "keywords": keywords,
        "cameraType": cameraType,
        "timeOfDay": timeOfDay,
        "photoStyle": photoStyle,
        "filmType": filmType,
        "cameraSettings": cameraSettings,
    }
    return json.dumps(weather_info)


def run_conversation():
    # Step 1: send the conversation and available functions to GPT
    messages = [{"role": "user", "content": "get image prompt"}]
    functions = [
        {
            "name": "get_midjourney_prompt",
            "description": "get_midjourney_prompt",
            "parameters": {
                "type": "object",
                "properties": {
                    "image": {
                        "type": "string",
                        "description": "The image for which we are creating a hint",
                    },
                    "keywords": {"type": "string", "description": "5 descriptive keywords"},
                    "cameraType": {"type": "string", "description": "camera type, camera len"},
                    "timeOfDay": {"type": "string", "description": "time of day"},
                    "photoStyle": {"type": "string", "description": "photo style"},
                    "filmType": {"type": "string", "description": "film type"},
                    "cameraSettings": {"type": "string", "description": "camera settings"},
                },
            },
        }
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-0613",
        messages=messages,
        functions=functions,
        function_call="auto",  # auto is default, but we'll be explicit
    )
    response_message = response["choices"][0]["message"]

    # Step 2: check if GPT wanted to call a function
    if response_message.get("function_call"):
        # Step 3: call the function
        # Note: the JSON response may not always be valid; be sure to handle errors
        available_functions = {
            "get_midjourney_prompt": get_midjourney_prompt,
        }  # only one function in this example, but you can have multiple
        function_name = response_message["function_call"]["name"]
        fuction_to_call = available_functions[function_name]
        function_args = json.loads(response_message["function_call"]["arguments"])
        function_response = fuction_to_call(
            image=function_args.get("image"),
            keywords=function_args.get("keywords"),
            cameraType=function_args.get("cameraType"),
            timeOfDay=function_args.get("timeOfDay"),
            photoStyle=function_args.get("photoStyle"),
            filmType=function_args.get("filmType"),
            cameraSettings=function_args.get("cameraSettings"),
        )

        # Step 4: send the info on the function call and function response to GPT
        messages.append(response_message)  # extend conversation with assistant's reply
        messages.append(
            {
                "role": "function",
                "name": function_name,
                "content": function_response,
            }
        )  # extend conversation with function response
        second_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-0613",
            messages=messages,
        )  # get a new response from GPT where it can see the function response
        return second_response


print(run_conversation())
