import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useSpring, animated } from 'react-spring';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [props, set] = useSpring(() => ({
    opacity: 1,
    transform: 'translateY(0px)',
  }));

  const handleGetStarted = () => {
    set({
      opacity: 0,
      transform: 'translateY(-50px)',
      onRest: onGetStarted,
    });
  };

  return (
    <animated.div style={props}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          // padding: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          SnipShot 📸
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          A Stylish Code Snippet Uploader
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          No sign up required
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleGetStarted}
          sx={{ mt: 4, fontSize: '1.2rem', padding: '12px 24px' }}
        >
          Get Started ➡️
        </Button>
      </Box>
    </animated.div>
  );
};