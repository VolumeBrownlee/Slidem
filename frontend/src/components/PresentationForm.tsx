import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import { Slide } from '../models/slide';

interface PresentationFormProps {
  onGenerateSlides: (slides: Slide[]) => void;
}

export const PresentationForm: FC<PresentationFormProps> = ({ onGenerateSlides }) => {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to generate slides
    const mockSlides: Slide[] = [
      {
        title: `Introduction to ${topic}`,
        bullets: [
          `Welcome to our presentation about ${topic}`,
          `Target audience: ${audience}`,
          'Key points we will cover...'
        ],
        notes: 'Introduce the topic and set expectations.'
      }
    ];
    onGenerateSlides(mockSlides);
    navigate('/preview');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Presentation
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Presentation Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            margin="normal"
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Target Audience"
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            required
            margin="normal"
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Key Points or Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            multiline
            rows={6}
            required
            margin="normal"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Generate Slides
        </Button>
      </form>
    </Paper>
  );
}
