/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const render_player = (engine, game) => {
  engine.ctx.imageSmoothingEnabled = false;

  const is_falling = game.player.y_velocity < 0;
  const is_right = game.player.x_velocity > 0;
  const is_left = game.player.x_velocity < 0;

  const SPRITE_X = is_falling ? 85 : is_right || is_left ? 68 : 0;
  const SPRITE_Y = is_falling ? 204 : 204;
  const SPRITE_WIDTH = 16;
  const SPRITE_HEIGHT = 16;

  const render_x = game.player.x;
  const render_y = engine.canvas.height - game.player.y - game.player.height + game.camera.y - game.camera.offset;

  if (is_left) {
    engine.ctx.save();
    engine.ctx.scale(-1, 1);
  }

  engine.ctx.drawImage(
    engine.resources.sprites3,
    SPRITE_X,
    SPRITE_Y,
    SPRITE_WIDTH,
    SPRITE_HEIGHT,
    is_left ? -render_x - game.player.width : render_x,
    render_y,
    game.player.width,
    game.player.height
  );

  if (is_left) {
    engine.ctx.restore();
  }

  if (game.debug.enabled === 1) {
    engine.ctx.fillStyle = 'transparent';
    engine.ctx.strokeStyle = 'green';
    engine.ctx.lineWidth = 2;

    engine.ctx.strokeRect(render_x, render_y, game.player.width, game.player.height);
  }
};
