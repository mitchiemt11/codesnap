import { useState, useRef } from "react";
import { pinata } from "./utils/config";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import html2canvas from "html2canvas";

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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Code Snippet Uploader</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Language: </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ padding: "5px", width: "200px" }}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          {/* Add more languages as needed */}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label style={{ marginRight: "10px" }}>Code: </label>
        <textarea
          value={codeContent}
          onChange={(e) => setCodeContent(e.target.value)}
          rows={10}
          cols={50}
          style={{ padding: "10px", fontFamily: "monospace" }}
        />
      </div>

      <button
        onClick={handleSubmission}
        style={{ padding: "10px 20px", cursor: "pointer" }}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated Snippet Image:</h2>
          <img src={imageUrl} alt="Snippet" style={{ maxWidth: "100%", borderRadius: "10px" }} />
          <button onClick={handleDownload} style={{ padding: "10px 20px", marginTop: "10px" }}>
            Download Snippet Image
          </button>
        </div>
      )}

      {/* Hidden code block for html2canvas to capture */}
      <div
        ref={snippetRef}
        style={{
          padding: !imageUrl ? '0px' : '20px',
          backgroundColor: "#1e1e1e", // Dark background like VSCode
          color: "#dcdcdc", // Text color for dark theme
          borderRadius: "10px", // Rounded borders
          fontFamily: "monospace",
          display: "block", // Ensure it's displayed for capture
        }}
      >
        <pre>
          <code
            dangerouslySetInnerHTML={{
              __html: hljs.highlight(codeContent, { language }).value,
            }}
          />
        </pre>
      </div>
    </div>
  );
}

export default App;
