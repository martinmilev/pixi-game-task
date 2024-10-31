import { Text } from "pixi.js";

export class MenuItem {
  public textObject: Text;
  public onClick: () => void;

  constructor(text: string, onClick: () => void) {
    this.onClick = onClick;

    this.textObject = new Text({
      text,
      style: {
        fontSize: 32,
        fill: "white",
        fontWeight: "bold",
      },
    });

    this.textObject.anchor.set(0.5);
    this.textObject.interactive = true;
    this.textObject.cursor = "pointer";

    this.textObject.on("pointerover", () => {
      this.textObject.style.fill = "green";
    });

    this.textObject.on("pointerout", () => {
      this.textObject.style.fill = "white";
    });

    this.textObject.on("pointerdown", onClick);
  }

  public setPosition(x: number, y: number) {
    this.textObject.position.set(x, y);
  }
}
