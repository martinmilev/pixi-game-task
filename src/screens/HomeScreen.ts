import { Container } from "pixi.js";
import { GameStateManager } from "../game/GameStateManager";
import { MenuItem } from "../components/MenuItem";
import { GameState } from "../ts";

export class HomeScreen extends Container {
  private stateManager: GameStateManager;
  private menuItems: MenuItem[];
  private selectedIndex: number;

  constructor(
    onNewGame: () => void,
    onHighScores: () => void,
    onSettings: () => void,
    gameStateManager: GameStateManager
  ) {
    super();

    this.stateManager = gameStateManager;
    this.stateManager.setState(GameState.START);

    const newGameText = new MenuItem("New Game", () => {
      this.stateManager.setState(GameState.PLAYING);
      onNewGame();
    });
    const highScoresText = new MenuItem("High Scores", onHighScores);
    const settingsText = new MenuItem("Settings", onSettings);

    newGameText.setPosition(window.innerWidth / 2, window.innerHeight / 2 - 80);
    highScoresText.setPosition(window.innerWidth / 2, window.innerHeight / 2);
    settingsText.setPosition(
      window.innerWidth / 2,
      window.innerHeight / 2 + 80
    );

    this.menuItems = [newGameText, highScoresText, settingsText];
    this.selectedIndex = 0;
    this.updateSelection();

    this.menuItems.forEach((item) => this.addChild(item.textObject));

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.stateManager.getState() !== GameState.START) return;

    if (event.key === "Enter") {
      this.menuItems[this.selectedIndex].onClick();
      return;
    }
    if (event.key === "ArrowDown") {
      this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
      this.updateSelection();
      return;
    }
    if (event.key === "ArrowUp") {
      this.selectedIndex =
        (this.selectedIndex - 1 + this.menuItems.length) %
        this.menuItems.length;
      this.updateSelection();
      return;
    }
  }

  private updateSelection() {
    this.clearSelection();
    this.menuItems[this.selectedIndex].textObject.style.fill = "green";
  }

  private clearSelection() {
    this.menuItems.forEach((item) => {
      item.textObject.style.fill = "white";
    });
  }
}
