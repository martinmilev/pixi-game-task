import { Application, Container } from "pixi.js";

/**
 * Utility function.
 * Clears the stage and adds the new screen.
 *
 * @param app
 * @param screen
 */
export function switchScreen(app: Application, screen: Container) {
  app.stage.removeChildren();
  app.stage.addChild(screen);
}
