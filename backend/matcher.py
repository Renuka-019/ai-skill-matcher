from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from data import opportunities, courses

def match_data(user_text):
    corpus = [user_text] + [o["skills"] for o in opportunities] + [c["skills"] for c in courses]

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform(corpus)

    sim = cosine_similarity(vectors[0:1], vectors[1:]).flatten()

    opp_results = []
    course_results = []

    for i, score in enumerate(sim):
        if i < len(opportunities):
            opp_results.append({
                "title": opportunities[i]["title"],
                "score": round(score * 100, 2)
            })
        else:
            idx = i - len(opportunities)
            course_results.append({
                "name": courses[idx]["name"],
                "score": round(score * 100, 2)
            })

    return sorted(opp_results, key=lambda x: x["score"], reverse=True), \
           sorted(course_results, key=lambda x: x["score"], reverse=True)
    
