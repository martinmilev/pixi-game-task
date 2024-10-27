import { Ticker } from "pixi.js";
import { Enemy, Player } from "./entities";

export class Game {
  private player: Player;
  private enemy: Enemy;
  private keys: { [key: string]: boolean } = {};
  private ticker: Ticker;
  private isPaused: boolean = false;

  constructor() {
    this.player = new Player();
    this.player.setPosition(window.innerWidth / 2, window.innerHeight / 2)
    this.enemy = new Enemy();
    this.enemy.setPosition(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );

    this.ticker = Ticker.shared;
    this.ticker.add(this.update, this);
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
    if (event.key === "Escape") {
      this.isPaused = !this.isPaused;
      return;
    }
    this.keys[event.key] = true;
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keys[event.key] = false;
  }

  private update() {
    if (this.isPaused) return;

    let dx = 0,
      dy = 0;

    if (this.keys["ArrowUp"]) dy -= 1;
    if (this.keys["ArrowDown"]) dy += 1;
    if (this.keys["ArrowLeft"]) dx -= 1;
    if (this.keys["ArrowRight"]) dx += 1;

    if (dx !== 0 || dy !== 0) {
      this.player.move(dx, dy);
    }

    this.enemy.move();
  }

  public togglePaused(): void {
    this.isPaused = !this.isPaused;
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

  public getEnemy() {
    return this.enemy;
  }
}
