import { GameState } from "../ts";

export class GameStateManager {
  private state: GameState = GameState.START;
  private listeners: Array<(newState: GameState) => void> = [];

  public setState = (newState: GameState) => {
    if (this.state !== newState) {
      this.state = newState;
      this.notifyListeners(newState);
    }
  };

  public getState = (): GameState => {
    return this.state;
  };

  public onStateChange = (listener: (newState: GameState) => void) => {
    this.listeners.push(listener);
  };

  private notifyListeners(newState: GameState) {
    for (const listener of this.listeners) {
      listener(newState);
    }
  }
}
