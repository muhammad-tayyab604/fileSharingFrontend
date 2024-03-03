import { useEffect, useRef, useState } from "react";
import "./App.css";
import { uploadFile } from "./services/Api";

function App() {
  const [file, setFile] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [result, setResult] = useState([]);
  const ref = useRef();

  const onClickUpload = () => {
    ref.current.click();
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
        console.log(response);

        const imageURL = URL.createObjectURL(file);
        setImageURL(imageURL);
      }
    };
    getImage();
  }, [file]);

  console.log(file);

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Send Files seamlessly</h1>
        <p>Upload and Share the download link</p>
        <button onClick={onClickUpload}>Upload</button>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          style={{ display: "none" }}
          type="file"
          ref={ref}
        />

        <div className="imageAndName">
          <img src={imageURL} alt={file.name} />
          {file.name}
        </div>

        <a className="downloadBtn" href={result}>
          Download
        </a>
        <div className="dLink">
          <h4>Download Link</h4>
          <p>{result}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
