import { Assets, Container, Text, Ticker, TilingSprite } from "pixi.js";
import { Game } from "../game/Game";
import { Popup } from "./Popup";
import { GameStateManager } from "../game/GameStateManager";
import { GameOverPopup } from "./GameOverPopup";
import { GameState } from "../ts";

const texture = await Assets.load("../../public/bg.png");

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
    
    this.menuPopup = new Popup(
      () => this.resumeGame(),
      () => this.resetGame(),
      () => this.leaveGame()
    );
    this.addChild(this.menuPopup);

    this.gameOverPopup = new GameOverPopup(
      () => this.leaveGame(),
      () => this.resetGame()
    );
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
