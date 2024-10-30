import { Container, Sprite, Texture } from "pixi.js";
import { Entity } from "../../ts/Entity";

export class Enemy extends Container implements Entity {
  public speed: number = 2;

  constructor(texture: Texture) {
    super();

    const enemy = new Sprite(texture);

    enemy.width = 300;
    enemy.height = 300;

    this.addChild(enemy);
  }

  move() {
    this.x += 0.1;
    this.y += this.speed + 0.2;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public reset() {
    this.setPosition(window.innerWidth / 2, window.innerHeight / 2);
    this.speed = 2;
  }
}
