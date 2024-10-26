import { Container, Text } from "pixi.js";

export class GameScreen extends Container {
  private backText: Text;
  private resumeText: Text;
  private isPaused: boolean = false;

  constructor(onBack: () => void) {
    super();

    this.backText = new Text({
      text: "Press Escape to Resume",
      style: {
        fontSize: 32,
        fill: "#ffffff",
        fontWeight: "bold",
      },
    });
    this.backText.anchor.set(0.5);
    this.backText.position.set(window.innerWidth / 2, window.innerHeight / 2);
    this.backText.visible = false;
    this.addChild(this.backText);

    // Create the main game text
    const gameText = new Text({
      text: "Game Screen\nPress Escape",
      style: {
        fontSize: 24,
        fill: "#ffffff",
      },
    });
    gameText.anchor.set(0.5);
    gameText.position.set(window.innerWidth / 2, window.innerHeight / 2 - 80);
    this.addChild(gameText);

    window.addEventListener("keydown", this.onKeyDown.bind(this));

    const leaveButton = new Text({
      text: "Leave",
      style: {
        fontSize: 32,
        fill: "#ffffff",
        fontWeight: "bold",
      },
    });
    leaveButton.anchor.set(0.5);
    leaveButton.position.set(
      window.innerWidth / 2,
      window.innerHeight / 2 + 60
    );
    leaveButton.interactive = true;
    leaveButton.cursor = "pointer";
    leaveButton.on("pointerdown", () => {
      this.hidePauseMenu();
      onBack();
    });
    leaveButton.visible = false;
    this.addChild(leaveButton);

    this.backText = leaveButton;

    const resumeButton = new Text({
      text: "Resume",
      style: {
        fontSize: 32,
        fill: "#ffffff",
        fontWeight: "bold",
      },
    });

    resumeButton.anchor.set(0.5);
    resumeButton.position.set(window.innerWidth / 2, window.innerHeight / 2);
    resumeButton.interactive = true;
    resumeButton.cursor = "pointer";
    resumeButton.on("pointerdown", () => {
      this.hidePauseMenu();
    });
    resumeButton.visible = false;
    this.addChild(resumeButton);

    this.resumeText = resumeButton;
  }

  private onKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.togglePause();
    }
  }

  private togglePause() {
    this.isPaused = !this.isPaused;

    this.backText.visible = this.isPaused;
    this.resumeText.visible = this.isPaused;
  }

  private hidePauseMenu() {
    this.isPaused = false;
    this.backText.visible = false;
    this.resumeText.visible = false;
  }

  public destroy() {
    super.destroy();
    window.removeEventListener("keydown", this.onKeyDown.bind(this));
  }
}
