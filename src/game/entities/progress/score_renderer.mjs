/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const render_score = (engine, game) => {
  const difficilty_string = game.progress.difficulty.toString();
  const chars = difficilty_string.split('');
  const chars_count = chars.length;

  const screen_center = engine.canvas.width / 2;

  const DIGIT_SIZE = 64;

  const score_start_x = screen_center - (DIGIT_SIZE / 2) * chars_count;

  for (let i = 0; i < chars_count; i++) {
    const digit_sprite_info = engine.resources.map.digits[+chars[i]];

    engine.ctx.drawImage(
      engine.resources.sprites2,
      digit_sprite_info.x,
      digit_sprite_info.y,
      digit_sprite_info.size,
      digit_sprite_info.size,
      score_start_x + i * DIGIT_SIZE,
      16,
      DIGIT_SIZE,
      DIGIT_SIZE
    );
  }
};
