import { Graphics, Container } from "pixi.js";

export class Bullet extends Container {
  public speed: number = 10;

  constructor(startX: number, startY: number) {
    super();

    const graphics = new Graphics().circle(0, 0, 5).fill(0xff0000);

    this.addChild(graphics);

    this.x = startX;
    this.y = startY;
  }

  public move() {
    this.y -= this.speed;
  }
}
