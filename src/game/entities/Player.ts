import { Graphics, Container } from "pixi.js";
import { Entity } from "../../ts/Entity";
import { Bullet } from "./Bullet";

export class Player extends Container implements Entity {
  public speed: number = 5;
  private bullets: Bullet[] = [];

  constructor() {
    super();

    const graphics = new Graphics()
      .moveTo(-25, 25)
      .lineTo(25, 25)
      .lineTo(0, -25)
      .closePath()
      .fill(0x00ff00);

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

  public shoot() {
    const bullet = new Bullet(this.x, this.y - 20);
    this.bullets.push(bullet);
    this.parent.addChild(bullet);
  }

  public updateBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.move()
      if (bullet.y < -10) {
        this.bullets.splice(i, 1);
        bullet.destroy();
      }
    }
  }

  public getBullets() {
    return this.bullets;
  }
}
