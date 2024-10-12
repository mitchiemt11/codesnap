import React, { useState } from 'react';
import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { LanguageSelector } from './components/LanguageSelector';
import { CodeInput } from './components/CodeInput';
import { SubmitButton } from './components/SubmitButton';
import { SnippetImage } from './components/SnippetImage';
import { ErrorModal } from './components/ErrorModal';
import { SnippetRenderer } from './components/SnippetRenderer';
import { LandingPage } from './components/LandingPage';
import { useSnippetUploader } from './hooks/useSnippetUploader';
import { Language } from './types';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000080',
    },
    secondary: {
      main: '#FFFF',
    },
  },
});

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [language, setLanguage] = useState<Language>('javascript');
  const [codeContent, setCodeContent] = useState<string>('');
  const { uploadSnippet, imageUrl, error, loading, setError, snippetRef } = useSnippetUploader();

  const mainContentProps = useSpring({
    opacity: showLanding ? 0 : 1,
    transform: showLanding ? 'translateY(50px)' : 'translateY(0px)',
  });

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleSubmission = async () => {
    if (!codeContent) {
      setError('Please provide code content.');
      return;
    }
    const success = await uploadSnippet(codeContent, language);
    if (success) {
      setCodeContent('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {showLanding ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <animated.div style={mainContentProps}>
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
        </animated.div>
      )}
    </ThemeProvider>
  );
};

export default App;
