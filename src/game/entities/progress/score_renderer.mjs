/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const render_score = (engine, game) => {
  const difficilty_string = game.progress.difficulty.toString();
  const chars = difficilty_string.split('');
  const chars_count = chars.length;

  const screen_center = engine.canvas.width / 2;

  const DIGIT_W = 64;
  const DIGIT_H = 64;
  const GAP = 8;

  const score_start_x = screen_center - (GAP / 2 + DIGIT_W / 2) * chars_count;

  engine.ctx.filter = 'drop-shadow(5px 5px 2px #3d80cd)';
  for (let i = 0; i < chars_count; i++) {
    const digit_sprite_info = engine.resources.map.font[chars[i]];

    engine.ctx.drawImage(
      engine.resources.font,
      digit_sprite_info.x,
      digit_sprite_info.y,
      digit_sprite_info.size,
      digit_sprite_info.size,
      score_start_x + i * DIGIT_W + GAP * i,
      16,
      DIGIT_W,
      DIGIT_H
    );
  }

  engine.ctx.filter = 'none';
};
