import React from 'react';
import { TextField } from '@mui/material';

interface CodeInputProps {
  codeContent: string;
  setCodeContent: (content: string) => void;
}

export const CodeInput: React.FC<CodeInputProps> = ({ codeContent, setCodeContent }) => (
  <TextField
    label="Enter your code here"
    value={codeContent}
    onChange={(e) => setCodeContent(e.target.value)}
    multiline
    rows={10}
    fullWidth
    margin="normal"
    InputProps={{ sx: { fontFamily: 'monospace' } }}
    sx={{ maxWidth: 600 }}
  />
);