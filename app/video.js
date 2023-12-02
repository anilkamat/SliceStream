import React from "react";
import MyVideo from "./Video.penguinExample.mp4";

class MyVideoComponent extends React.Component {
  render() {
    return (
      <video width="700" height="400" preload="auto">
        <source src={MyVideo} type="video/mp4"/>
        Your browser does not support HTML5 video.
      </video>
    );
  }
}

export default MyVideoComponent