import { forwardRef } from 'react';
import { Box } from '@mui/material';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import { Language } from '../types';

interface SnippetRendererProps {
  codeContent: string;
  language: Language;
}

export const SnippetRenderer = forwardRef<HTMLDivElement, SnippetRendererProps>(
  ({ codeContent, language }, ref) => (
    <Box
      ref={ref}
      sx={{
        p: 3,
        backgroundColor: "#1e1e1e",
        color: "#dcdcdc",
        borderRadius: 2,
        display: "none",
        fontFamily: "monospace",
      }}
    >
      <pre>
        <code
          dangerouslySetInnerHTML={{
            __html: hljs.highlight(codeContent, { language }).value,
          }}
        />
      </pre>
    </Box>
  )
);

SnippetRenderer.displayName = 'SnippetRenderer';