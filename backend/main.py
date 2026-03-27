from flask import Flask, request
from google import genai
from dotenv import load_dotenv
import os
import time
from tts import tts

app = Flask(__name__)
message_log = []

def configure():
    load_dotenv()

configure()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/message", methods=["GET", "POST"])
def receive_message():   
    if request.method == "POST":
        image_data = request.data

        filename = f"image{int(time.time())}.jpg"

        with open(filename, "wb") as f:
            f.write(image_data)

        uploaded_file = client.files.upload(file=filename)
        prompt = '''Purpose:
            - Analyze the food in the picture
            - You are an assistant for blind people
            - You need to check if the food is eatable and safe to consume
            - The output should also tell the user what is the food type
            Requirements:
            - The output will be converted as voice using TTS
            - The output should not be longer than 3 sentences
            - The output should always be in Bulgarian language
            - You are allowed to say that you cannot analyse the food'''

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=[uploaded_file, prompt]
        )

        text_response = response.text.strip()
        print(text_response)

        tts(str(text_response))

        return "<p>Message received and processed.</p>", 200
    
    else:
        return "Flask receiver is running!", 200   

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)