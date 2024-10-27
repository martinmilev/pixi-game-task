import { Graphics, Container } from "pixi.js";
import { Entity } from "../../ts/Entity";

export class Enemy extends Container implements Entity {
  public speed: number = 2;
  private direction: number;

  constructor() {
    super();
    this.direction = Math.random() * 2 * Math.PI;

    const graphics = new Graphics().circle(0, 0, 20).fill("red");

    this.addChild(graphics);
  }

  move() {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    // Handle boundary bouncing
    if (this.x < 0 || this.x > window.innerWidth) {
      this.direction = Math.PI - this.direction;
      this.x = Math.max(0, Math.min(this.x, window.innerWidth)); // Keep within bounds
    }
    if (this.y < 0 || this.y > window.innerHeight) {
      this.direction = -this.direction;
      this.y = Math.max(0, Math.min(this.y, window.innerHeight)); // Keep within bounds
    }
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isAlive(): boolean {
    // Check if the enemy is within the visible area of the game
    return this.y <= window.innerHeight; // Modify this logic if needed
  }
}
