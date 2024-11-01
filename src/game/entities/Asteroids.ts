import { Container, Sprite, Assets } from "pixi.js";
import { Enemy } from "./Enemy";
import { Bullet } from "./Bullet";

const asteroidTexture = await Assets.load("../../public/asteroid.png");
const explosionTexture = await Assets.load("../../public/explosion.png");

export class Asteroids extends Container {
  private asteroids: Enemy[] = [];
  private onAsteroidDestroyed: () => void;

  private readonly screenBounds = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  private spawnInterval: number = 3000;

  constructor(onAsteroidDestroyed: () => void) {
    super();
    this.onAsteroidDestroyed = onAsteroidDestroyed;
    this.startSpawning();
  }

  private spawnAsteroid() {
    const enemy = new Enemy(asteroidTexture);

    const size = Math.random() * (400 - 100) + 100;
    enemy.width = size;
    enemy.height = size;

    const x = Math.random() * this.screenBounds.width;
    const y = -enemy.height;

    enemy.setPosition(x, y);

    enemy.speed = 1 + Math.random() * 4;
    enemy.rotation = Math.random() * 2;

    this.asteroids.push(enemy);
    this.addChild(enemy);
  }

  private startSpawning() {
    const spawnLoop = () => {
      this.spawnAsteroid();
      window.setTimeout(spawnLoop, this.spawnInterval);
    };

    spawnLoop();
  }

  private isColliding(a: Enemy, b: Bullet): boolean {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < a.width / 2 + 6;
  }

  private createExplosion(asteroid: Enemy) {
    const explosion = new Sprite(explosionTexture);
    explosion.width = asteroid.width / 2;
    explosion.height = asteroid.height / 2;
    explosion.x = asteroid.x - explosion.width / 2;
    explosion.y = asteroid.y + asteroid.height / 2;

    this.addChild(explosion);

    setTimeout(() => {
      explosion.destroy();
    }, 1000);
  }

  private checkBulletCollisions(bullets: Bullet[]) {
    for (let i = this.asteroids.length - 1; i >= 0; i--) {
      const asteroid = this.asteroids[i];

      for (let j = bullets.length - 1; j >= 0; j--) {
        const bullet = bullets[j];

        if (this.isColliding(asteroid, bullet)) {
          this.createExplosion(asteroid);
          this.removeChild(asteroid);
          this.asteroids.splice(i, 1);
          bullets.splice(j, 1);
          bullet.parent.removeChild(bullet);
          this.onAsteroidDestroyed();
          break;
        }
      }
    }
  }

  public clearAsteroids() {
    this.asteroids.forEach((asteroid) => this.removeChild(asteroid));
    this.asteroids = [];
  }

  public reset() {
    this.clearAsteroids();
    this.startSpawning();
  }

  public update(bullets: Bullet[]) {
    for (let enemy of this.asteroids) {
      enemy.move();
    }

    this.checkBulletCollisions(bullets);
  }

  public getAsteroids(): Enemy[] {
    return this.asteroids;
  }
}
