from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# ================= FILE STORAGE (NEW) =================
FILE = "users.json"

# load users from file
if os.path.exists(FILE):
    with open(FILE, "r") as f:
        users = json.load(f)
else:
    users = []

# save users
def save_users():
    with open(FILE, "w") as f:
        json.dump(users, f)

# ================= COURSES DATABASE =================
courses_db = [
    {
        "name": "Web Development",
        "skills": ["html", "css", "javascript", "react"],
        "roles": ["Frontend Developer", "Full Stack Developer"],
        "description": "Build websites and web apps"
    },
    {
        "name": "Data Science",
        "skills": ["python", "pandas", "numpy", "ml"],
        "roles": ["Data Scientist", "Data Analyst"],
        "description": "Analyze data and build models"
    },
    {
        "name": "Machine Learning",
        "skills": ["python", "ml", "ai"],
        "roles": ["ML Engineer", "AI Engineer"],
        "description": "Build intelligent systems"
    },
    {
        "name": "Android Development",
        "skills": ["java", "kotlin"],
        "roles": ["Android Developer"],
        "description": "Build mobile apps"
    },
    {
        "name": "Cyber Security",
        "skills": ["networking", "security"],
        "roles": ["Security Analyst", "Ethical Hacker"],
        "description": "Protect systems from attacks"
    },
]

# 🔥 EXTRA COURSES
extra_courses = [
    ("Cloud Computing", ["aws", "cloud"], ["Cloud Engineer"]),
    ("DevOps", ["docker", "kubernetes"], ["DevOps Engineer"]),
    ("UI/UX Design", ["figma", "design"], ["UI Designer"]),
    ("Blockchain", ["solidity", "crypto"], ["Blockchain Developer"]),
    ("Game Development", ["unity", "c#"], ["Game Developer"]),
    ("IoT", ["arduino", "iot"], ["IoT Engineer"]),
    ("Big Data", ["hadoop", "spark"], ["Big Data Engineer"]),
    ("Networking", ["tcp/ip", "routing"], ["Network Engineer"]),
    ("Software Testing", ["testing", "qa"], ["QA Engineer"]),
    ("Embedded Systems", ["c", "microcontroller"], ["Embedded Engineer"]),
]

# generate 40+ courses
for i in range(4):
    for course in extra_courses:
        courses_db.append({
            "name": course[0] + f" Level {i+1}",
            "skills": course[1],
            "roles": course[2],
            "description": f"Advanced {course[0]} course"
        })

# ================= ROUTES =================

@app.route("/")
def home():
    return "Backend is running 🚀"

# ================= SIGNUP =================
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    for user in users:
        if user["email"] == email:
            return jsonify({"message": "User already exists"}), 400

    users.append({"email": email, "password": password})
    save_users()  # 🔥 SAVE TO FILE

    return jsonify({"message": "Signup successful"}), 200

# ================= LOGIN =================
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    for user in users:
        if user["email"] == email and user["password"] == password:
            return jsonify({"message": "Login successful"}), 200

    return jsonify({"message": "Invalid credentials"}), 401

# ================= MATCH ENGINE =================
@app.route("/api/match", methods=["POST"])
def match():
    data = request.get_json()
    user_skills = [s.lower() for s in data.get("skills", [])]

    matched_courses = []
    matched_roles = []

    for course in courses_db:
        match_score = len(set(user_skills) & set(course["skills"]))

        if match_score > 0:
            matched_courses.append({
                "name": course["name"],
                "description": course["description"],
                "skills": course["skills"],
                "roles": course["roles"],
                "score": match_score
            })

            matched_roles.extend(course["roles"])

    matched_courses = sorted(matched_courses, key=lambda x: x["score"], reverse=True)

    return jsonify({
        "recommended_courses": matched_courses[:10],
        "recommended_roles": list(set(matched_roles))
    })

# ================= RUN =================
if __name__ == "__main__":
    app.run(debug=True)
