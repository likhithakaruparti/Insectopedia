import google.generativeai as genai
import os

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

GEMINI_MODEL = "gemini-1.5-flash"

def query_gemini(question: str, retrieved_context: str):
    """
    Call Gemini with the provided question and context from FAISS retrieval
    """
    try:
        model = genai.GenerativeModel(GEMINI_MODEL)
        prompt = f"You are InsectPedia. Answer only insect-related questions.\n\nContext:\n{retrieved_context}\n\nQuestion:\n{question}"
        response = model.generate_content(prompt)
        if hasattr(response, "text"):
            return response.text.strip()
        return "⚠️ Gemini returned no response."
    except Exception as e:
        return f"❌ Error calling Gemini: {str(e)}"
