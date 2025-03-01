import requests
import json
import sys

API_URL = "https://api-inference.huggingface.co/models/MelodyMachine/Deepfake-audio-detection-V2"
HEADERS = {"Authorization": "Bearer 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"}

def detect_deepfake(audio_path):
    try:
        with open(audio_path, "rb") as audio_file:
            data = audio_file.read()
        
        response = requests.post(API_URL, headers=HEADERS, data=data)

        # Print full API response for debugging
        print("API Response:", response.text)

        if response.status_code != 200:
            return json.dumps({"error": f"API request failed with status {response.status_code}"})

        result = response.json()

        if not isinstance(result, list) or len(result) == 0:
            return json.dumps({"error": "Unexpected API response format", "response": result})

        # Get the label with the highest confidence score
        best_prediction = max(result, key=lambda x: x["score"])
        label = best_prediction["label"].upper()

        return json.dumps({"status": "REAL" if label == "REAL" else "FAKE"})

    except Exception as e:
        return json.dumps({"error": str(e)})

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No audio file provided"}))
    else:
        audio_path = sys.argv[1]
        print(detect_deepfake(audio_path))
