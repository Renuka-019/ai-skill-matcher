from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend is running 🚀"

# 📚 COURSE DATABASE (30+ courses)
course_db = {
    "python": [
        "Python for Beginners",
        "Advanced Python Programming",
        "Data Analysis with Python",
        "Python Automation"
    ],
    "react": [
        "React Complete Guide",
        "React + Redux Bootcamp",
        "Frontend Masters React"
    ],
    "ai": [
        "Machine Learning - Andrew Ng",
        "Deep Learning Specialization",
        "AI for Everyone",
        "Neural Networks Course"
    ],
    "data science": [
        "Data Science Bootcamp",
        "Pandas & NumPy Course",
        "Data Visualization"
    ],
    "web development": [
        "Full Stack Web Development",
        "HTML CSS JS Mastery",
        "MERN Stack Course"
    ],
    "java": [
        "Java Programming Masterclass",
        "Spring Boot Course"
    ],
    "c++": [
        "C++ for Beginners",
        "DSA with C++"
    ],
    "cloud": [
        "AWS Solutions Architect",
        "Azure Fundamentals",
        "Google Cloud Basics"
    ],
    "cybersecurity": [
        "Ethical Hacking Course",
        "Cyber Security Bootcamp"
    ]
}

# 🧠 RECOMMENDATION LOGIC
def recommend_courses(skills, interests):
    courses = []
    roles = []

    for skill in skills:
        skill = skill.lower().strip()

        if skill in course_db:
            courses.extend(course_db[skill])

        if skill == "python":
            roles.append("AI Engineer")
        elif skill == "react":
            roles.append("Frontend Developer")
        elif skill == "java":
            roles.append("Backend Developer")
        elif skill == "data science":
            roles.append("Data Scientist")

    if "ai" in interests:
        courses.extend(course_db.get("ai", []))
        roles.append("AI Specialist")

    return list(set(roles)), list(set(courses))


@app.route("/api/match", methods=["POST"])
def match():
    data = request.get_json()

    skills = data.get("skills", [])
    interests = data.get("interests", [])

    roles, courses = recommend_courses(skills, interests)

    return jsonify({
        "recommended_roles": roles,
        "courses": courses,
        "skill_score": "85%",
        "level": "Intermediate"
    })


# 🔐 SIMPLE LOGIN/SIGNUP
users = []

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    users.append(data)
    return jsonify({"message": "User registered"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    for user in users:
        if user["email"] == data["email"] and user["password"] == data["password"]:
            return jsonify({"message": "Login successful"})
    
    return jsonify({"message": "Invalid credentials"}), 401


if __name__ == "__main__":
    app.run()
