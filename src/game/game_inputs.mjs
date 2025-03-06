/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const handle_input = (engine, game) => {
  if (engine.inputs.IntlBackslash === true || engine.inputs.KeyC === true) {
    game.physics.gravity = 0;
    game.player.y_velocity = 0;
  } else {
    game.physics.gravity = 1;
  }

  if (engine.inputs.Space === true || engine.inputs.KeyW === true) {
    engine.inputs.Space = false;
    engine.inputs.KeyW = false;

    if (game.platforms_generator_enabled === 0) {
      game.platforms_generator_enabled = 1;
      game.enemies_generator_enabled = 1;
      game.player.staying_on_platform = -1;
      game.player.y_velocity = 30;
      game.player.jumps_left -= 1;
    } else if (game.player.jumps_left > 0) {
      game.player.jumps_left -= 1;
      game.player.y_velocity = game.player.constant.jump_velocity_y;
    }
  }

  if (engine.inputs.ArrowUp === true) {
    if (game.player.staying_on_platform === -1) {
      game.player.y_velocity += 50 * engine.delta_mul;
    }
  }

  if (engine.inputs.ArrowDown === true) {
    game.player.y_velocity -= 50 * engine.delta_mul;
  }

  if (engine.inputs.ArrowRight === true || engine.inputs.KeyD === true) {
    game.player.x_velocity += 100 * engine.delta_mul;

    game.player.x_velocity = Math.min(game.player.x_velocity, 20);
  }

  if (engine.inputs.ArrowLeft === true || engine.inputs.KeyA === true) {
    game.player.x_velocity -= 100 * engine.delta_mul;

    game.player.x_velocity = Math.max(-20, game.player.x_velocity);
  }

  if (engine.inputs.Digit2 === true) {
    engine.inputs.Digit2 = false;
    game.debug.enabled ^= 1;
  }

  if (engine.inputs.KeyI === true) {
    engine.inputs.KeyI = false;

    if (engine.ctx.filter === 'none') {
      engine.ctx.filter = 'invert(1)';
    } else {
      engine.ctx.filter = 'none';
    }
  }

  if (engine.inputs.Digit1 === true) {
    engine.inputs.Digit1 = false;

    game.player.x = game.player.constant.default_x;
    game.player.y = game.player.constant.default_y;
    game.player.x_velocity = 0;
    game.player.y_velocity = 0;
    game.player.jumps_left = game.player.constant.max_jumps;
    game.player.staying_on_platform = 0;

    game.camera.y = game.camera.offset;

    game.progress.difficulty = 0;

    game.platforms_generator_enabled = 0;
    game.enemies_generator_enabled = 0;
    game.platforms.length = 1;
  }
};
