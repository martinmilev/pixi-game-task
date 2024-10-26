import { Application } from "pixi.js";
import { initDevtools } from "@pixi/devtools";

(async () => {
  const app = new Application();

  await app.init({
    resizeTo: window,
  });

  app.canvas.style.position = "absolute";

  initDevtools({ app });

  document.body.appendChild(app.canvas);
})();
