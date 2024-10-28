import { Container, Assets, Sprite } from "pixi.js";
import { Entity } from "../../ts/Entity";

const asteroid = await Assets.load('../../public/asteroid.png');

export class Enemy extends Container implements Entity {
  public speed: number = 2;

  constructor() {
    super();

    const enemy = new Sprite(asteroid)
    
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
}
