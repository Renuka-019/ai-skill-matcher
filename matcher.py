from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

opportunities = [
    {"title": "Web Dev Internship", "skills": "html css javascript react"},
    {"title": "ML Project", "skills": "python machine learning ai numpy"},
    {"title": "Android Dev", "skills": "java kotlin android"},
    {"title": "Data Science Intern", "skills": "python pandas sql data"},
    {"title": "Open Source", "skills": "git github coding"}
]

courses = [
    {"name": "Python for Beginners", "skills": "python"},
    {"name": "React Crash Course", "skills": "react javascript"},
    {"name": "Machine Learning Basics", "skills": "machine learning ai"},
]

def match_all(user_input):
    corpus = [user_input] + [o["skills"] for o in opportunities] + [c["skills"] for c in courses]

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(corpus)

    similarity = cosine_similarity(vectors[0:1], vectors[1:]).flatten()

    results_opportunities = []
    results_courses = []

    for i, score in enumerate(similarity):
        if i < len(opportunities):
            results_opportunities.append({
                "title": opportunities[i]["title"],
                "score": round(score * 100, 2)
            })
        else:
            idx = i - len(opportunities)
            results_courses.append({
                "name": courses[idx]["name"],
                "score": round(score * 100, 2)
            })

    return sorted(results_opportunities, key=lambda x: x["score"], reverse=True), \
           sorted(results_courses, key=lambda x: x["score"], reverse=True)