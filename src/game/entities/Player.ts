import { Graphics, Container } from "pixi.js";
import { Entity } from "../../ts/Entity";

export class Player extends Container implements Entity {
  public speed: number = 5;
  constructor() {
    super();

    const graphics = new Graphics().rect(-15, -15, 30, 30).fill(0x00ff00);

    this.addChild(graphics);
  }

  move(dx: number, dy: number) {
    this.x += dx * this.speed;
    this.y += dy * this.speed;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
