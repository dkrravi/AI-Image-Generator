import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setImage(null);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-image",
        { prompt },
        { headers: { "Content-Type": "application/json" } }
      );
      setImage(`data:image/jpeg;base64,${response.data.image_base64}`);
    } catch (error) {
      console.error(error);
      alert("Error generating image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "sticky",
          top: "20px",
          zIndex: 10,
          backgroundColor: "#f7f7f7",
          padding: "20px 0",
        }}
      >
        <h1 style={{ marginBottom: "20px", color: "#4a4a4a" }}>
          AI Image Generator
        </h1>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "100%",
            borderRadius: "8px",
            padding: "12px",
            fontSize: "16px",
            border: "1.5px solid #ccc",
            backgroundColor: "#fff",
            color: "#333",
          }}
        />
        <button
          className="btn"
          onClick={generateImage}
          disabled={loading}
          style={{
            backgroundColor: "#555",
            border: "none",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Generating..." : "Generate Image"}
        </button>
      </div>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        {image && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h5 style={{ marginBottom: "15px", color: "#4a4a4a" }}>
              Generated Image:
            </h5>
            <img
              src={image}
              alt="Generated"
              style={{
                maxWidth: "500px",
                maxHeight: "400px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;