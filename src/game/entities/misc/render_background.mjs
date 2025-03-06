/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const render_background = (engine, game) => {
  const imgAspectRatio = engine.resources.background.width / engine.resources.background.height;
  const canvasAspectRatio = engine.canvas.width / engine.canvas.height;

  let drawWidth, drawHeight, offsetX, offsetY;

  if (imgAspectRatio > canvasAspectRatio) {
    drawHeight = engine.canvas.height;
    drawWidth = engine.resources.background.width * (engine.canvas.height / engine.resources.background.height);
    offsetX = (engine.canvas.width - drawWidth) / 2;
    offsetY = 0;
  } else {
    drawWidth = engine.canvas.width;
    drawHeight = engine.resources.background.height * (engine.canvas.width / engine.resources.background.width);
    offsetX = 0;
    offsetY = (engine.canvas.height - drawHeight) / 2;
  }

  const image_breakpoint = offsetY + game.camera.y - game.camera.offset;

  const gradient = engine.ctx.createLinearGradient(
    0,
    0 + image_breakpoint,
    0,
    -engine.canvas.height * 100 + image_breakpoint
  );

  var d = 1 / 8;
  var i = 0;
  gradient.addColorStop(0, '#cfeffc');
  gradient.addColorStop((i++, d * i), '#3d80cd');
  gradient.addColorStop((i++, d * i), '#3672b6');
  gradient.addColorStop((i++, d * i), '#3063a0');
  gradient.addColorStop((i++, d * i), '#295589');
  gradient.addColorStop((i++, d * i), '#224772');
  gradient.addColorStop((i++, d * i), '#1b395b');
  gradient.addColorStop((i++, d * i), '#142b44');
  gradient.addColorStop((i++, d * i), '#0e1c2e');

  engine.ctx.fillStyle = gradient;
  engine.ctx.fillRect(0, 0, engine.canvas.width, engine.canvas.height);

  // engine.ctx.imageSmoothingEnabled = true;
  engine.ctx.drawImage(engine.resources.background, offsetX, image_breakpoint, drawWidth, drawHeight);
};
