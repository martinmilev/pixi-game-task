import { Container, Text } from "pixi.js";

export class HighScoresScreen extends Container {
  constructor(onBack: () => void) {
    super();
    const text = new Text({
      text: "High Scores Screen\nClick to Go Back",
      style: { fontSize: 24, fill: "#ffffff" },
    });
    text.anchor.set(0.5);
    text.position.set(window.innerWidth / 2, window.innerHeight / 2);
    text.interactive = true;
    text.cursor = "pointer";
    text.on("pointerdown", onBack);
    this.addChild(text);
  }
}
