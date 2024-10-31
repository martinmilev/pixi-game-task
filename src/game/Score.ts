export class Score {
  private score: number = 0;
  private listeners: Array<(newScore: number) => void> = [];

  private notifyListeners(newScore: number) {

    for (const listener of this.listeners) {
      listener(newScore);
    }
  }

  public add(amount: number) {
    this.notifyListeners(this.score += amount);
  }

  public get(): number {
    return this.score;
  }

  public reset() {
    this.score = 0;
    this.notifyListeners(this.score);
  }

  public onChange(listener: (newScore: number) => void) {
    this.listeners.push(listener);

  }
}
