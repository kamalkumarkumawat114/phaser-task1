
import React, { useState } from "react";
import GameCanvas from "./GameCanvas";
import SessionLog from "./SessionLog";

const App = () => {
  const [sessions, setSessions] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [stopGame, setStopGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [sessionActive, setSessionActive] = useState(false); 

  const startSession = () => {
    if (sessionActive) {
      
      return;
    }

    const sessionId = Math.random().toString(36).substr(2, 9);
    const startTime = Date.now();
    const randomCountdown = Math.floor(Math.random() * (120 - 30 + 1)) + 30;

    setCounter(randomCountdown);
    setStartGame(true);
    setStopGame(false);
    setSessionActive(true); 

    const countdownInterval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(countdownInterval);

          const endTime = Date.now();

          setSessions((prevSessions) => [
            ...prevSessions,
            { id: sessionId, startTime, endTime },
          ]);

          setStartGame(false);
          setStopGame(true);
          setSessionActive(false); 
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left Panel: Game and Controls */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Phaser-Task1</h1>
        <button onClick={startSession} disabled={sessionActive}>
          {sessionActive ? "Session Active..." : "Start Game"}
        </button>
        <p>Counter: {counter}</p>
        <GameCanvas startGame={startGame} stopGame={stopGame} />
      </div>

      {/* Right Panel: Session Log */}
      <div style={{ flex: 1, padding: "20px", borderLeft: "1px solid #ccc" }}>
        <SessionLog sessions={sessions} />
      </div>
    </div>
  );
};

export default App;
