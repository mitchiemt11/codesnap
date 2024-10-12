import { useState } from "react";
import { pinata } from "./utils/config"

function App() {
  const [selectedFile, setSelectedFile]: any = useState();
  const [url, setUrl]: any = useState();

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const upload = await pinata.upload.file(selectedFile)
      console.log(upload);

      const signedUrl = await pinata.gateways.createSignedURL({
          cid: upload.cid,
          expires: 30
      })
      setUrl(signedUrl)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="form-label"> Choose File</label>
      <input
        type="file"
        onChange={changeHandler}
      />
      <button onClick={handleSubmission}>Submit</button>
      {url && (
        <img
          src={url}
          alt="uploaded image"
        />
      )}
    </>
  );
}

export default App;
