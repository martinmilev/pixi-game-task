import { Container, Text, Graphics } from "pixi.js";

export class MenuPopup extends Container {
  private resumeButton: Text;
  private leaveButton: Text;
  private message: Text;

  constructor(onResume: () => void, onLeave: () => void) {
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
      text: "Paused",
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

    this.resumeButton = new Text({
      text: "Resume",
      style: {
        fontSize: 32,
        fill: "black",
        fontWeight: "bold",
      },
    });
    this.resumeButton.anchor.set(0.5);
    this.resumeButton.position.set(
      window.innerWidth / 2,
      window.innerHeight / 2 + 50
    );
    this.resumeButton.interactive = true;
    this.resumeButton.cursor = "pointer";
    this.resumeButton.on("pointerdown", () => {
      this.resumeButton.style.fill = "black";
      onResume();
    });
    this.addChild(this.resumeButton);

    this.resumeButton.on("pointerover", () => {
      this.resumeButton.style.fill = "green";
    });
    this.resumeButton.on("pointerout", () => {
      this.resumeButton.style.fill = "black";
    });

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
      this.resumeButton.style.fill = "black";
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
