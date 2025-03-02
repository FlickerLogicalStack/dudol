/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 * @param {DUDOL.Entities.Platform} platform
 */
export const render_platform = (engine, game, platform) => {
  const local_y = engine.canvas.height - platform.y - platform.height + (game.camera.y - game.camera.offset);

  engine.ctx.imageSmoothingEnabled = false;

  const sprites_map = engine.resources.map.platforms[platform.id % 3];

  const left = sprites_map[0];
  const center = sprites_map[1];
  const right = sprites_map[2];

  engine.ctx.drawImage(
    engine.resources.sprites3,
    left.x,
    left.y,
    left.size,
    left.size,
    platform.x,
    local_y,
    platform.height,
    platform.height
  );

  for (var i = 1; i < platform.width / 32 - 1; i++) {
    engine.ctx.drawImage(
      engine.resources.sprites3,
      center.x,
      center.y,
      center.size,
      center.size,
      platform.x + 32 * i - 1,
      local_y,
      platform.height + 1,
      platform.height
    );
  }

  engine.ctx.drawImage(
    engine.resources.sprites3,
    right.x,
    right.y,
    right.size,
    right.size,
    platform.x + platform.width - platform.height,
    local_y,
    platform.height,
    platform.height
  );

  if (game.debug.enabled === 1) {
    engine.ctx.fillStyle = 'transparent';
    engine.ctx.strokeStyle = 'green';
    engine.ctx.lineWidth = 2;

    engine.ctx.strokeRect(platform.x, local_y, platform.width, platform.height);

    game.debug.platforms_renders++;

    engine.ctx.font = 'bold 32px monospace';
    engine.ctx.fillStyle = platform.is_in_x_borders ? 'red' : 'blue';
    engine.ctx.textAlign = 'center';
    engine.ctx.fillText(platform.id.toString(), platform.x + platform.width / 2, local_y - 16);
    engine.ctx.textAlign = 'start';
  }
};
