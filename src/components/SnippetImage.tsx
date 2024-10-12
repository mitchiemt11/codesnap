import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Language } from '../types';

interface SnippetImageProps {
  imageUrl: string;
  language: Language;
}

export const SnippetImage: React.FC<SnippetImageProps> = ({ imageUrl, language }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `snippet-${language}.png`;
    link.click();
  };

  return (
    <Box mt={4} textAlign="center">
      <Typography variant="h6">Generated Snippet Image:</Typography>
      <Box mt={2}>
        <img
          src={imageUrl}
          alt="Snippet"
          style={{ maxWidth: '100%', borderRadius: '10px' }}
        />
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleDownload}
        sx={{ mt: 2 }}
      >
        Download Snippet Image
      </Button>
    </Box>
  );
};