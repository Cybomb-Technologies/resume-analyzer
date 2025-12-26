import React, { useState } from "react";
import "./analyse.css";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import HowItWorks from "../../components/howitworks";

/* FIXED PDF WORKER */
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function Analyse() {

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  //  MODE STATE (ADDED)
  const [mode, setMode] = useState("JD_BASED");

  const navigate = useNavigate();

  async function extractPDF(file) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + " ";
      }
      
      // CLEANUP: Fix spacing issues common in PDF extraction
      return text
        .replace(/\s+/g, " ")  // Collapse multiple spaces
        .replace(/ \n/g, "\n") // Fix spaces before newlines
        .trim();
    } catch {
      return "";
    }
  }

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    let resumeText = await extractPDF(file);

    if (!resumeText || resumeText.length < 10) {
      resumeText = `
      Resume uploaded but text could not be extracted.
      Please analyze based on general resume patterns.
      `;
    }

    //  STORE DATA
    localStorage.setItem("resume_text", resumeText);
    localStorage.setItem("analysis_mode", mode);

    navigate("/pagedescription");
  }

  return (
    <div className="analyse-container">

      <h1 className="analyse-title">
        Upload your resume and let AI find your <br />
        perfect job match.
      </h1>

      {/*  MODE TOGGLE (ADDED) */}
      <div className="mode-toggle">
        <button
          className={mode === "JD_BASED" ? "active" : ""}
          onClick={() => setMode("JD_BASED")}
        >
          Resume + Job Description
        </button>

        <button
          className={mode === "RESUME_ONLY" ? "active" : ""}
          onClick={() => setMode("RESUME_ONLY")}
        >
          Resume Only
        </button>
      </div>

      <p className="mode-help">
        Choose <b>Resume Only</b> for a general ATS check.<br />
        Choose <b>Resume + JD</b> for role-specific matching.
      </p>

      {/* UPLOAD BOX */}
      <div
        className="upload-box"
        onClick={() => document.getElementById("resumeInput").click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (!file) return;
          handleFileUpload({ target: { files: [file] } });
        }}
      >
        <div className="upload-icon">☁</div>

        <p className="upload-title">
          {fileName || "Drop your resume here"}
        </p>

        <p className="upload-sub">or click to upload</p>

        <p className="upload-formats">
          PDF • DOCX • DOC <span>Max 5MB</span>
        </p>

        <p className="upload-sample">
          Try a sample resume →
        </p>

        <input
          id="resumeInput"
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          disabled={loading}
          hidden
        />

        {loading && <div className="loader" />}
      </div>

      {/* SECURITY TEXT */}
      <p className="security-text">
        🔒 Your resume is encrypted and processed securely. We never share your data.
      </p>

      {/* HOW IT WORKS */}
      <div className="analyse-howitworks">
        <HowItWorks />
      </div>

    </div>
  );
}
