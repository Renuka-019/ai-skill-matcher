from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow frontend to connect

# Home route
@app.route("/")
def home():
    return "Backend is running 🚀"

# API route
@app.route("/api/match", methods=["POST"])
def match():
    data = request.get_json()

    skills = data.get("skills", [])
    interests = data.get("interests", [])

    # Dummy AI logic
    result = {
        "recommended_roles": ["Web Developer", "AI Engineer"],
        "skills": skills,
        "interests": interests
    }

    return jsonify(result)


# Run locally (Render uses gunicorn)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
