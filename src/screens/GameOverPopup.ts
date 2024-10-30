import { Container, Text, Graphics } from "pixi.js";

export class GameOverPopup extends Container {
  private leaveButton: Text;
  private resetButton: Text;
  private message: Text;

  constructor(onLeave: () => void, onReset: () => void) {
    super();

    const size = 500;
    const background = new Graphics()
      .rect(
        window.innerWidth / 2 - size / 2,
        window.innerHeight / 2 - size / 2,
        500,
        500
      )
      .fill("white");
    this.addChild(background);

    this.message = new Text({
      text: "Game Over!",
      style: {
        fontSize: 52,
        fill: "red",
        fontWeight: "bold",
      },
    });
    this.message.anchor.set(0.5);
    this.message.position.set(
      window.innerWidth / 2,
      window.innerHeight / 2 - 200
    );
    this.message.interactive = true;

    this.addChild(this.message);

    this.resetButton = new Text({
      text: "Reset",
      style: {
        fontSize: 32,
        fill: "black",
        fontWeight: "bold",
      },
    });
    this.resetButton.anchor.set(0.5);
    this.resetButton.position.set(
      window.innerWidth / 2,
      window.innerHeight / 2 + 75
    );
    this.resetButton.interactive = true;
    this.resetButton.cursor = "pointer";
    this.resetButton.on("pointerdown", () => {
      this.resetButton.style.fill = "black";
      onReset();
    });

    this.resetButton.on("pointerover", () => {
      this.resetButton.style.fill = "green";
    });
    this.resetButton.on("pointerout", () => {
      this.resetButton.style.fill = "black";
    });

    this.addChild(this.resetButton);

    this.leaveButton = new Text({
      text: "Leave",
      style: {
        fontSize: 32,
        fill: "black",
        fontWeight: "bold",
      },
    });
    this.leaveButton.anchor.set(0.5);
    this.leaveButton.position.set(
      window.innerWidth / 2,
      window.innerHeight / 2 + 150
    );
    this.leaveButton.interactive = true;
    this.leaveButton.cursor = "pointer";
    this.leaveButton.on("pointerdown", () => {
      onLeave();
    });

    this.leaveButton.on("pointerover", () => {
      this.leaveButton.style.fill = "red";
    });
    this.leaveButton.on("pointerout", () => {
      this.leaveButton.style.fill = "black";
    });

    this.addChild(this.leaveButton);

    this.visible = false;
  }
}
