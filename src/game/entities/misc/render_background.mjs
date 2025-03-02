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

  const image_breakpoint = offsetY + game.camera.y / 200;

  // const gradient = engine.ctx.createLinearGradient(
  //   0,
  //   Math.min(-engine.canvas.height + image_breakpoint, 0) + 1,
  //   0,
  //   engine.canvas.height
  // );
  // gradient.addColorStop(0, 'black');
  // gradient.addColorStop(1, '#d6edf7');

  engine.ctx.fillStyle = '#d6edf7';
  // engine.ctx.fillStyle = gradient;
  engine.ctx.fillRect(0, 0, engine.canvas.width, engine.canvas.height);

  // console.log(image_breakpoint);

  engine.ctx.imageSmoothingEnabled = true;
  engine.ctx.drawImage(
    //
    engine.resources.background,
    offsetX,
    image_breakpoint,
    drawWidth,
    drawHeight
  );

  // engine.ctx.fillStyle = 'red';
  // engine.ctx.fillRect(0, image_breakpoint, engine.canvas.width, 1);
};
