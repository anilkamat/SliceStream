
"use client";
import { useState } from "react";
import styles from './page.module.css';

export default function Home() {
  const [src, setSrc] = useState(""); // Initialize source URL as empty string

  const handleChange = (event) => {
    try {
      const file = event.target.files[0];
      setSrc(URL.createObjectURL(file));
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className={styles.button}>
          <div className={styles.span}>Capture Video</div>
        </div>
      </div>
    </main>
  );
}
