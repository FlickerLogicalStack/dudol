import { loop } from '../engine/engine.mjs';
import { create_game_context, copy_game_context } from './game_context.mjs';
import { load_resources } from './resources.mjs';
import { cubicBezier } from './utils.mjs';

// #region [LOOP]
loop(
  () => /** @type {HTMLCanvasElement} */ (document.querySelector('canvas')),
  load_resources,
  { create: create_game_context, copy: copy_game_context },
  function on_frame(engine, game) {
    handle_input(engine, game.current);

    handle_physics(engine, game);

    render_test(engine, game.current);

    render_platforms(engine, game.current);

    render_player(engine, game.current);

    render_score(engine, game.current);

    if (game.current.debug.enabled === 1) {
      render_debug(engine, game.current);
    }
  }
);
// #endregion

// #region [RENDER_DEBUG]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 *
 */
const render_debug = (engine, game) => {
  const SIZE = 16;

  engine.ctx.fillStyle = 'green';
  engine.ctx.font = `${SIZE}px monospace`;

  let _i = SIZE;
  engine.ctx.fillText(`Frame: ${engine.frame}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`FPS: ${Math.floor(1000 / engine.delta)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`Paused: ${engine.is_paused}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`player.x: ${game.player.x.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.x_velocity: ${game.player.x_velocity.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.y: ${game.player.y.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.y_velocity: ${game.player.y_velocity.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.jumps_left: ${game.player.jumps_left}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`physics.gravity: ${game.physics.gravity}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`progress.difficilty: ${game.progress.difficilty}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`camera.y: ${game.camera.y.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`debug.platforms: ${game.platforms.length}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`debug.platforms_collisions: ${game.debug.platforms_collisions}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`debug.platforms_renders: ${game.debug.platforms_renders}`, SIZE, ((_i += SIZE), _i));
};
// #endregion

// #region [HANDLE_INPUT]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
const handle_input = (engine, game) => {
  if (engine.inputs.IntlBackslash === true) {
    game.physics.gravity = 0;
    game.player.y_velocity = 0;
  } else {
    game.physics.gravity = 1;
  }

  if (engine.inputs.Space === true) {
    if (game.player.jumps_left > 0) {
      game.player.jumps_left -= 1;
      game.player.y_velocity += 12;

      engine.inputs.Space = false;
    }
  }

  if (engine.inputs.ArrowUp === true) game.player.y_velocity += 50 * engine.delta_mul;
  if (engine.inputs.ArrowDown === true) game.player.y_velocity -= 50 * engine.delta_mul;
  if (engine.inputs.ArrowRight === true) game.player.x_velocity += 100 * engine.delta_mul;
  if (engine.inputs.ArrowLeft === true) game.player.x_velocity -= 100 * engine.delta_mul;

  if (engine.inputs.KeyD === true) {
    game.debug.enabled = game.debug.enabled === 1 ? 0 : 1;
    engine.inputs.KeyD = false;
  }
};
// #endregion

// #region [RENDER_PLAYER]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
const render_player = (engine, game) => {
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
// #endregion

// #region [IS_PLATFORM_VISIBLE]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 * @param {DUDOL.GameState['platforms'][number]} platform
 */
const is_platform_visible = (engine, game, platform) => {
  return (
    platform.y - platform.height >= game.camera.y - game.camera.offset &&
    platform.y <= game.camera.y + (engine.canvas.height - game.camera.offset)
  );
};
// #endregion

// #region [RENDER_TEST]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
const render_test = (engine, game) => {
  engine;
  game;
  // engine.ctx.fillStyle = 'white';
  // engine.ctx.fillRect(333, 0, 10, 1000);
  // engine.ctx.fillRect(666, 0, 10, 1000);
};
// #endregion

// #region [RENDER_PLATFORM]
// Example usage:
// const P0 = { x: 0, y: 0 }; // Start point
// const P1 = { x: 0.5, y: 1 }; // Control point 1
// const P2 = { x: 0.5, y: 0 }; // Control point 2
// const P3 = { x: 1, y: 1 }; // End point

// const t = 0.5; // Parameter t between 0 and 1
// const pointOnCurve = cubicBezier(t, P0, P1, P2, P3);

// console.log(`Point on curve at t = ${t}:`, pointOnCurve);

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 * @param {DUDOL.GameState['platforms'][number]} platform
 */
const render_platform = (engine, game, platform) => {
  const local_y = engine.canvas.height - platform.y - platform.height + (game.camera.y - game.camera.offset);

  // #region [SPRITE]
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
    // break;
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
  // #endregion

  if (game.debug.enabled === 1) {
    engine.ctx.fillStyle = 'transparent';
    engine.ctx.strokeStyle = 'green';
    engine.ctx.lineWidth = 2;

    engine.ctx.strokeRect(platform.x, local_y, platform.width, platform.height);

    game.debug.platforms_renders++;

    engine.ctx.font = 'bold 32px monospace';
    engine.ctx.fillStyle = platform.is_in_x_borders ? 'red' : 'blue';
    engine.ctx.fillText(platform.id.toString(), platform.x + platform.width + 16, local_y + 32 - 4);
  }
};
// #endregion

// #region [RENDER_PLATFORMS]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
const render_platforms = (engine, game) => {
  game.debug.platforms_renders = 0;

  const count = game.platforms.length;

  for (let i = 0; i < count; i++) {
    const platform = game.platforms[i];

    if (!platform.is_visible) {
      continue;
    }

    render_platform(engine, game, platform);
  }
};
// #endregion

// #region [RENDER_SCORE]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
const render_score = (engine, game) => {
  engine.ctx.fillStyle = 'white';
  engine.ctx.font = `40px monospace`;
  engine.ctx.textAlign = 'center';
  engine.ctx.fillText(game.progress.difficilty.toString(), engine.canvas.width / 2, 40 + 16);
  engine.ctx.textAlign = 'start';
};
// #endregion

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameContext} game_context
 */
const handle_physics = (engine, game_context) => {
  var player = game_context.current.player;
  var camera = game_context.current.camera;
  var prev_player = game_context.prev.player;

  var platforms = game_context.current.platforms;

  // #region [DIFFICULTY]
  const new_difficulty = Math.floor(camera.y / 1000);

  if (new_difficulty > game_context.current.progress.difficilty) {
    game_context.current.progress.difficilty = new_difficulty;
  }

  const difficilty = game_context.current.progress.difficilty;
  // #endregion

  // #region [GRAVITY]
  if (player.y > 1 && game_context.current.physics.gravity === 1) {
    player.y_velocity -= 10 * 2 * engine.delta_mul;
  }
  // #endregion

  // #region [INERTIA]
  const x_velocity_abs = Math.abs(player.x_velocity);
  if (x_velocity_abs > 0 && x_velocity_abs <= 0.5) {
    player.x_velocity = 0;
  } else {
    player.x_velocity += -(Math.sign(player.x_velocity) / 2);
  }
  // #endregion

  // #region [APPLY_VELOCITY]
  player.x += player.x_velocity * 100 * engine.delta_mul;
  player.y += player.y_velocity * 100 * engine.delta_mul;
  // #endregion

  // #region [PLATFORM_MOVE]

  for (const platform of platforms) {
    if (platform.moving === 1 && platform.moving_duration > 0) {
      platform.moving_current += engine.delta * platform.moving_direction;

      if (platform.moving_current > platform.moving_duration) {
        platform.moving_current = platform.moving_duration;
        platform.moving_direction = -platform.moving_direction;
      } else if (platform.moving_current < 0) {
        platform.moving_current = 0;
        platform.moving_direction = -platform.moving_direction;
      }

      const perc = platform.moving_current / platform.moving_duration;

      const moving_x = cubicBezier(perc, platform.move_from_x, platform.move_to_x);
      const moving_y = cubicBezier(perc, platform.move_from_y, platform.move_to_y);

      platform.x = moving_x;
      platform.y = moving_y;
    }
  }

  // #endregion

  // #region [COLLISION_PLATFORMS]
  for (const platform of platforms) {
    const is_in_x_borders = player.x + player.width > platform.x && player.x < platform.x + platform.width;

    platform.is_in_x_borders = is_in_x_borders;
    platform.is_visible = is_platform_visible(engine, game_context.current, platform);
  }

  game_context.current.debug.platforms_collisions = 0;
  if (player.y_velocity < 0) {
    for (const platform of platforms) {
      if (platform.is_visible) {
        if (platform.is_in_x_borders) {
          game_context.current.debug.platforms_collisions++;

          const platform_top = platform.y + platform.height;

          if (prev_player.y > platform_top && player.y < platform_top) {
            player.y = platform_top;
            player.y_velocity = 12 + Math.min(difficilty / 10, 2);
            player.jumps_left = 1;

            break;
          }
        }
      }
    }
  }
  // #endregion

  // #region [COLLISION_BORDERS]
  if (player.y < 0) {
    player.y = 0;
    player.y_velocity = -player.y_velocity;
  }

  if (player.x < 0) {
    player.x = 0;
    player.x_velocity = -(player.x_velocity - Math.sign(player.x_velocity));
  } else if (player.x_velocity > 0 && player.x + player.width > engine.canvas.width) {
    player.x = engine.canvas.width - player.width;
    player.x_velocity = -(player.x_velocity - Math.sign(player.x_velocity));
  }
  // #endregion

  // #region [CAMERA]
  // if (player.y > camera.y) {
  // }
  camera.y = Math.floor(player.y);
  // #endregion

  // #region [PLATFORM_GENERATOR]
  if (game_context.current.platforms_generator.is_new_platform_required(platforms, camera.y, engine.canvas.height)) {
    game_context.current.platforms_generator.generate_platform(platforms, game_context.current.progress.difficilty);

    if (platforms.length > 20) {
      platforms.splice(1, 1);
    }
  }
  // #endregion
};
