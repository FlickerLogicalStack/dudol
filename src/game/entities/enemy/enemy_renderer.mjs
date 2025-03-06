import { render_debug_frame } from '../misc/render_debug_frame.mjs';

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const render_enemy = (engine, game) => {
  for (var enemy of game.enemies) {
    if (enemy.opacity === 0) {
      continue;
    }

    const sprite_info = engine.resources.map.enemies[enemy.sprite];

    const x = enemy.x - enemy.width / 2;
    const y = engine.canvas.height - enemy.y - enemy.height / 2 + (game.camera.y - game.camera.offset);

    if (enemy.opacity < 1) {
      engine.ctx.globalAlpha = enemy.opacity;
    }

    engine.ctx.imageSmoothingEnabled = false;
    engine.ctx.drawImage(
      engine.resources.sprites,
      sprite_info.x,
      sprite_info.y,
      sprite_info.size,
      sprite_info.size,
      x,
      y,
      enemy.width,
      enemy.height
    );

    engine.ctx.globalAlpha = 1;

    if (game.debug.enabled === 1) {
      render_debug_frame(engine.ctx, x, y, enemy.width, enemy.height);
    }
  }
};
