import { useState, useRef } from 'react';
import { pinata } from '../utils/config';
import html2canvas from 'html2canvas';
import { Language } from '../types';

export const useSnippetUploader = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const snippetRef = useRef<HTMLDivElement>(null);

  const uploadSnippet = async (codeContent: string, language: Language): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const blob = new Blob([codeContent], { type: 'text/plain' });
      const file = new File([blob], `snippet.${language}`, { type: 'text/plain' });
      const upload = await pinata.upload.file(file);

      await pinata.gateways.createSignedURL({
        cid: upload.cid,
        expires: 30,
      });

      if (snippetRef.current) {
        snippetRef.current.style.display = 'block';
        const canvas = await html2canvas(snippetRef.current);
        const image = canvas.toDataURL('image/png');

        if (image) {
          setImageUrl(image);
          snippetRef.current.style.display = 'none';
          return true; // Indicate successful upload
        } else {
          throw new Error('Captured image is empty.');
        }
      } else {
        throw new Error('Snippet reference is null.');
      }
    } catch (error: unknown) {
      setError(`Failed to upload snippet: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return false; // Indicate failed upload
    } finally {
      setLoading(false);
    }
  };

  return { uploadSnippet, imageUrl, error, loading, setError, snippetRef };
};