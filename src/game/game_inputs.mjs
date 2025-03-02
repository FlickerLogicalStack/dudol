/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const handle_input = (engine, game) => {
  if (engine.inputs.IntlBackslash === true) {
    game.physics.gravity = 0;
    game.player.y_velocity = 0;
  } else {
    game.physics.gravity = 1;
  }

  if (engine.inputs.Space === true) {
    if (game.player.jumps_left > 0) {
      game.player.jumps_left -= 1;
      game.player.y_velocity = 12;

      engine.inputs.Space = false;
    }
  }

  if (engine.inputs.ArrowUp === true) game.player.y_velocity += 50 * engine.delta_mul;
  if (engine.inputs.ArrowDown === true) game.player.y_velocity -= 50 * engine.delta_mul;
  if (engine.inputs.ArrowRight === true) game.player.x_velocity += 100 * engine.delta_mul;
  if (engine.inputs.ArrowLeft === true) game.player.x_velocity -= 100 * engine.delta_mul;

  if (engine.inputs.KeyD === true) {
    engine.inputs.KeyD = false;
    game.debug.enabled ^= 1;
  }

  if (engine.inputs.Digit1 === true) {
    engine.inputs.Digit1 = false;

    game.player.x = 500.0 - game.player.width / 2;
    game.player.y = 250;
    game.player.x_velocity = 0;
    game.player.y_velocity = 0;
    game.camera.y = game.camera.offset;
    game.progress.difficulty = 1;
    game.platforms.splice(1, game.platforms.length - 1);
  }
};
