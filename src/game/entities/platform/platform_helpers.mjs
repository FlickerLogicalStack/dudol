/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 * @param {DUDOL.Entities.Platform} platform
 */
export const is_platform_visible = (engine, game, platform) => {
  return (
    platform.y + platform.height >= game.camera.y - game.camera.offset &&
    platform.y <= game.camera.y + engine.canvas.height - game.camera.offset
  );
};
