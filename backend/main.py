from flask import Flask, request, jsonify
from google import genai
from dotenv import load_dotenv
import os
from datetime import datetime
from tts import tts
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def configure():
    load_dotenv()

configure()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/message", methods=["GET", "POST"])
def receive_message():   
    if request.method == "POST":
        image_data = request.data

        if not request.data:
            return {"error": "No image received"}, 400

        i = 1
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"image_{timestamp}.jpg"

        while os.path.exists(filename):
            filename = f"image_{timestamp}_{i}.jpg"
            i += 1

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

        return jsonify({
            "status": "success",
            "text": text_response
        }), 200
    
    else:
        return jsonify({
            "status": "running"
        }), 200 

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)