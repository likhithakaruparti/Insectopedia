from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sentence_transformers import SentenceTransformer
import faiss
import json
import os
from pathlib import Path
from gemini_client import query_gemini

app = FastAPI()

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Paths ----------------
INDEX_DIR = Path("index")
FAISS_INDEX_PATH = INDEX_DIR / "faiss.index"
META_PATH = INDEX_DIR / "meta.json"
EMBED_MODEL = "all-MiniLM-L6-v2"

# ---------------- Load FAISS & Model ----------------
if not FAISS_INDEX_PATH.exists() or not META_PATH.exists():
    raise FileNotFoundError("FAISS index or metadata not found. Run preprocess_and_train.py first.")

embed_model = SentenceTransformer(EMBED_MODEL)
index = faiss.read_index(str(FAISS_INDEX_PATH))
with open(META_PATH, "r", encoding="utf-8") as f:
    docs = json.load(f)["docs"]

# ---------------- Helper Functions ----------------
def retrieve_context(query: str, top_k: int = 3):
    q_emb = embed_model.encode([query], convert_to_numpy=True)
    faiss.normalize_L2(q_emb)
    D, I = index.search(q_emb, top_k)
    retrieved = []
    for idx, score in zip(I[0], D[0]):
        if idx < 0 or idx >= len(docs):
            continue
        entry = docs[int(idx)].copy()
        entry["_score"] = float(score)
        retrieved.append(entry)
    # Combine text for Gemini prompt
    combined_text = "\n\n---\n\n".join([f"{r['name']} (id={r['id']}): {r['text']}" for r in retrieved])
    return combined_text

# ---------------- Query Endpoint ----------------
@app.post("/api/query")
async def query_api(question: str = Form(...)):
    try:
        context = retrieve_context(question)
        answer = query_gemini(question, context)
        return {"answer": answer}
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
