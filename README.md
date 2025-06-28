# SlideMentor - AI Presentation Partner

An AI-powered presentation assistant that helps create professional presentations while maintaining user's original ideas.

## Features

- AI-powered slide generation from user content
- Custom visual themes based on topic and audience
- Presentation coaching and strategy feedback
- Real-time preview of generated slides
- Export to PowerPoint format

## Setup

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Run the backend server:
```bash
cd backend
uvicorn app.main:app --reload
```

> **Note:** The backend now uses free Hugging Face models for both language and embeddings. No API key is required.

### Frontend Setup

1. Install frontend dependencies:
```bash
cd frontend
npm install
```

2. Install required packages:
```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

3. Run the frontend development server:
```bash
npm run dev
```

## Project Structure

```
slide_mentor/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── slides.py
│   │   │   ├── questions.py
│   │   │   └── coaching.py
│   │   ├── models/
│   │   │   ├── presentation.py
│   │   │   └── strategy.py
│   │   ├── services/
│   │   │   ├── ai_service.py
│   │   │   ├── pptx_service.py
│   │   │   └── visual_service.py
│   │   └── utils/
│   │       ├── prompts.py
│   │       └── config.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PresentationForm.tsx
│   │   │   └── SlidePreview.tsx
│   │   └── App.tsx
│   └── package.json
└── requirements.txt
```

## Usage

1. Start both backend and frontend servers
2. Open your browser and navigate to `http://localhost:5173`
3. Enter your presentation content, topic, and audience
4. Click "Generate Presentation" to create slides
5. Preview the slides and download the PowerPoint file

## API Endpoints

- POST `/api/slides/generate` - Generate slides from user content
- POST `/api/slides/export` - Export presentation as PPTX
- POST `/api/questions/generate` - Generate clarifying questions
- POST `/api/coaching/feedback` - Get coaching feedback

## Contributing

Feel free to submit issues and enhancement requests!
