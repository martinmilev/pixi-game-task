export interface Entity {
  x: number;
  y: number;
  speed: number;
  move(dx?: number, dy?: number): void;
  setPosition(x: number, y: number): void;
}
