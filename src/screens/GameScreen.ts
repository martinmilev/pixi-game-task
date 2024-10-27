import { Container, Text } from "pixi.js";
import { Game } from "../game/Game";
import { MenuPopup } from "./MenuPopup";

export class GameScreen extends Container {
  private game: Game;
  private menuPopup: MenuPopup;

  constructor(onBack: () => void) {
    super();
    this.game = new Game();
    this.game.addKeyListener();

    this.addChild(this.game.getPlayer());
    this.addChild(this.game.getEnemy());

    this.setupUI();

    this.menuPopup = new MenuPopup(() => this.resumeGame(), onBack);
    this.addChild(this.menuPopup);

    window.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  private setupUI() {
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
  }

  private togglePause() {
    const isPaused = this.game.isGamePaused();

    this.menuPopup.visible = isPaused;
  }

  private resumeGame() {
    this.game.togglePaused();
    const isPaused = this.game.isGamePaused();

    this.menuPopup.visible = isPaused;
  }

  private onKeyPress(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.togglePause();
    }
  }

  public destroy() {
    super.destroy();
    window.removeEventListener("keydown", this.onKeyPress.bind(this));
    this.game.removeKeyListener();
    this.game.destroy();
  }
}
