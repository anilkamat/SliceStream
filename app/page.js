
"use client";
import { useState, useRef } from "react";
import styles from './page.module.css';

// sets it to the penguinExample video



export default function Home() {
  const [src, setSrc] = useState(""); // Initialize source URL as empty string
  const [imageSrc, setImageSrc] = useState("");
  const videoRef = useRef(null); // Create a ref for the video element
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
      const video = document.getElementById("userVideo");
      const source = document.getElementById("sourceVideo");

      // Set the source element's src attribute to the online URL
      source.setAttribute("src", videoUrl);

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
          <div className={styles.span}>Select Video</div>
        </div>
        <input type="file" accept="video/mp4" onChange={handleChange} />
        <input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
        <div className={styles.button}>


          <input type="file" accept="video/mp4" onChange={addUserVideo} />


          <div className={styles.button} onClick={capture}>
            <div className={styles.span}>Capture Video</div>
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
        </div>
      </div>
    </main>
  );
}
// import { useState, useRef, useEffect } from "react";
// import styles from './page.module.css';

// export default function Home() {
//   const [src, setSrc] = useState("");
//   const videoRef = useRef(null);
//   const sliderRef = useRef(null);

//   const addUserVideo = (event) => {
//     try {
//       const file = event.target.files[0];
//       setSrc(URL.createObjectURL(file));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const penguinVideo = () => {
//     try {
//       const videoUrl = "https://www.pexels.com/video/penguins-at-the-zoo-1528489/";
//       const video = videoRef.current;
//       const source = document.getElementById("sourceVideo");

//       source.setAttribute("src", videoUrl);
//       video.load();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const capture = () => {
//     if (videoRef.current) {
//       const canvas = document.getElementById("canvas");
//       const video = videoRef.current;
//       const ctx = canvas.getContext("2d");

//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     }
//   };

//   const updateSliderPosition = () => {
//     const slider = sliderRef.current;
//     const video = videoRef.current;

//     if (slider && video) {
//       const currentTime = video.currentTime;
//       const duration = video.duration;

//       if (duration > 0) {
//         const sliderValue = (currentTime / duration) * 100;
//         slider.value = sliderValue;
//       }
//     }
//   };

//   useEffect(() => {
//     const video = videoRef.current;

//     if (video) {
//       video.addEventListener("timeupdate", updateSliderPosition);

//       return () => {
//         video.removeEventListener("timeupdate", updateSliderPosition);
//       };
//     }
//   }, []);

//   return (
//     <main className={styles.main}>
//       <div className={styles.websiteName}>Slice Stream</div>
//       <div className={styles.videoPlayer}>
//         {src ? (
//           <video ref={videoRef} controls width="700" height="400">
//             <source id="sourceVideo" src={src} type="video/mp4" />
//             Sorry, your browser doesn't support embedded videos.
//           </video>
//         ) : (
//           <p>Select a video file</p>
//         )}
//       </div>
//       <div className={styles.buttonContainer}>
//         <div className={styles.button}>
//           <div className={styles.span}>Select Video</div>
//         </div>
//         <input type="file" accept="video/mp4" onChange={addUserVideo} />
//         <div className={styles.button} onClick={capture}>
//           <div className={styles.span}>Capture Video</div>
//         </div>
//         <div className={styles.button} onClick={penguinVideo}>
//           <div className={styles.span}>Use Penguin</div>
//         </div>
//         <div className={styles.sliderContainer}>
//           <input
//             className={styles.slider}
//             type="range"
//             id="frameSlider"
//             min="0"
//             max="100"
//             step="0.5"
//             defaultValue="0"
//             onChange={updateSliderPosition}
//             ref={sliderRef}
//           />
//         </div>
//       </div>
//       <div className={styles.videoPlayer}>
//         <canvas id="canvas" className={styles.canvas}></canvas>
//       </div>
//     </main>
//   );
// }
