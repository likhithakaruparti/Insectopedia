Sure! Here’s a complete, professional, and copy-paste-ready **README.md** for your Insectopedia RAG project, including deployment instructions for Render:

```markdown
# 🦋 Insectopedia RAG

Insectopedia is an AI-powered research assistant for insect data. Users can query an existing dataset (CSV) of insects, and the AI provides contextual answers using **retrieval-augmented generation (RAG)** with FastAPI backend and React frontend.

---

## **Project Structure**

```

insectopedia/
├── backend/
│   ├── api.py                   # FastAPI backend
│   ├── preprocess\_and\_train.py  # Preprocessing & FAISS index creation
│   ├── gemini\_client.py         # Gemini API integration
│   ├── requirements.txt         # Python dependencies
│   ├── data/                    # CSV datasets
│   ├── index/                   # FAISS index & metadata
│   └── uploads/                 # File uploads (if needed)
├── src/                          # Frontend (React/TypeScript)
│   ├── components/
│   │   ├── QueryInterface.tsx    # Chat interface
│   │   └── ui/                   # Shadcn UI components
│   ├── pages/
│   │   ├── Index.tsx             # Landing page
│   │   └── RAGSystem.tsx         # Main RAG system page
│   └── App.tsx                   # Routing
├── package.json                  # Frontend dependencies
└── README.md

````

---

## **Features**

- Query insect dataset with AI-powered responses
- RAG: retrieval-augmented generation using FAISS + Gemini
- Pretrained embeddings for instant responses
- Modern React frontend with Shadcn UI
- Responsive design with chat interface and suggested queries
- No need to upload CSV after initial preprocessing

---

## **Backend Setup**

1. Navigate to backend directory:

```bash
cd backend
````

2. Create and activate a virtual environment:

```bash
# Windows
python -m venv rag_env
rag_env\Scripts\activate

# macOS/Linux
python -m venv rag_env
source rag_env/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Add your Gemini API key:

```bash
# Create a .env file in backend/
GEMINI_API_KEY=your_api_key_here
```

5. Preprocess the dataset (generate FAISS index):

```bash
python preprocess_and_train.py
```

This creates:

* `backend/index/faiss.index`
* `backend/index/meta.json`

6. Start the backend server:

```bash
uvicorn api:app --reload --port 8000
```

Backend runs at: `http://localhost:8000`

---

## **Frontend Setup**

1. Navigate to frontend:

```bash
cd src
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## **Deployment Options**

We recommend **Render** for full-stack deployment.

### **Render Deployment**

1. Push your code to GitHub.
2. Go to [Render](https://render.com/) → New → Web Service.
3. Connect your GitHub repo.
4. Set **start command**:

```bash
uvicorn api:app --host 0.0.0.0 --port $PORT
```

5. Add environment variable:

```
GEMINI_API_KEY=your_api_key_here
```

6. For frontend: Create a Static Site → build command `npm run build` → publish directory `build/`.

---

## **Usage**

1. Open frontend in browser.
2. Navigate to **RAG System** page.
3. Ask questions about insects.
4. AI answers using preprocessed FAISS index + Gemini LLM.

---

## **Troubleshooting**

* **FAISS index not found** → Run `preprocess_and_train.py` first.
* **Gemini API errors** → Check `.env` key and internet connection.
* **CORS issues** → Make sure frontend calls `http://localhost:8000/api/query`.
* **Backend port conflict** → Change `--port` in `uvicorn` command.

---

## **License**

MIT License © 2025

```

---

I can also write a **shorter version optimized for GitHub deployment**, including a **one-click Render deployment badge and instructions** if you want.  

Do you want me to do that?
```
