import requests
import json
from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
import html
from flask_cors import CORS

load_dotenv()
API_KEY = os.getenv('API_KEY')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

HISTORY_FILE = "history.txt"

@app.route('/api/query', methods=['POST'])
def query():
    user_info = request.json  # Get the JSON data sent from the React frontend
    save_to_history(user_info)

    recommendations = get_supplement_recommendations(user_info)
    return jsonify({"recommendations": recommendations})

def save_to_history(user_info):
    with open(HISTORY_FILE, "a") as file:
        file.write(json.dumps(user_info) + "\n")

def get_supplement_recommendations(user_info):
    url = "https://api.anthropic.com/v1/messages"
    headers = {
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
    }
    data = {
        "model": "claude-3-sonnet-20240229",
        "max_tokens": 1024,
        "messages": [
            {
                "role": "user",
                "content": (
                    f"Based on the following user information: {user_info}, "
                    "Suggest The User 3 Exercises as per the user's Health Goal which can help the user to achieve their goal fast\n\n"
                    "Your response should meet the following criteria:\n\n"
                    "1. **Detail and Clarity:** Provide detailed information about each Exercise, including its benefits, recommended duration, and any other relevant details. Ensure the information is clear and easy to understand.\n\n"
                    "2. **Formatting:** Format your response with bullet points for each exercise recommendation.\n\n"
                    "3. **Text Styling:** Use bold text to highlight key points or important information within each bullet point. For example, bold the names of the exercises and any critical benefits or instructions.\n\n"
                    "4. **Readability:** Avoid using redundant or repetitive language. The information should be presented in a way that is engaging and easy to follow. Ensure there are no grammatical mistakes or awkward phrasing.\n\n"
                    "5. **Length:** The data must be written in so much detail and must have at least 200+ words.\n\n"
                    "The goal is to provide users with a clear, professional, and user-friendly list of exercise recommendations based on their provided information. The recommendations should be precise and well-structured to facilitate easy reading and understanding.\n\n"
                    "After providing the recommendations, please suggest three reputable websites where the user can learn more about how to improve based on their health goal.\n\n"
                )
            }
        ]
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))

    if response.status_code == 200:
        try:
            content = response.json()["content"][0]["text"]
            
            content = content.replace("**", "<b>").replace("**", "</b>")
            bullet_points = content.split("\n")
            formatted_recommendations = ''.join(f"<li>{html.escape(point.strip())}</li>" for point in bullet_points if point.strip())
            
            return formatted_recommendations
        except (KeyError, IndexError) as e:
            print(f"Error parsing response: {e}")
            return "<li>Sorry, something went wrong while generating recommendations.</li>"
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return "<li>Sorry, the recommendation service is currently unavailable.</li>"

if __name__ == '__main__':
    app.run(debug=True)
