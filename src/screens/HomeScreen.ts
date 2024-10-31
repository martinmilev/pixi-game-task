import { Text } from "pixi.js";
import { Container } from "pixi.js";
import { GameStateManager } from "../game/GameStateManager";
import { MenuItem, GameState } from "../ts";

export class HomeScreen extends Container {
  private menuItems: MenuItem[];
  private selectedIndex: number;

  constructor(
    onNewGame: () => void,
    onHighScores: () => void,
    onSettings: () => void,
    gameStateManager: GameStateManager
  ) {
    super();

    gameStateManager.setState(GameState.START);

    const newGameText = this.createMenuItem(
      "New Game",
      () => {
        gameStateManager.setState(GameState.PLAYING);
        onNewGame();
      },
      -80
    );
    const highScoresText = this.createMenuItem("High Scores", onHighScores, 0);
    const settingsText = this.createMenuItem("Settings", onSettings, 80);

    this.menuItems = [newGameText, highScoresText, settingsText];
    this.selectedIndex = 0;
    this.updateSelection();

    this.menuItems.forEach((item) => this.addChild(item.text));

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  private createMenuItem(
    text: string,
    onClick: () => void,
    yOffset: number
  ): MenuItem {
    const menuItemText = new Text(text, {
      fontSize: 32,
      fill: "white",
      fontWeight: "bold",
    });

    menuItemText.anchor.set(0.5);
    menuItemText.position.set(
      window.innerWidth / 2,
      window.innerHeight / 2 + yOffset
    );
    menuItemText.interactive = true;
    menuItemText.cursor = "pointer";

    menuItemText.on("pointerover", () => {
      this.clearSelection();
      menuItemText.style.fill = "green";
    });
    menuItemText.on("pointerout", () => {
      menuItemText.style.fill = "white";
      this.updateSelection();
    });

    menuItemText.on("pointerdown", onClick);

    return { text: menuItemText, onClick };
  }

  private handleKeyDown(event: KeyboardEvent) {
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
    this.menuItems[this.selectedIndex].text.style.fill = "green";
  }

  private clearSelection() {
    this.menuItems.forEach((item) => {
      item.text.style.fill = "white";
    });
  }
}
