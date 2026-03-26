from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 📚 MASTER COURSE DATABASE
course_db = {
    "python": [
        "Python for Beginners - Udemy",
        "Automate the Boring Stuff",
        "Python Data Structures"
    ],
    "react": [
        "React Complete Guide",
        "Frontend Masters React",
        "React + Redux Bootcamp"
    ],
    "ai": [
        "Machine Learning by Andrew Ng",
        "Deep Learning Specialization",
        "AI for Everyone"
    ],
    "data science": [
        "Data Science Bootcamp",
        "Pandas & NumPy Course",
        "Data Analysis with Python"
    ],
    "web development": [
        "Full Stack Web Dev",
        "HTML CSS JS Complete Guide",
        "MERN Stack Course"
    ],
    "java": [
        "Java Programming Masterclass",
        "Spring Boot Course"
    ],
    "c++": [
        "C++ for Beginners",
        "DSA in C++"
    ],
    "cloud": [
        "AWS Certified Solutions Architect",
        "Azure Fundamentals"
    ],
    "cybersecurity": [
        "Ethical Hacking Course",
        "Cyber Security Bootcamp"
    ]
}

# 🧠 AI recommendation logic
def recommend(skills, interests):
    roles = []
    courses = []

    for skill in skills:
        skill = skill.lower().strip()

        if skill in course_db:
            courses.extend(course_db[skill])

        if skill == "python":
            roles.append("AI Engineer")
        elif skill == "react":
            roles.append("Frontend Developer")
        elif skill == "data science":
            roles.append("Data Scientist")
        elif skill == "java":
            roles.append("Backend Developer")

    if "ai" in interests:
        courses.extend(course_db.get("ai", []))
        roles.append("AI Specialist")

    # remove duplicates
    courses = list(set(courses))
    roles = list(set(roles))

    return roles, courses


@app.route("/api/match", methods=["POST"])
def match():
    data = request.get_json()

    skills = data.get("skills", [])
    interests = data.get("interests", [])

    roles, courses = recommend(skills, interests)

    return jsonify({
        "recommended_roles": roles,
        "courses": courses,
        "skill_score": "85%",
        "level": "Intermediate"
    })


if __name__ == "__main__":
    app.run()
