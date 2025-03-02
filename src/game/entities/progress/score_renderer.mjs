/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const render_score = (engine, game) => {
  engine.ctx.fillStyle = 'white';
  engine.ctx.font = `40px monospace`;
  engine.ctx.textAlign = 'center';
  engine.ctx.fillText(game.progress.difficulty.toString(), engine.canvas.width / 2, 40 + 16);
  engine.ctx.textAlign = 'start';
};
