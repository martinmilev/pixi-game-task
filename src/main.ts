import { Application } from "pixi.js";
import { initDevtools } from "@pixi/devtools";
import { switchScreen } from "./utils/navigation";
import { GameStateManager } from "./game/GameStateManager";
import {
  HomeScreen,
  GameScreen,
  HighScoresScreen,
  SettingsScreen,
} from "./screens";

const gameStateManager = new GameStateManager();

(async () => {
  const app = new Application();
  await app.init({ resizeTo: window, backgroundColor: "black" });
  app.canvas.style.position = "absolute";
  initDevtools({ app });
  document.body.appendChild(app.canvas);

  // Instantiate GameStateManager

  // Create screens
  const homeScreen = new HomeScreen(
    () => switchScreen(app, gameScreen),
    () => switchScreen(app, highScoresScreen),
    () => switchScreen(app, settingsScreen),
    gameStateManager
  );
  const gameScreen = new GameScreen(
    () => switchScreen(app, homeScreen),
    gameStateManager
  );
  const highScoresScreen = new HighScoresScreen(() =>
    switchScreen(app, homeScreen)
  );
  const settingsScreen = new SettingsScreen(() =>
    switchScreen(app, homeScreen)
  );

  // Start with the HomeScreen
  switchScreen(app, homeScreen);
})();
