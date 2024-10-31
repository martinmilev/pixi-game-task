import { Container, Sprite, Assets } from "pixi.js";
import { Entity } from "../../ts";
import { Bullet } from "./Bullet";
import { Enemy } from "./Enemy";

const ship = await Assets.load("../../public/ship.png");

export class Player extends Container implements Entity {
  public speed: number = 4;
  private bullets: Bullet[] = [];
  private playerSprite: Sprite;

  constructor() {
    super();
    this.playerSprite = new Sprite(ship);

    this.playerSprite.width = 100;
    this.playerSprite.height = 100;

    this.addChild(this.playerSprite);
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
    const bullet = new Bullet(
      this.x + this.playerSprite.width / 2,
      this.y - 20
    );
    this.bullets.push(bullet);
    this.parent.addChild(bullet);
  }

  public updateBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.move();
      if (bullet.y < -10) {
        this.bullets.splice(i, 1);
        bullet.destroy();
      }
    }
  }

  public getBullets() {
    return this.bullets;
  }

  public reset() {
    for (const bullet of this.bullets) {
      bullet.destroy();
    }
    this.bullets = [];

    this.setPosition(window.innerWidth / 2, window.innerHeight - 100);
  }

  public checkCollisionWithAsteroid(asteroid: Enemy): boolean {
    const dx = this.x - asteroid.x;
    const dy = this.y - asteroid.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < this.playerSprite.width / 2 + asteroid.width / 2;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }
}
