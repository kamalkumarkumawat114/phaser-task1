
import React, { useState } from "react";
import Phaser from "phaser";
import "./App.css";
const App = () => {
  const [sessions, setSessions] = useState([]);
  const [counter, setCounter] = useState(0);
  const [phaserGame, setPhaserGame] = useState(null);
  const [tween, setTween] = useState(null);

  const startSession = () => {
    const sessionId = Math.random().toString(36).substr(2, 9);
    const countdown = Math.floor(Math.random() * (120 - 30 + 1)) + 30; 
    const startTime = new Date().toLocaleTimeString();

    setCounter(countdown);

    setSessions((prevSessions) => [
      ...prevSessions,
      { sessionId, startTime, endTime: null },
    ]);

    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          const endTime = new Date().toLocaleTimeString();

          setSessions((prevSessions) =>
            prevSessions.map((session) =>
              session.sessionId === sessionId
                ? { ...session, endTime }
                : session
            )
          );

          stopAnimation(); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    startAnimation();
  };

  const startAnimation = () => {
    if (phaserGame) return; 

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 400,
      backgroundColor: "#87CEEB",
      parent: "phaser-container",
      scene: {
        create: function () {
          const ball = this.add.circle(400, 300, 20, 0xff0000); 
          const floorY = 380; 
          const midY = 200; 

          const ballTween = this.tweens.add({
            targets: ball,
            y: { from: floorY, to: midY }, 
            duration: 700,
            yoyo: true,
            repeat: -1, 
          });

          setTween(ballTween); 
        },
      },
    };

    setPhaserGame(new Phaser.Game(config)); 
  };

  const stopAnimation = () => {
    if (tween) {
      tween.stop(); 
      setTween(null); 
    }
    if (phaserGame) {
      phaserGame.destroy(true); 
      setPhaserGame(null); 
    }
  };

  return (
    <div className="container">
      {/* Left Panel */}
      <div className="left-panel">
        <h1>Phaser Task</h1>
        <button onClick={startSession} className="button">
          Start Game
        </button>
        <div className="counter">
          <strong>Counter:</strong> {counter}
        </div>
        <div id="phaser-container" className="phaser-container"></div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <h3>Session Details</h3>
        <ul className="session-list">
          {sessions.map((session, index) => (
            <li key={index} className="session-item">
              <div className="session-id">
                <strong>Session ID:</strong> {session.sessionId}
              </div>
              <div className="session-time">
                <strong>Start:</strong> {session.startTime}
                <strong>End:</strong> {session.endTime || "In Progress"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
