import { useState } from "react";

const App = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]); 
  const [displayDogImage, setDisplayDogImage] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch a random dog image
  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      setDisplayDogImage(data.message);
    } catch (error) {
      console.error("Error fetching dog image:", error);
    }
  };

  // Submit dog image to the server
  const submitDogImage = async (e) => {
    e.preventDefault();
    if (!displayDogImage) {
      console.error("No dog image to submit");
      return;
    }
    try {
      const response = await fetch(displayDogImage);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append("file", blob, "dogo.jpg");

      const uploadFile = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const responseData = await uploadFile.json();
      setMessage(responseData.message);
    } catch (error) {
      console.error("Error submitting dog image:", error);
    }
  };

  // Fetch multiple images from the server
  const fetchMultipleImages = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch multiple images");
      }
  
      const data = await response.json(); // Expecting an array of filenames
  
      const filePromises = data.map(async (filename) => {
        const fileResponse = await fetch(`http://localhost:8000/fetch/file/${filename}`);
        const fileBlob = await fileResponse.blob();
        return URL.createObjectURL(fileBlob);
      });
  
      const imageUrls = await Promise.all(filePromises);
      setDisplayImages(imageUrls); // ✅ Set state with images
    } catch (error) {
      console.error("Error fetching multiple images:", error);
    }
  };

  // Handle single file selection
  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  // Fetch a single image from the server
  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);
      const blob = await response.blob();
      setDisplayImage(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  // Upload a single file to the server
  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", singleFile);

      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  

  return (
    <div>
      <p>{message}</p>

      {/* Fetch Single Image */}
      <h2>Fetch Single Random Image</h2>
      <button onClick={fetchSingleFile}>Fetch Single File</button>
      {displayImage && (
        <div>
          <h3>Single File</h3>
          <img src={displayImage} alt="Display" style={{ width: "200px", marginTop: "10px" }} />
        </div>
      )}

      {/* Upload Single Image */}
      <form onSubmit={handleSubmitSingleFile}>
        <h2>Upload Single File</h2>
        <input type="file" onChange={handleSingleFileChange} />
        <button type="submit">Upload Single File</button>
      </form>

      {/* Fetch Multiple Images */}
      <h2>Fetch Multiple Images</h2>
      <button onClick={fetchMultipleImages}>Fetch Multiple Images</button>
      {displayImages && displayImages.length > 0 ? (
  displayImages.map((imageUrl, index) => ( 
    <div key={index}>
      <img src={imageUrl} alt={`Fetched ${index}`} style={{ width: "200px", height: "200px", margin: "10px" }} />
    </div>
  ))
) : (
  <p>No images to display yet</p>
)}
      <button onClick={fetchDogImage}>Get The Dogo</button>
      {displayDogImage && (
        <div>
          <h3>Here's The Dogo</h3>
          <img src={displayDogImage} alt="Dog" style={{ width: "300px" }} />
          <button onClick={submitDogImage}>Submit to Server</button>
        </div>
      )}
    </div>
  );
};

export default App;
