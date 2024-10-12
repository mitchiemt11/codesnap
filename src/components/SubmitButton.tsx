import React from 'react';
import { Button, CircularProgress, Box } from '@mui/material';

interface SubmitButtonProps {
  onClick: () => void;
  loading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, loading }) => (
  <Box mt={2}>
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? <CircularProgress size={24} /> : 'Submit'}
    </Button>
  </Box>
);