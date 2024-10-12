import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { LanguageSelector } from './components/LanguageSelector';
import { CodeInput } from './components/CodeInput';
import { SubmitButton } from './components/SubmitButton';
import { SnippetImage } from './components/SnippetImage';
import { ErrorModal } from './components/ErrorModal';
import { SnippetRenderer } from './components/SnippetRenderer';
import { useSnippetUploader } from './hooks/useSnippetUploader';
import { Language } from './types';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('javascript');
  const [codeContent, setCodeContent] = useState<string>('');
  const { uploadSnippet, imageUrl, error, loading, setError, snippetRef } = useSnippetUploader();

  const handleSubmission = async () => {
    if (!codeContent) {
      setError('Please provide code content.');
      return;
    }
    const success = await uploadSnippet(codeContent, language);
    if (success) {
      setCodeContent(''); // Clear the code content after successful submission
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={4}
      fontFamily="Arial"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Code Snippet Uploader
      </Typography>

      <LanguageSelector language={language} setLanguage={setLanguage} />
      <CodeInput codeContent={codeContent} setCodeContent={setCodeContent} />
      <SubmitButton onClick={handleSubmission} loading={loading} />
      {imageUrl && <SnippetImage imageUrl={imageUrl} language={language} />}
      <ErrorModal error={error} onClose={() => setError(null)} />
      <SnippetRenderer 
        ref={snippetRef} 
        codeContent={codeContent} 
        language={language} 
        spacesPerIndent={2}
      />
    </Box>
  );
};

export default App;
