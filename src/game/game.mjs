import { loop } from '../engine/engine.mjs';
import { create_game_context, copy_game_context } from './game_context.mjs';
import { load_resources } from './resources.mjs';

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

    if (game.current.debug.enabled === true) {
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
  engine.ctx.fillText(`ArrowUp: ${engine.inputs.ArrowUp}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`ArrowRight: ${engine.inputs.ArrowRight}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`ArrowDown: ${engine.inputs.ArrowDown}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`ArrowLeft: ${engine.inputs.ArrowLeft}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`Space: ${engine.inputs.Space}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`player.x: ${game.player.x.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.x_velocity: ${game.player.x_velocity.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.y: ${game.player.y.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.y_velocity: ${game.player.y_velocity.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.is_locked: ${game.player.is_locked}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`camera.y: ${game.camera.y.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
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
  if (engine.inputs.ArrowUp === true) game.player.y_velocity += 0.1;
  if (engine.inputs.ArrowDown === true) game.player.y_velocity -= 0.1;
  if (engine.inputs.ArrowRight === true) game.player.x_velocity += 100 * engine.delta_mul;
  if (engine.inputs.ArrowLeft === true) game.player.x_velocity -= 100 * engine.delta_mul;

  if (engine.inputs.Space === true) {
    game.player.is_locked = true;
  } else {
    game.player.is_locked = false;
  }

  if (engine.inputs.KeyD === true) {
    game.debug.enabled = !game.debug.enabled;
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

  if (game.debug.enabled === true) {
    engine.ctx.fillStyle = 'transparent';
    engine.ctx.strokeStyle = 'green';
    engine.ctx.lineWidth = 2;

    engine.ctx.strokeRect(render_x, render_y, game.player.width, game.player.height);
  }
};
// #endregion

// #region [IS_PLATFORM_VISIBLE]
/**
 * @param {DUDOL.GameState} game
 * @param {DUDOL.GameState['platforms'][number]} platform
 */
const is_platform_visible = (game, platform) => {
  return (
    platform.y + platform.height >= game.camera.y - game.camera.offset &&
    platform.y <= game.camera.y + game.camera.offset + game.player.height
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

    const local_y = engine.canvas.height - platform.y - platform.height + (game.camera.y - game.camera.offset);

    // #region [SPRITE]
    engine.ctx.imageSmoothingEnabled = false;

    const sprite_pivot_x = 68;
    const sprite_pivot_y = 51;

    engine.ctx.drawImage(
      engine.resources.sprites3,
      sprite_pivot_x,
      sprite_pivot_y,
      16,
      16,
      platform.x,
      local_y,
      platform.height,
      platform.height
    );

    engine.ctx.drawImage(
      engine.resources.sprites3,
      sprite_pivot_x + (16 + 1) * 1,
      sprite_pivot_y,
      16,
      16,
      platform.x + platform.height,
      local_y,
      platform.width - platform.height - platform.height,
      platform.height
    );

    engine.ctx.drawImage(
      engine.resources.sprites3,
      sprite_pivot_x + (16 + 1) * 2,
      sprite_pivot_y,
      16,
      16,
      platform.x + platform.width - platform.height,
      local_y,
      platform.height,
      platform.height
    );
    // #endregion

    if (game.debug.enabled === true) {
      engine.ctx.fillStyle = 'transparent';
      engine.ctx.strokeStyle = 'green';
      engine.ctx.lineWidth = 2;

      engine.ctx.strokeRect(platform.x, local_y, platform.width, platform.height);

      game.debug.platforms_renders++;

      engine.ctx.font = 'bold 32px monospace';
      engine.ctx.fillStyle = platform.is_in_x_borders ? 'red' : 'blue';
      engine.ctx.fillText(platform.id.toString(), platform.x + platform.width + 16, local_y + 32 - 4);
    }
  }
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
  if (x_velocity_abs > 0 && x_velocity_abs <= 0.5) {
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
    platform.is_visible = is_platform_visible(game_context.current, platform);
  }

  game_context.current.debug.platforms_collisions = 0;
  if (player.y_velocity < 0) {
    for (const platform of game_context.current.platforms) {
      if (platform.is_visible) {
        game_context.current.debug.platforms_collisions++;

        const is_in_x_borders = player.x + player.width > platform.x && player.x < platform.x + platform.width;

        platform.is_in_x_borders = is_in_x_borders;

        if (is_in_x_borders) {
          const platform_top = platform.y + platform.height;

          if (prev_player.y > platform_top && player.y < platform_top) {
            player.y = platform_top;
            player.y_velocity = 7;

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
  camera.y = Math.max(player.y, 450);
  // #endregion
};
