import { Assets, Container, TilingSprite, Ticker, Text } from "pixi.js";
import { Game } from "../game/Game";
import { Popup } from "../components/Popup";
import { GameStateManager } from "../game/GameStateManager";
import { GameState } from "../ts";
import { MenuItem } from "../components/MenuItem";
import { Score } from "../game/Score";

const texture = await Assets.load("../../public/bg.png");

export class GameScreen extends Container {
  private game: Game;
  private stateManager: GameStateManager;
  private gameOverPopup: Popup;
  private menuPopup: Popup;
  private onBack: () => void;
  private score: Score;
  private scoreText: Text;

  constructor(onBack: () => void, gameStateManager: GameStateManager) {
    super();

    this.stateManager = gameStateManager;
    this.onBack = onBack;

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
    this.score = new Score();

    this.game = new Game(this.stateManager, this.score);
    this.game.addKeyListener();

    this.addChild(this.game.getPlayer());
    this.addChild(this.game.getAsteroids());

    this.scoreText = new Text({
      text: `Score: ${this.score.get()}`,
      style: {
        fontSize: 48,
        fill: "white",
        fontWeight: "bold",
      },
    });
    this.scoreText.position.set(10, 10);
    this.addChild(this.scoreText);

    this.menuPopup = new Popup();
    this.menuPopup.setContent(this.createMenuContent());
    this.addChild(this.menuPopup);

    this.gameOverPopup = new Popup();
    this.gameOverPopup.setContent(this.createGameOverContent());
    this.addChild(this.gameOverPopup);

    this.stateManager.onStateChange(this.handleGameStateChange.bind(this));

    this.score.onChange(this.updateScoreDisplay.bind(this));
  }

  private handleGameStateChange() {
    const currentState = this.stateManager.getState();
    this.menuPopup.visible = currentState === GameState.PAUSED;
    this.gameOverPopup.visible = currentState === GameState.GAME_OVER;
  }

  private createMenuContent(): Container {
    const content = new Container();

    const message = new Text({
      text: "Pause!",
      style: {
        fontSize: 40,
        fill: "red",
        fontWeight: "bold",
      },
    });
    message.position.set(-60, -160);
    content.addChild(message);

    const resumeButton = new MenuItem(
      "Resume",
      this.resumeGame.bind(this),
      "black"
    );
    resumeButton.setPosition(0, -30);
    content.addChild(resumeButton.textObject);

    const resetButton = new MenuItem(
      "Reset",
      this.resetGame.bind(this),
      "black"
    );
    resetButton.setPosition(0, 50);
    content.addChild(resetButton.textObject);

    const leaveButton = new MenuItem(
      "Leave",
      this.leaveGame.bind(this),
      "black"
    );
    leaveButton.setPosition(0, 130);
    content.addChild(leaveButton.textObject);

    return content;
  }

  private createGameOverContent(): Container {
    const content = new Container();

    const message = new Text({
      text: "Game Over!",
      style: {
        fontSize: 40,
        fill: "red",
        fontWeight: "bold",
      },
    });
    message.position.set(-60, -160);
    content.addChild(message);

    const resetButton = new MenuItem(
      "Reset",
      this.resetGame.bind(this),
      "black"
    );
    resetButton.setPosition(0, 0);
    content.addChild(resetButton.textObject);

    const leaveButton = new MenuItem(
      "Leave",
      this.leaveGame.bind(this),
      "black"
    );
    leaveButton.setPosition(0, 50);
    content.addChild(leaveButton.textObject);

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

  private updateScoreDisplay(newScore: number) {
    this.scoreText.text = `Score: ${newScore}`;
  }
}
