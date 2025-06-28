import { FC } from 'react';
import { Button, Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { Slide } from '../models/slide';

interface SlidePreviewProps {
  slides: Slide[];
  onDownload: () => Promise<void>;
}

export const SlidePreview: FC<SlidePreviewProps> = ({ slides, onDownload }) => {
  if (slides.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">No slides to display</Typography>
        <Button onClick={() => window.location.href = '/'} variant="outlined" sx={{ mt: 2 }}>
          Back to Form
        </Button>
        <Button onClick={onDownload} variant="contained" sx={{ mt: 2, ml: 2 }}>
          Download Slides
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', my: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Presentation Preview
        </Typography>
        <Box>
          <Button onClick={onDownload} variant="contained" sx={{ mr: 2 }}>
            Download Slides
          </Button>
          <Button onClick={() => window.location.href = '/'} variant="outlined">
            Back to Form
          </Button>
        </Box>
      </Box>
      
      {slides.map((slide, index) => (
        <Paper key={index} elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {slide.title || `Slide ${index + 1}`}
          </Typography>
          
          <List dense>
            {slide.bullets.map((bullet, i) => (
              <ListItem key={i}>
                <ListItemText primary={`• ${bullet}`} />
              </ListItem>
            ))}
          </List>
          
          {slide.notes && (
            <Box mt={2} pt={2} borderTop={1} borderColor="divider">
              <Typography variant="body2" color="text.secondary">
                <strong>Speaker Notes:</strong> {slide.notes}
              </Typography>
            </Box>
          )}
          
          {slide.image && (
            <Box mt={2} textAlign="center">
              <img 
                src={slide.image} 
                alt={slide.title || `Slide ${index + 1}`} 
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
              />
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  );
}
