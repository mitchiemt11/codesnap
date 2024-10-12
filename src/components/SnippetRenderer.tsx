import { forwardRef } from 'react';
import { Box } from '@mui/material';
import hljs from 'highlight.js';
import 'highlight.js/styles/vs2015.css';
import { Language } from '../types';

interface SnippetRendererProps {
  codeContent: string;
  language: Language;
  spacesPerIndent?: number;
}

const formatCode = (code: string, spacesPerIndent: number): string => {
  const lines = code.split('\n');
  let indentLevel = 0;
  const indentChar = ' '.repeat(spacesPerIndent);

  return lines
    .map((line) => {
      // Trim the line to remove any existing indentation
      const trimmedLine = line.trim();

      // Adjust indent level based on brackets
      if (trimmedLine.endsWith('{')) {
        const formattedLine = `${indentChar.repeat(indentLevel)}${trimmedLine}`;
        indentLevel++;
        return formattedLine;
      } else if (trimmedLine.startsWith('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
        return `${indentChar.repeat(indentLevel)}${trimmedLine}`;
      }

      // Return the line with proper indentation
      return `${indentChar.repeat(indentLevel)}${trimmedLine}`;
    })
    .join('\n');
};

export const SnippetRenderer = forwardRef<HTMLDivElement, SnippetRendererProps>(
  ({ codeContent, language, spacesPerIndent = 2 }, ref) => {
    const formattedCode = formatCode(codeContent, spacesPerIndent);

    return (
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
              __html: hljs.highlight(formattedCode, { language }).value,
            }}
          />
        </pre>
      </Box>
    );
  }
);

SnippetRenderer.displayName = 'SnippetRenderer';
