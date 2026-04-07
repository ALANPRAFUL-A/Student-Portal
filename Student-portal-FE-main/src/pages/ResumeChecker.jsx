// ResumeChecker.jsx
import { useState } from "react";
import axios from "axios";
import '../styles/ResumeChecker.css' // Ensure this path is correct

function ResumeChecker() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload."); // Provide user feedback
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await axios.post("http://localhost:5500/upload", formData);
      setResult(res.data);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Resume upload failed. Please try again."); // User-friendly error
    }
  };

  return (
    <div className="resumecheckerform">
      <h1 className="resumecheckerheading">Resume ATS Checker</h1>
      <div className="resumechecker-form">
        <label htmlFor="file" className="resumecheckerlable">Upload Resume</label> {/* htmlFor is correct for React */}
        <input name="file" id="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="submitbutton" onClick={handleUpload}>Check Resume</button>
      </div>
      
      {result && (
        <div className="result-container"> {/* Added class for styling */}
          <h2>ATS Score: {result.atsScore}/100</h2>
          <h3>Suggestions:</h3>
          <ul>
            {result.suggestions.length === 0
              ? <li style={{ color: "green" }}>Looks perfect! 🚀</li>
              : result.suggestions.map((s, i) => (
                  <li key={i} style={{ color: "red" }}>{s}</li>
                ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}

export default ResumeChecker;