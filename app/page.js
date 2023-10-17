
"use client";
import { useState, useRef } from "react";
import styles from './page.module.css';

// sets it to the penguinExample video
function setVideo() {
  document.getElementById("userVideo").src="./penguinExample.mp4";
}



export default function Home() {
  const [src, setSrc] = useState(""); // Initialize source URL as empty string
  const videoRef = useRef(null); // Create a ref for the video element

  const handleChange = (event) => {
    try {
      const file = event.target.files[0];
      setSrc(URL.createObjectURL(file));
    } catch (error) {
      console.error(error);
    }
  };

  const capture = () => {
    if (videoRef.current) {
      const canvas = document.getElementById("canvas");
      const video = videoRef.current;
      const ctx = canvas.getContext("2d");
  
      // Set canvas dimensions to match the video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
  
      // Draw the video frame on the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    // if (videoRef.current) {
    //   const canvas = document.createElement("canvas");
    //   canvas.width = videoRef.current.videoWidth;
    //   canvas.height = videoRef.current.videoHeight;
    //   const ctx = canvas.getContext('2d');
    //   ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    //   canvas.toBlob((blob) => {
    //     const img = new Image();
    //     img.src = window.URL.createObjectUrl(blob);
    //   });
    // }
  };

  return (
    <main className={styles.main}>
      <div className={styles.websiteName}>Slice Stream</div>

      <div className={styles.videoPlayer}>
        {src ? (
          <video ref={videoRef} controls width="700" height="300">
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


        <div className={styles.button} onClick={capture}>
          <div className={styles.span}>Capture Video</div>
        </div>

        <div className={styles.button} onClick={setVideo}>
          <div className={styles.span}>
            Use Penguin
          </div>
        </div>
      </div>

      <div className={styles.videoPlayer}>
        <canvas id="canvas" className={styles.canvas}></canvas>
      </div>
    </main>
  );
}
