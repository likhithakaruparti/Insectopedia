# RAG System - Complete Setup Instructions

## Project Structure

```
project-root/
├── src/                    # Frontend (React/TypeScript)
│   ├── components/
│   │   ├── CSVUpload.tsx   # File upload component
│   │   ├── QueryInterface.tsx # Chat interface
│   │   └── ui/             # Shadcn UI components
│   └── pages/
│       ├── Index.tsx       # Landing page
│       └── RAGSystem.tsx   # Main RAG interface
├── backend/                # Python backend
│   ├── api.py             # Flask API server
│   ├── preprocess_and_train.py # Data processing
│   ├── gemini_client.py   # Gemini API integration
│   ├── requirements.txt   # Python dependencies
│   ├── uploads/           # CSV upload directory
│   └── embeddings/        # Processed data storage
└── README.md
```

## Frontend Setup (Already Complete)

The frontend is fully functional with:
- ✅ Beautiful landing page
- ✅ CSV upload interface with drag & drop
- ✅ Chat-based query interface
- ✅ Responsive design with dark/light mode
- ✅ Toast notifications and loading states

## Backend Setup (For VS Code)

### 1. Setup Python Environment

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv rag_env

# Activate virtual environment
# On Windows:
rag_env\Scripts\activate
# On macOS/Linux:
source rag_env/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 3. Set Environment Variables

Create a `.env` file in the backend directory:

```bash
# backend/.env
GEMINI_API_KEY=your_actual_api_key_here
```

### 4. Implement the Backend Logic

The backend files are created with TODOs. Here's what you need to implement:

#### In `preprocess_and_train.py`:
- CSV data loading and cleaning
- Text chunking for RAG
- Creating embeddings using sentence-transformers
- Saving embeddings for retrieval

#### In `gemini_client.py`:
- Complete Gemini API integration
- Context retrieval from embeddings
- Prompt engineering for better responses

#### In `api.py`:
- File upload handling
- CORS configuration
- Error handling
- Integration with preprocessing pipeline

### 5. Run the Backend

```bash
# In the backend directory with virtual environment activated
python api.py
```

The backend will run on `http://localhost:5000`

### 6. Update Frontend API Endpoints

Update your frontend to point to the backend API:
- Upload: `POST http://localhost:5000/api/upload`
- Query: `POST http://localhost:5000/api/query`

## Complete Implementation Example

Here's a basic implementation for `preprocess_and_train.py`:

```python
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer
import faiss
import pickle
import os

def preprocess_csv(file_path: str) -> pd.DataFrame:
    df = pd.read_csv(file_path)
    # Convert all columns to string and combine
    df['combined_text'] = df.astype(str).agg(' | '.join, axis=1)
    return df

def create_embeddings(data: pd.DataFrame) -> str:
    model = SentenceTransformer('all-MiniLM-L6-v2')
    texts = data['combined_text'].tolist()
    embeddings = model.encode(texts)
    
    # Create FAISS index
    index = faiss.IndexFlatIP(embeddings.shape[1])
    index.add(embeddings.astype('float32'))
    
    # Save everything
    embeddings_path = f"embeddings/{os.path.basename(file_path)}.pkl"
    with open(embeddings_path, 'wb') as f:
        pickle.dump({
            'index': index,
            'texts': texts,
            'model_name': 'all-MiniLM-L6-v2'
        }, f)
    
    return embeddings_path
```

## Testing the System

1. Start the backend: `python backend/api.py`
2. Open the frontend in browser
3. Upload a CSV file
4. Ask questions about your data
5. Get AI-powered responses!

## Deployment Notes

For production deployment:
- Use a proper WSGI server (gunicorn)
- Set up proper environment variable management
- Add rate limiting and authentication
- Use a production database for embeddings
- Add proper error logging

## Troubleshooting

- **CORS Issues**: Make sure flask-cors is properly configured
- **API Key Issues**: Verify your Gemini API key is valid
- **File Upload Issues**: Check file permissions in uploads/ directory
- **Memory Issues**: Use batching for large CSV files