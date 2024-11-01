import { Container, Text } from "pixi.js";
import { MenuItem } from "../components/MenuItem";
import { getItem } from "../utils/localStorage";

export class HighScoresScreen extends Container {
  private onBack: () => void;

  constructor(onBack: () => void) {
    super();
    this.onBack = onBack;
    this.displayHighScores();
    this.createBackButton();
  }

  private displayHighScores() {
    const highScores = getItem("highScores") || [];
    const titleText = new Text({
      text: "High Scores",
      style: {
        fontSize: 42,
        fill: "white",
        fontWeight: "bold",
      },
    });
    titleText.position.set(window.innerWidth / 2 - titleText.width / 2, 50);
    this.addChild(titleText);

    let yPosition = 150;

    highScores.sort((a: number, b: number) => b - a);
    highScores.forEach((score: number, index: number) => {
      const scoreText = new Text({
        text: `#${index + 1}: ${score}`,
        style: {
          fontSize: 32,
          fill: "white",
          fontWeight: "bold",
        },
      });
      scoreText.position.set(
        window.innerWidth / 2 - scoreText.width / 2,
        yPosition
      );
      this.addChild(scoreText);
      yPosition += 50;
    });

    if (highScores.length === 0) {
      const noScoresText = new Text({
        text: "No high scores yet!",
        style: {
          fontSize: 32,
          fill: "yellow",
          fontWeight: "bold",
        },
      });
      noScoresText.position.set(
        window.innerWidth / 2 - noScoresText.width / 2,
        yPosition
      );
      this.addChild(noScoresText);
    }
  }

  private createBackButton() {
    const backButton = new MenuItem("Back", this.onBack, "white");
    backButton.setPosition(
      window.innerWidth / 2,
      window.innerHeight - 100
    );
    this.addChild(backButton.textObject);
  }
}
