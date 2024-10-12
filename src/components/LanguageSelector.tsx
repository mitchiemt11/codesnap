import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Language } from '../types';

interface LanguageSelectorProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => (
  <FormControl fullWidth margin="normal" sx={{ maxWidth: 400 }}>
    <InputLabel>Language</InputLabel>
    <Select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      label="Language"
    >
      <MenuItem value="javascript">JavaScript</MenuItem>
      <MenuItem value="python">Python</MenuItem>
      <MenuItem value="java">Java</MenuItem>
      <MenuItem value="cpp">C++</MenuItem>
    </Select>
  </FormControl>
);