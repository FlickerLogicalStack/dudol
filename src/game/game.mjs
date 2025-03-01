import { loop } from '../engine/engine.mjs';
import { create_game_context, copy_game_context } from './game_context.mjs';

// #region [LOOP]
loop(
  () => /** @type {HTMLCanvasElement} */ (document.querySelector('canvas')),
  { create: create_game_context, copy: copy_game_context },
  (engine, game) => {
    handle_input(engine, game.current);

    handle_physics(engine, game);

    render_platforms(engine, game.current);

    render_player(engine, game.current);

    render_debug(engine, game.current);
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
  const SIZE = 20;

  engine.ctx.fillStyle = 'green';
  engine.ctx.font = `${SIZE}px monospace`;

  let _i = SIZE;
  engine.ctx.fillText(`Frame: ${engine.frame}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`FPS: ${Math.floor(1000 / engine.delta)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`Paused: ${engine.is_paused}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`ArrowUp: ${engine.inputs.ArrowUp}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`ArrowRight: ${engine.inputs.ArrowRight}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`ArrowDown: ${engine.inputs.ArrowDown}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`ArrowLeft: ${engine.inputs.ArrowLeft}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`Space: ${engine.inputs.Space}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`P: ${engine.inputs.KeyP}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`player.x: ${game.player.x.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.x_velocity: ${game.player.x_velocity.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.y: ${game.player.y.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.y_velocity: ${game.player.y_velocity.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.is_locked: ${game.player.is_locked}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`camera.max_y: ${game.camera.max_y.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
};
// #endregion

// #region [HANDLE_INPUT]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
const handle_input = (engine, game) => {
  if (engine.inputs.ArrowUp === true) game.player.y_velocity += 0.1;
  if (engine.inputs.ArrowDown === true) game.player.y_velocity -= 0.1;
  if (engine.inputs.ArrowRight === true) game.player.x_velocity += 1;
  if (engine.inputs.ArrowLeft === true) game.player.x_velocity -= 1;

  if (engine.inputs.Space === true) {
    game.player.is_locked = true;
  } else {
    game.player.is_locked = false;
  }
};
// #endregion

// #region [RENDER_PLAYER]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
const render_player = (engine, game) => {
  engine.ctx.fillStyle = 'white';
  engine.ctx.fillRect(
    game.player.x,
    engine.canvas.height - game.player.y - game.player.height + game.camera.max_y - game.camera.offset,
    game.player.width,
    game.player.height
  );
};
// #endregion

// #region [RENDER_PLATFORMS]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
const render_platforms = (engine, game) => {
  const count = game.platforms.length;

  let renders = [];

  for (let i = 0; i < count; i++) {
    const platform = game.platforms[i];

    if (
      platform.y + platform.height < game.camera.max_y - game.camera.offset ||
      platform.y > game.camera.max_y + game.camera.offset + game.player.height
    ) {
      continue;
    }

    const local_y = engine.canvas.height - platform.y - platform.height + (game.camera.max_y - game.camera.offset);

    engine.ctx.fillStyle = platform.is_in_x_borders ? 'red' : 'blue';

    engine.ctx.fillRect(platform.x, local_y, platform.width, platform.height);

    engine.ctx.font = 'bold 40px monospace';
    engine.ctx.fillStyle = 'white';
    engine.ctx.fillText(platform.id.toString(), platform.x + platform.width + 16, local_y);

    renders.push(platform.id);
  }

  console.log('Platforms renders', renders.length);
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

  // #region [GRAVITY]
  if (player.y > 1) {
    player.y_velocity -= 9.81 * engine.delta_mul;
  }
  // #endregion

  // #region [INERTIA]
  const x_velocity_abs = Math.abs(player.x_velocity);
  if (x_velocity_abs > 0 && x_velocity_abs <= 0.1) {
    player.x_velocity = 0;
  } else {
    player.x_velocity += -(Math.sign(player.x_velocity) / 2);
  }
  // #endregion

  // #region [APPLY_VELOCITY]
  if (player.is_locked) {
    player.x_velocity = 0;
    player.y_velocity = 0;
  }

  player.x += player.x_velocity;
  player.y += player.y_velocity;
  // #endregion

  // #region [COLLISION_PLATFORMS]
  for (const platform of game_context.current.platforms) {
    const is_in_x_borders = player.x + player.width > platform.x && player.x < platform.x + platform.width;

    platform.is_in_x_borders = is_in_x_borders;
  }

  if (player.y_velocity < 0) {
    let i = 0;

    for (const platform of game_context.current.platforms) {
      if (platform.is_in_x_borders) {
        i++;

        const platform_top = platform.y + platform.height;

        if (prev_player.y > platform_top && player.y < platform_top) {
          player.y = platform_top;
          player.y_velocity = 7;

          break;
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

  // #region [MAX_Y]
  // if (player.y > camera.max_y) {
  // }
  camera.max_y = Math.max(player.y, 450);
  // #endregion

  // const player.x_velocity_abs = Math.abs(game.player.x_velocity);
  // if (player.x_velocity_abs > 0 && player.x_velocity_abs <= 0.1) {
  //   game.player.x_velocity = 0;
  // } else {
  //   game.player.x_velocity += -(Math.sign(game.player.x_velocity) / 2);
  // }
  // if (game.player.y_velocity >= -0.1 && game.player.y_velocity < 0) {
  //   game.player.y_velocity = 0;
  // } else {
  //   game.player.y_velocity += -(Math.sign(game.player.y_velocity) / 10);
  // }
  // game.player.x += game.player.x_velocity;
  // game.player.y += game.player.y_velocity;
  // for (const platform of game.platforms) {
  //   if (game.player.x + game.player.width > platform.x && game.player.x < platform.x + platform.width) {
  //     if (game.player.y_velocity < 0) {
  //       if (platform.y + platform.height > game.player.y && game.player.y > platform.y) {
  //         game.player.y = platform.y + platform.height;
  //         game.player.y_velocity = -game.player.y_velocity;
  //       }
  //     }
  //   }
  // }
  // if (game.player.x < 0) {
  //   game.player.x = 0;
  //   game.player.x_velocity = -(game.player.x_velocity - Math.sign(game.player.x_velocity));
  // } else if (game.player.x_velocity > 0 && game.player.x + game.player.width > engine.canvas.width) {
  //   game.player.x = engine.canvas.width - game.player.width;
  //   game.player.x_velocity = -(game.player.x_velocity - Math.sign(game.player.x_velocity));
  // }
  // if (game.player.y < 0) {
  //   game.player.y = 0;
  //   game.player.y_velocity = -game.player.y_velocity;
  //   game.player.is_in_jump = 0;
  // }
};
