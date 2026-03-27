from gtts import gTTS
from flask import jsonify

def tts(text_response):
    tts = gTTS(text=text_response, lang="bg")
    filename = "response.mp3"
    tts.save(filename)

    return jsonify({
        "text": text_response,
        "audio_file": filename
    })