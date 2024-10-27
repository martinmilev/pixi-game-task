import { Text, Container } from "pixi.js";

export class HomeScreen extends Container {
  constructor(
    onNewGame: () => void,
    onHighScores: () => void,
    onSettings: () => void
  ) {
    super();

    const createMenuItem = (
      text: string,
      onClick: () => void,
      yOffset: number
    ) => {
      const menuItem = new Text({
        text,
        style: {
          fontSize: 32,
          fill: "white",
          fontWeight: "bold",
        },
      });

      menuItem.anchor.set(0.5);
      menuItem.position.set(
        window.innerWidth / 2,
        window.innerHeight / 2 + yOffset
      );
      menuItem.interactive = true;
      menuItem.cursor = "pointer";

      menuItem.on("pointerover", () => {
        menuItem.style.fill = "green";
      });
      menuItem.on("pointerout", () => {
        menuItem.style.fill = "white";
      });

      menuItem.on("pointerdown", () => {
        menuItem.style.fill = "white";
        onClick();
      });

      return menuItem;
    };

    const newGameText = createMenuItem("New Game", onNewGame, -80);
    const highScoresText = createMenuItem("High Scores", onHighScores, 0);
    const settingsText = createMenuItem("Settings", onSettings, 80);

    this.addChild(newGameText, highScoresText, settingsText);
  }
}
