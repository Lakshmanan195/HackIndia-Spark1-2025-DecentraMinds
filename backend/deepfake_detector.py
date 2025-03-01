import os
import sys
import json
import requests
import time

def get_highest_score_label(results):
    highest = max(results, key=lambda x: x['score'])
    return highest['label'].upper()  # Ensuring output is either "REAL" or "FAKE"

def detect_deepfake(image_path):
    try:
        print(f"Attempting to open image file: {image_path}")
        with open(image_path, "rb") as f:
            image_data = f.read()
        
        API_URL = "https://api-inference.huggingface.co/models/dima806/deepfake_vs_real_image_detection"
        HEADERS = {"Authorization": f"Bearer {os.getenv('HUGGINGFACE_API_KEY')}"}
        
        max_retries = 3
        for attempt in range(max_retries):
            print(f"Sending request to Hugging Face API (Attempt {attempt + 1}/{max_retries})")
            response = requests.post(
                API_URL, 
                headers=HEADERS, 
                data=image_data,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                print(f"API Response: {result}")
                return get_highest_score_label(result)
            elif response.status_code == 503:
                print(f"Service Unavailable. Retrying in 5 seconds...")
                time.sleep(5)
            else:
                return f"ERROR: API returned status code {response.status_code} - {response.text}"
        
        return "ERROR: Hugging Face API is currently unavailable. Please try again later."
    
    except Exception as e:
        return f"ERROR: {str(e)}"

if __name__ == "__main__":
    print("Deepfake detector script started")
    if len(sys.argv) != 2:
        print("ERROR: Usage: python deepfake_detector.py <image_path>")
        sys.exit(1)
    
    huggingface_api_key = os.getenv('HUGGINGFACE_API_KEY')
    if not huggingface_api_key:
        print("ERROR: Please set the HUGGINGFACE_API_KEY environment variable")
        sys.exit(1)
    
    image_path = sys.argv[1]
    print(f"Image path received: {image_path}")
    result = detect_deepfake(image_path)
    print(f"Final result: {result}")

