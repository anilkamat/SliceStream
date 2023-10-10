// Function to handle video file selection
function handleVideoUpload() {
    const videoInput = document.getElementById('videoInput');
    const userVideo = document.getElementById('userVideo');
    const userVideoSource = document.getElementById('userVideoSource');
  
    // Check if a file was selected
    if (videoInput.files.length > 0) {
      const selectedVideo = videoInput.files[0];
  
      // Set the video source and display it
      userVideoSource.src = URL.createObjectURL(selectedVideo);
      userVideo.load();
    }
}
  
// Add an event listener to the file input
document.getElementById('videoInput').addEventListener('change', handleVideoUpload);

// sets it to the penguinExample video
function setVideo() {
    document.getElementById("userVideo").src="./penguinExample.mp4";
}


//
function capture() {
    var canvas = document.getElementById("canvas");     
    var video = document.getElementById("userVideo");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);  
    canvas.toBlob() = (blob) => {
      const img = new Image();
      img.src = window.URL.createObjectUrl(blob);
    };
  }