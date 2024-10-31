import { Assets, Container, Text, Ticker, TilingSprite } from "pixi.js";
import { Game } from "../game/Game";
import { Popup } from "../components/Popup";
import { GameStateManager } from "../game/GameStateManager";
import { GameState, PopupType } from "../ts";

const texture = await Assets.load("../../public/bg.png");

export class GameScreen extends Container {
  private game: Game;
  private stateManager: GameStateManager;
  private gameOverPopup: Popup;
  private menuPopup: Popup;
  private onBack: () => void;

  constructor(onBack: () => void, gameStateManager: GameStateManager) {
    super();

    this.stateManager = gameStateManager;
    this.onBack = onBack;
    this.setupUI();

    const tilingSprite = new TilingSprite({
      texture,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.addChild(tilingSprite);

    const ticker = Ticker.shared;
    let count = 0;

    ticker.add(() => {
      count += 0.005;
      tilingSprite.tilePosition.y += 2;
    });

    this.game = new Game(this.stateManager);
    this.game.addKeyListener();

    this.addChild(this.game.getPlayer());
    this.addChild(this.game.getAsteroids());

    this.menuPopup = new Popup();
    this.menuPopup.setContent(this.createMenuContent());
    this.addChild(this.menuPopup);

    this.gameOverPopup = new Popup();
    this.gameOverPopup.setContent(this.createGameOverContent());
    this.addChild(this.gameOverPopup);

    this.stateManager.onStateChange(this.handleGameStateChange.bind(this));
  }

  private handleGameStateChange() {
    const currentState = this.stateManager.getState();
    this.menuPopup.visible = currentState === GameState.PAUSED;
    this.gameOverPopup.visible = currentState === GameState.GAME_OVER;
  }

  private setupUI() {
    const gameText = new Text({
      text: "\nPress Escape for pause.",
      style: {
        fontSize: 24,
        fill: "#ffffff",
      },
    });
    gameText.anchor.set(0.5);
    gameText.position.set(200, 50);
    this.addChild(gameText);
  }

  private createMenuContent(): Container {
    const content = new Container();

    const message = new Text({
      text: "Pause!",
      style: {
        fontSize: 52,
        fill: "red",
        fontWeight: "bold",
      },
    });
    message.anchor.set(0.5);
    message.position.set(0, -120);

    const resumeButton = new Text({
      text: "Resume",
      style: {
        fontSize: 32,
        fill: "black",
        fontWeight: "bold",
      },
    });
    resumeButton.anchor.set(0.5);
    resumeButton.position.set(0, -30);
    resumeButton.interactive = true;
    resumeButton.cursor = "pointer";
    resumeButton.on("pointerdown", this.resumeGame.bind(this));

    const resetButton = new Text({
      text: "Reset",
      style: {
        fontSize: 32,
        fill: "black",
        fontWeight: "bold",
      },
    });
    resetButton.anchor.set(0.5);
    resetButton.position.set(0, 50);
    resetButton.interactive = true;
    resetButton.cursor = "pointer";
    resetButton.on("pointerdown", this.resetGame.bind(this));

    const leaveButton = new Text({
      text: "Leave",
      style: {
        fontSize: 32,
        fill: "black",
        fontWeight: "bold",
      },
    });
    leaveButton.anchor.set(0.5);
    leaveButton.position.set(0, 130);
    leaveButton.interactive = true;
    leaveButton.cursor = "pointer";
    leaveButton.on("pointerdown", this.leaveGame.bind(this));

    content.addChild(message, resumeButton, resetButton, leaveButton);
    return content;
  }

  private createGameOverContent(): Container {
    const content = new Container();

    const message = new Text({
      text: "Game Over!",
      style: {
        fontSize: 52,
        fill: "red",
        fontWeight: "bold",
      },
    });
    message.anchor.set(0.5);
    message.position.set(0, -100);

    const resetButton = new Text({
      text: "Reset",
      style: {
        fontSize: 32,
        fill: "black",
        fontWeight: "bold",
      },
    });
    resetButton.anchor.set(0.5);
    resetButton.position.set(0, 0);
    resetButton.interactive = true;
    resetButton.cursor = "pointer";
    resetButton.on("pointerdown", this.resetGame.bind(this));

    const leaveButton = new Text({
      text: "Leave",
      style: {
        fontSize: 32,
        fill: "black",
        fontWeight: "bold",
      },
    });
    leaveButton.anchor.set(0.5);
    leaveButton.position.set(0, 50);
    leaveButton.interactive = true;
    leaveButton.cursor = "pointer";
    leaveButton.on("pointerdown", this.leaveGame.bind(this));

    content.addChild(message, resetButton, leaveButton);
    return content;
  }

  private resumeGame() {
    this.stateManager.setState(GameState.PLAYING);
  }

  private resetGame() {
    this.game.reset();
    this.stateManager.setState(GameState.PLAYING);
  }

  private leaveGame() {
    this.game.reset();
    this.stateManager.setState(GameState.START);
    this.onBack();
  }

  public destroy() {
    super.destroy();
    this.game.removeKeyListener();
    this.game.destroy();
  }
}
