import os
import json
import pandas as pd
import re
from sentence_transformers import SentenceTransformer
import faiss
from pathlib import Path

DATA_DIR = Path("data")
INDEX_DIR = Path("index")
INDEX_DIR.mkdir(exist_ok=True)

EMBED_MODEL_NAME = "all-MiniLM-L6-v2"

def load_csv(filepath):
    return pd.read_csv(filepath)

def text_clean(s):
    if not isinstance(s, str):
        return ""
    s = re.sub(r'\s+', ' ', s).strip()
    return s

def chunk_text(text, chunk_size=400, overlap=50):
    text = text_clean(text)
    if len(text) <= chunk_size:
        return [text]
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        if end >= len(text):
            break
        start = end - overlap
    return chunks

def ingest_csv_to_docs(csv_path):
    df = load_csv(csv_path)
    docs = []
    for _, row in df.iterrows():
        doc_id = str(row.get("id", ""))
        name = row.get("name", "")
        taxonomy = row.get("taxonomy", "")
        desc = " ".join([str(row.get(c, "")) for c in ["description","habitat"]])
        chunks = chunk_text(desc)
        for idx, ch in enumerate(chunks):
            docs.append({
                "id": f"{doc_id}_{idx}",
                "species_id": doc_id,
                "name": name,
                "taxonomy": taxonomy,
                "text": ch
            })
    return docs

def build_faiss_index(docs, model_name=EMBED_MODEL_NAME, index_path=INDEX_DIR/"faiss.index", meta_path=INDEX_DIR/"meta.json"):
    model = SentenceTransformer(model_name)
    texts = [d["text"] for d in docs]
    print(f"Embedding {len(texts)} chunks with {model_name} ...")
    embeddings = model.encode(texts, convert_to_numpy=True, show_progress_bar=True)

    dim = embeddings.shape[1]
    index = faiss.IndexFlatIP(dim)
    faiss.normalize_L2(embeddings)
    index.add(embeddings)
    faiss.write_index(index, str(index_path))

    meta = {"docs": docs}
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=2)
    print("Index and metadata saved.")

if __name__ == "__main__":
    csv_path = DATA_DIR/"insects.csv"
    if not csv_path.exists():
        print("data/insects.csv not found. Please add your data and rerun.")
        exit(1)
    docs = ingest_csv_to_docs(csv_path)
    build_faiss_index(docs)
