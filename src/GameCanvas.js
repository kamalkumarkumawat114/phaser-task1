import Phaser from "phaser";
import { useEffect } from "react";

const GameCanvas = ({ startGame, stopGame }) => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 750,
      height: 450,
      backgroundColor: "#87CEEB",
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }, 
        },
      },
      scene: {
        preload,
        create,
        update,
      },
    };

    let ball;
    const game = new Phaser.Game(config);

    function preload() {}

    function create() {
     
      ball = this.add.circle(300, 200, 15, 0xff0000); 
      this.physics.add.existing(ball);

      
      ball.body.setCollideWorldBounds(true); 
      ball.body.setBounce(1); 
    }

    function update() {
      if (startGame) {
       
        if (ball.body.velocity.x === 0 && ball.body.velocity.y === 0) {
          const randomX = Phaser.Math.Between(-200, 200); 
          const randomY = Phaser.Math.Between(-200, 200); 
          ball.body.setVelocity(randomX, randomY);
        }
      }

      if (stopGame) {
       
        ball.body.setVelocity(0);
      }
    }

    
    return () => {
      if (game) game.destroy(true);
    };
  }, [startGame, stopGame]);

  return <div id="game-container"></div>;
};

export default GameCanvas;
