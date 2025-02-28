from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load roadmap data
with open("roadmap_data.json") as f:
    roadmap_data = json.load(f)

@app.route("/get-roadmap", methods=["POST"])
def get_roadmap():
    data = request.get_json()
    selected_subjects = data.get("subjects", [])

    if not selected_subjects:
        return jsonify({"error": "No subjects selected"}), 400

    roadmap = []
    for subject in selected_subjects:
        if subject in roadmap_data:
            roadmap.extend(roadmap_data[subject])

    roadmap = list(set(roadmap))  # Remove duplicates

    return jsonify({"roadmap": roadmap})

if __name__ == "__main__":
    app.run(debug=True)
