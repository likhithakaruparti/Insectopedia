# RAG System Backend

This folder contains the backend files for your RAG system.

## Files Structure

- `preprocess_and_train.py` - Main script to process CSV and create embeddings
- `api.py` - API endpoints for frontend communication
- `requirements.txt` - Python dependencies
- `gemini_client.py` - Gemini API integration
- `embeddings/` - Folder to store processed embeddings
- `uploads/` - Folder to store uploaded CSV files

## Setup Instructions

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Set up environment variables:
   ```bash
   export GEMINI_API_KEY="your_gemini_api_key_here"
   ```

3. Run the API server:
   ```bash
   python api.py
   ```

## Usage

1. Frontend uploads CSV to `/api/upload`
2. Backend processes with `preprocess_and_train.py`
3. Frontend sends queries to `/api/query`
4. Backend uses Gemini API to generate responses