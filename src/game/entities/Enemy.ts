import { Graphics, Container } from "pixi.js";
import { Entity } from "../../ts/Entity";

export class Enemy extends Container implements Entity {
  public speed: number = 2;
  private direction: number;

  constructor() {
    super();
    this.direction = Math.random() * 2 * Math.PI;

    const graphics = new Graphics().rect(-15, -15, 30, 30).fill("red");

    this.addChild(graphics);
  }

  move() {
    this.x += Math.cos(this.direction) * this.speed;
    this.y += Math.sin(this.direction) * this.speed;

    if (this.x < 0 || this.x > window.innerWidth) {
      this.direction = Math.PI - this.direction;
    }
    if (this.y < 0 || this.y > window.innerHeight) {
      this.direction = -this.direction;
    }
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
