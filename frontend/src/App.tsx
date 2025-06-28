import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { PresentationForm } from './components/PresentationForm';
import { SlidePreview } from './components/SlidePreview';
import { Slide } from './models/slide';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function AppContent() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSlides([]);
        navigate('/', { replace: true });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const handleGenerateSlides = (newSlides: Slide[]) => {
    setSlides(newSlides);
    navigate('/preview');
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/slides/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slides }),
      });

      if (!response.ok) throw new Error('Failed to download presentation');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'presentation.pptx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to download presentation. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Routes>
        <Route path="/" element={
          <PresentationForm onGenerateSlides={handleGenerateSlides} />
        } />
        <Route path="/preview" element={
          <SlidePreview slides={slides} onDownload={handleDownload} />
        } />
      </Routes>
    </Box>
  );
}

function App() { 
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [content, setContent] = useState('');
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const slidesData = await generateSlides({ topic, audience, content, knowledge: '' });
      setSlides(slidesData);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h1>SlideMentor</h1>
      <form onSubmit={handleSubmit}>
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic" required />
        <input value={audience} onChange={e => setAudience(e.target.value)} placeholder="Audience" required />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Paste your paragraphs here" required />
        <button type="submit" disabled={loading}>Generate Slides</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading && <div>Loading...</div>}
      <div>
        {slides.map((slide, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', margin: 16, padding: 16, borderRadius: 8 }}>
            <h2>{slide.title}</h2>
            <ul>
              {slide.content.map((pt: string, i: number) => <li key={i}>{pt}</li>)}
            </ul>
            <div><strong>Speaker Notes:</strong> {slide.speaker_notes}</div>
          </div>
        ))}
      </div>
    </div>
  );



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

//export default App;

//import React, { useState } from 'react';
// ... your other imports

async function generateSlides({ topic, audience, content, knowledge }: any) {
  const response = await fetch('/api/slides/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic, audience, content, knowledge }),
  });
  if (!response.ok) throw new Error('Slide generation failed');
  const data = await response.json();
  const slides = typeof data.slides === 'string' ? JSON.parse(data.slides) : data.slides;
  return slides;
}

export default App;
