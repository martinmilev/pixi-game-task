import { Ticker } from "pixi.js";
import { GameStateManager } from "./GameStateManager";
import { Player } from "./entities";
import { Asteroids } from "./entities";
import { GameState } from "../ts";
import { Score } from "./Score";


export class Game {
  private stateManager: GameStateManager;
  private player: Player;
  private asteroids: Asteroids;
  private ticker: Ticker;
  private keys: { [key: string]: boolean } = {};
  private isPaused: boolean = false;

  constructor(gameStateManager: GameStateManager, score: Score) {
    this.stateManager = gameStateManager;
    this.player = new Player();
    this.asteroids = new Asteroids(() => score.add(1));
    this.ticker = Ticker.shared;
    this.stateManager.onStateChange(this.handleGameStateChange.bind(this));
    this.init();
  }

  private init() {
    this.player.setPosition(window.innerWidth / 2, window.innerHeight - 100);

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
    this.asteroids.update(this.player.getBullets());

    let dx = 0,
      dy = 0;
    if (this.keys["ArrowUp"]) dy -= 1;
    if (this.keys["ArrowDown"]) dy += 1;
    if (this.keys["ArrowLeft"]) dx -= 1;
    if (this.keys["ArrowRight"]) dx += 1;

    const newX = this.player.getX() + dx * this.player.speed;
    const newY = this.player.getY() + dy * this.player.speed;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (newX < 0) {
      this.player.setPosition(0, newY);
    } else if (newX > screenWidth - this.player.width) {
      this.player.setPosition(screenWidth - this.player.width, newY);
    } else {
      this.player.setPosition(newX, newY);
    }

    if (newY < 0) {
      this.player.setPosition(newX, 0);
    } else if (newY > screenHeight - this.player.height) {
      this.player.setPosition(newX, screenHeight - this.player.height);
    }

    for (const bullet of this.player.getBullets()) {
      bullet.move();
    }

    for (const asteroid of this.asteroids.getAsteroids()) {
      if (this.player.checkCollisionWithAsteroid(asteroid)) {
        this.handlePlayerDeath();
        break;
      }
    }
  }

  private handlePlayerDeath() {
    this.stateManager.setState(GameState.GAME_OVER);
  }

  public reset() {
    this.stopGameLoop();
    this.keys = {};
    this.player.reset();
    this.asteroids.clearAsteroids();
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

  public getAsteroids() {
    return this.asteroids;
  }
}
