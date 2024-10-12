import { useState, useRef } from "react";
import { pinata } from "./utils/config";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import html2canvas from "html2canvas";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Typography, Box, CircularProgress } from '@mui/material';

function App() {
  const [language, setLanguage] = useState<string>("javascript");
  const [codeContent, setCodeContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const snippetRef = useRef<HTMLDivElement>(null);

  const handleSubmission = async () => {
    if (!codeContent) {
      setError("Please provide code content.");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const blob = new Blob([codeContent], { type: "text/plain" });
      const file = new File([blob], `snippet.${language}`, { type: "text/plain" });
      const upload = await pinata.upload.file(file);

      await pinata.gateways.createSignedURL({
        cid: upload.cid,
        expires: 30,
      });

      // Generate the snippet image
      if (snippetRef.current) {
        const canvas = await html2canvas(snippetRef.current);
        const image = canvas.toDataURL("image/png");

        if (image) {
          setImageUrl(image);
        } else {
          throw new Error("Captured image is empty.");
        }
      } else {
        throw new Error("Snippet reference is null.");
      }
    } catch (error: any) {
      setError("Failed to upload snippet: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `snippet-${language}.png`;
      link.click();
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

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <FormControl fullWidth margin="normal" sx={{ maxWidth: 400 }}>
        <InputLabel>Language</InputLabel>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          label="Language"
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="java">Java</MenuItem>
          <MenuItem value="cpp">C++</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Code"
        value={codeContent}
        onChange={(e) => setCodeContent(e.target.value)}
        multiline
        rows={10}
        fullWidth
        margin="normal"
        InputProps={{ sx: { fontFamily: 'monospace' } }}
        sx={{ maxWidth: 600 }}
      />

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmission}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Box>

      {imageUrl && (
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
      )}

      <Box
        ref={snippetRef}
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
    </Box>
  );
}

export default App;
