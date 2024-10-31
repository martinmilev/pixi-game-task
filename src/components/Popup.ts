import { Container, Graphics } from "pixi.js";

export class Popup extends Container {
  constructor(width = 400, height = 400) {
    super();

    this.createBackground(width, height);
    this.visible = false;
  }

  private createBackground(width = 400, height = 400): void {
    const background = new Graphics()
      .roundRect(
        window.innerWidth / 2 - width / 2,
        window.innerHeight / 2 - height / 2,
        width,
        height,
        20
      )
      .fill("white", 0.5);

    this.addChild(background);
  }

  public setContent(content: Container): void {
    content.position.set(
        window.innerWidth / 2,
        window.innerHeight / 2,
    );
    this.addChild(content);
  }

  public show(): void {
    this.visible = true;
  }

  public hide(): void {
    this.visible = false;
  }
}
