import { Ticker } from "pixi.js";
import { Enemy, Player } from "./entities";
import { GameStateManager } from "./GameStateManager";
import { GameState } from "../ts/GameState";

export class Game {
  private stateManager: GameStateManager;
  private player: Player;
  private asteroid: Enemy;
  private keys: { [key: string]: boolean } = {};
  private ticker: Ticker;
  private isPaused: boolean = false;

  constructor(gameStateManager: GameStateManager) {
    this.stateManager = gameStateManager;
    this.player = new Player();
    this.asteroid = new Enemy();
    this.ticker = Ticker.shared;
    this.stateManager.onStateChange(this.handleGameStateChange.bind(this));
    this.init();
  }

  private init() {
    this.player.setPosition(window.innerWidth / 2, window.innerHeight - 100);

    this.asteroid.setPosition(
      window.innerWidth - 500,
      500 - window.innerHeight
    );

    this.ticker.add(this.update, this);
  }

  private handleGameStateChange() {
    const currentState = this.stateManager.getState();

    if (currentState === GameState.GAME_OVER) {
      this.destroy();
      return;
    }

    if (currentState === GameState.PLAYING) {
      this.startGameLoop();
    } else {
      this.stopGameLoop();
    }
  }

  private startGameLoop() {
    if (!this.ticker.started) {
      this.ticker.start();
    }
  }

  private stopGameLoop() {
    if (this.ticker.started) {
      this.ticker.stop();
    }
  }

  public addKeyListener() {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  public removeKeyListener() {
    window.removeEventListener("keydown", this.onKeyDown.bind(this));
    window.removeEventListener("keyup", this.onKeyUp.bind(this));
  }

  private onKeyDown(event: KeyboardEvent) {
    const currentState = this.stateManager.getState();

    if (currentState !== GameState.PLAYING) return;

    if (event.key === " ") {
      this.player.shoot();
    }

    if (event.key === "Escape") {
      this.stateManager.setState(GameState.PAUSED);
      return;
    }

    this.keys[event.key] = true;
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

  private update() {
    this.asteroid.move();

    let dx = 0,
      dy = 0;

    if (this.keys["ArrowUp"]) dy -= 1;
    if (this.keys["ArrowDown"]) dy += 1;
    if (this.keys["ArrowLeft"]) dx -= 1;
    if (this.keys["ArrowRight"]) dx += 1;

    if (dx !== 0 || dy !== 0) {
      this.player.move(dx, dy);
    }

    for (const bullet of this.player.getBullets()) {
      bullet.move();
    }
  }

  public reset() {
    this.stopGameLoop();
    this.keys = {};
    this.player.reset();
    this.asteroid.reset();
    this.init();
    this.stateManager.setState(GameState.START);
  }

  public isGamePaused(): boolean {
    return this.isPaused;
  }

  public destroy() {
    this.ticker.remove(this.update, this);
  }

  public getPlayer() {
    return this.player;
  }

  public getAsteroid() {
    return this.asteroid;
  }
}
