
"use client";
import { useState } from "react";
import styles from './page.module.css';

export default function Home() {
  const [src, setSrc] = useState(""); // Initialize source URL as empty string
  const [imageSrc, setImageSrc] = useState("");

  const handleChange = (event) => {
    try {
      const file = event.target.files[0];
      setSrc(URL.createObjectURL(file));
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleImageChange = (event) => {
    try {
      const file = event.target.files[0];
      setImageSrc(URL.createObjectURL(file));
      console.log(file);
      handleUploadImage(file);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadImage = (file) => {
    // ev.preventDefault();

    const data = new FormData();
    // data.append('file', this.uploadInput.files[0]);
    // data.append('filename', this.fileName.value);

    data.append('file', file);
    data.append('filename', file.name);

    console.log(data);

    fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({ imageURL: `http://localhost:8080/${body.file}` });
      });
    });
  }

  return (
    <main className={styles.main}>
      <div className={styles.websiteName}>Slice Stream</div>

      <div className={styles.videoPlayer}>
        {src ? ( // Conditional rendering based on whether src is set
          <video controls width="700" height="400">
            <source src={src} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        ) : (
          <p>Select a video file</p>
        )}
        
      </div>

      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <div className={styles.span}>Select Video</div>
        </div>
        <input type="file" accept="video/mp4" onChange={handleChange} />
        <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
        <div className={styles.button}>
          <div className={styles.span}>Capture Video</div>
        </div>
      </div>
    </main>
  );
}
