import { render_debug_frame } from '../misc/render_debug_frame.mjs';

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 * @param {DUDOL.Entities.Platform} platform
 */
export const render_platform = (engine, game, platform) => {
  const local_y = engine.canvas.height - platform.y - platform.height + (game.camera.y - game.camera.offset);

  if (platform.opacity !== 1) {
    engine.ctx.globalAlpha = platform.opacity;
  }

  engine.ctx.imageSmoothingEnabled = false;

  const sprites_map = engine.resources.map.platforms[platform.moving ? 1 : 0];

  const left = sprites_map[0];
  const center = sprites_map[1];
  const right = sprites_map[2];

  engine.ctx.drawImage(
    engine.resources.sprites,
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
      engine.resources.sprites,
      center.x,
      center.y,
      center.size,
      center.size,
      platform.x + 32 * i - 1 * platform.moving,
      local_y,
      platform.height + 1 * platform.moving,
      platform.height
    );
  }

  engine.ctx.drawImage(
    engine.resources.sprites,
    right.x,
    right.y,
    right.size,
    right.size,
    platform.x + platform.width - platform.height - 1 * platform.moving,
    local_y,
    platform.height + 1 * platform.moving,
    platform.height
  );

  engine.ctx.globalAlpha = 1;

  if (game.debug.enabled === 1) {
    render_debug_frame(engine.ctx, platform.x, local_y, platform.width, platform.height);

    game.debug.platforms_renders++;

    engine.ctx.font = 'bold 32px monospace';
    engine.ctx.fillStyle = platform.is_in_x_borders ? 'red' : 'blue';
    engine.ctx.textAlign = 'center';
    engine.ctx.fillText(platform.id.toString(), platform.x + platform.width / 2, local_y - 16);
    engine.ctx.textAlign = 'start';

    // engine.ctx.textAlign = 'center';
    // engine.ctx.font = 'bold 16px monospace';
    // engine.ctx.fillStyle = 'red';
    // engine.ctx.fillText(`Y(${platform.x},${platform.y + platform.height})`, platform.x, local_y - 16);
    // engine.ctx.fillText(`W(${platform.x + platform.width},${platform.y + platform.height})`, platform.x, local_y - 16);
    // engine.ctx.fillText(`Z(${platform.x},${platform.y})`, platform.x, local_y - 16);
    // engine.ctx.textAlign = 'start';
  }
};
