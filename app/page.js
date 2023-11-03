"use client";
import { useState, useRef } from "react";
import styles from './page.module.css';



export default function Home() {
  const [src, setSrc] = useState("");
  const [imageSrc, setImageSrc] = useState("");

  const videoRef = useRef(null);
  const sliderRef = useRef(null);

  const addUserVideo = (event) => {
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

  const penguinVideo = () => {
    try {
      const videoUrl = "https://www.pexels.com/video/penguins-at-the-zoo-1528489/";
      // const video = videoRef.current;
      const video = document.getElementById("userVideo");
      const source = document.getElementById("sourceVideo");

      // Set the source element's src attribute to the online URL
      video.setAttribute("src", videoUrl);

      // Load the video to play it
      video.load();
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
  };

  const updateVideoFrame = () => {
    const slider = document.getElementById("frameSlider");
    const video = videoRef.current;

    if (video && slider) {
      const frameValue = (slider.value / 100) * video.duration;
      video.currentTime = frameValue;
      capture();
    }
  };



  return (

    <main className={styles.main}>
      <div className={styles.websiteName}>Slice Stream</div>

      <div className={styles.videoPlayer}>
        {src ? (
          <video ref={videoRef} controls width="700" height="400">
            <source id="sourceVideo" src={src} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        ) : (
          <p>Select a video file</p>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <div className={styles.button}>
          <label for="video-input">
            <div className={styles.span}>
                Upload Video
            </div>  
          </label>
          <input id="video-input" type="file" accept="video/mp4" onChange={addUserVideo} />
        </div>

        <div className={styles.button}>
          <label for="picture-input">
            <div className={styles.span}>
                Upload Picture
            </div>  
          </label>
          <input id="picture-input" type="file" accept="image/png, image/jpeg" onChange={handleImageChange} /> 
        </div>



          <div className={styles.button} onClick={capture}>
            <div className={styles.span}>
              Capture Video
            </div>
          </div>

          <div className={styles.button} onClick={penguinVideo}>
            <div className={styles.span}>
              Use Penguin
            </div>
          </div>

          <div className={styles.sliderContainer}>
            <input className={styles.sliderContainer}
              type="range"
              id="frameSlider"
              min="0"
              max="100"
              step="0.5"
              defaultValue="0"
              onChange={updateVideoFrame}
            />
          </div>
      </div>

      <div className={styles.videoPlayer}>
        <canvas id="canvas" className={styles.canvas}></canvas>
        <div className={styles.button}>
            <div className={styles.span}>
              Select Masks
            </div>
          </div>
      </div>
    </main>
  );
}
