import React, { useState, useEffect } from 'react';
import "./cursorCSS.css";

const MousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div style={{ position: 'fixed', top: 0, right: 0, padding: '10px', background: 'rgba(255, 255, 255, 0.7)' }}>
      Mouse Position: {mousePosition.x}, {mousePosition.y}
    </div>
  );
};

export default MousePosition;