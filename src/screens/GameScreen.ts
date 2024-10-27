import { Container, Text } from "pixi.js";
import { Game } from "../game/Game";
import { Popup } from "./Popup";
import { GameStateManager } from "../game/GameStateManager";
import { GameState } from "../ts/GameState";
import { GameOverPopup } from "./GameOverPopup";

export class GameScreen extends Container {
  private game: Game;
  private stateManager: GameStateManager;
  private menuPopup: Popup;
  private gameOverPopup: GameOverPopup;
  private onBack: () => void;

  constructor(onBack: () => void, gameStateManager: GameStateManager) {
    super();

    this.stateManager = gameStateManager;
    this.onBack = onBack;
    this.setupUI();

    this.game = new Game(this.stateManager);
    this.game.addKeyListener();
    this.addChild(this.game.getPlayer());
    this.menuPopup = new Popup(
      () => this.resumeGame(),
      () => this.leaveGame()
    );

    this.addChild(this.menuPopup);

    this.gameOverPopup = new GameOverPopup(() => this.leaveGame());

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

  private resumeGame() {
    this.stateManager.setState(GameState.PLAYING);
  }

  private leaveGame() {
    this.stateManager.setState(GameState.START);
    this.onBack();
  }

  public destroy() {
    super.destroy();
    this.game.removeKeyListener();
    this.game.destroy();
  }
}
