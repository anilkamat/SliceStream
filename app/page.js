"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';
// import MyVideoComponent from './video.js';
import ReactPlayer from 'react-player'
import MousePosition from "./mouse";
import './cursorCSS.css'; 
// import penguinVideo from './Video.penguinExample.mp4';



export default function Home() {
  const [src, setSrc] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [pointerStyle, setPointerStyle] = useState('auto');
  const [drawing, setDrawing] = useState(false);

  const videoRef = useRef(null);
  const sliderRef = useRef(null);
  const canvasRef = useRef(null);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [useCustomCursor, setUseCustomCursor] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (useCustomCursor) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [useCustomCursor]); // Include useCustomCursor in the dependency array

  const toggleCustomCursor = () => {
    setUseCustomCursor((prevUseCustomCursor) => !prevUseCustomCursor);
  };

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
      console.log("response.json():");
      // console.log(response.json());
      response.then((body) => {
        console.log(response)
        console.log(body)
        console.log(response.mimetype)
        const testSource = 'data:image/png;base64,' + body;
        // this.setState({ imageURL: `http://localhost:8080/${response.file}` });
        this.setState({ imageURL: testSource });
      });
    });
  }

  const penguinVideo = () => {
    try {
      setImageSrc(URL.createObjectURL('videos/penguinVideo.mp4'));
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

  const toggleDrawing = () => {
    setDrawing((prevDrawing) => !prevDrawing);
  };

  const drawDot = (event) => {
    if (canvasRef.current && drawing) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ctx.fillStyle = 'black'; // Set the dot color
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  };


  return (

    <main className={styles.main }>
      <MousePosition />
      {useCustomCursor && (
        <div className="custom-cursor" style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }} />
      )}

      <div className={styles.websiteName}>Slice Stream</div>

      <div className={styles.videoPlayer}>
        {src ? (
          <video ref={videoRef} controls width="700" height="400">
            <source id="sourceVideo" src={src} type="video/mp4" />
            Sorry, your browser doesn't support embedded videos.
          </video>
        ) : (
          <ReactPlayer 
          playing
          url={['videos/penguinVideo.mp4']}
          width='700'
          height='400' />
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
        <div className={styles.button} onClick={() => { toggleDrawing(); toggleCustomCursor(); }}>
          <div className={styles.span}>
            Select Point
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
        <canvas 
          id="canvas" 
          className={styles.canvas}
          ref={canvasRef}
          onMouseDown={drawDot}></canvas>
      </div>
    </main>
  );
}