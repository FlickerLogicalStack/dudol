// @ts-check

import { loop } from '../engine/engine.mjs';
import { create_game_context } from './game_context.mjs';

const get_canvas = () => /** @type {HTMLCanvasElement} */ (document.querySelector('canvas'));

loop(get_canvas, create_game_context, (engine, game) => {
  handle_input(engine, game);

  handle_physics(engine, game);

  render_platforms(engine, game);

  render_player(engine, game);

  render_debug(engine, game);

  render_canvas_border(engine);
});

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameContext} game
 *
 */
const render_debug = (engine, game) => {
  engine.ctx.fillStyle = 'green';
  engine.ctx.font = '16px monospace';

  let _i = 16;
  engine.ctx.fillText(`FPS: ${Math.floor(1000 / engine.delta)}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`Paused: ${engine.is_paused}`, 16, ((_i += 16), _i));
  _i += 16;
  engine.ctx.fillText(`ArrowUp: ${engine.inputs.ArrowUp}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`ArrowRight: ${engine.inputs.ArrowRight}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`ArrowDown: ${engine.inputs.ArrowDown}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`ArrowLeft: ${engine.inputs.ArrowLeft}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`Space: ${engine.inputs.Space}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`P: ${engine.inputs.KeyP}`, 16, ((_i += 16), _i));
  _i += 16;
  engine.ctx.fillText(`player_x: ${game.player_x}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`player_x_velocity: ${game.player_x_velocity}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`player_y: ${game.player_y}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`player_y_velocity: ${game.player_y_velocity}`, 16, ((_i += 16), _i));
  engine.ctx.fillText(`player_is_in_jump: ${game.player_is_in_jump}`, 16, ((_i += 16), _i));
};

/**
 * @param {DUDOL.EngineContext} engine
 */
const render_canvas_border = engine => {
  engine.ctx.strokeStyle = 'white';
  engine.ctx.lineWidth = 2;
  engine.ctx.strokeRect(0, 0, engine.canvas.width, engine.canvas.height);
};

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameContext} game
 */
const handle_input = (engine, game) => {
  if (engine.inputs.ArrowUp === true) game.player_y_velocity += 0.1;
  if (engine.inputs.ArrowDown === true) game.player_y_velocity -= 0.1;
  if (engine.inputs.ArrowRight === true) game.player_x_velocity += 1;
  if (engine.inputs.ArrowLeft === true) game.player_x_velocity -= 1;

  if (engine.inputs.Space === true) {
    game.player_y_velocity = 0;
    game.player_x_velocity = 0;
  }
};

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameContext} game
 */
const render_player = (engine, game) => {
  engine.ctx.fillStyle = 'white';
  engine.ctx.fillRect(
    game.player_x,
    engine.canvas.height - game.player_y - game.player_height,
    game.player_width,
    game.player_height
  );
};

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameContext} game
 */
const render_platforms = (engine, game) => {
  engine.ctx.fillStyle = 'blue';

  game.platforms.forEach(platform => {
    engine.ctx.fillRect(platform.x, engine.canvas.height - platform.y - platform.height, platform.width, platform.height);
  });
};

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameContext} game
 */
const handle_physics = (engine, game) => {
  game.player_y_velocity -= 9.81 * engine.delta_mul;

  const player_x_velocity_abs = Math.abs(game.player_x_velocity);

  if (player_x_velocity_abs > 0 && player_x_velocity_abs <= 0.1) {
    game.player_x_velocity = 0;
  } else {
    game.player_x_velocity += -(Math.sign(game.player_x_velocity) / 2);
  }

  // if (game.player_y_velocity >= -0.1 && game.player_y_velocity < 0) {
  //   game.player_y_velocity = 0;
  // } else {
  //   game.player_y_velocity += -(Math.sign(game.player_y_velocity) / 10);
  // }

  game.player_x += game.player_x_velocity;
  game.player_y += game.player_y_velocity;

  for (const platform of game.platforms) {
    if (game.player_x + game.player_width > platform.x && game.player_x < platform.x + platform.width) {
      if (game.player_y_velocity < 0) {
        if (platform.y + platform.height > game.player_y && game.player_y > platform.y) {
          game.player_y = platform.y + platform.height;
          game.player_y_velocity = -game.player_y_velocity;
        }
      }
    }
  }

  if (game.player_x < 0) {
    game.player_x = 0;
    game.player_x_velocity = -(game.player_x_velocity - Math.sign(game.player_x_velocity));
  } else if (game.player_x_velocity > 0 && game.player_x + game.player_width > engine.canvas.width) {
    game.player_x = engine.canvas.width - game.player_width;
    game.player_x_velocity = -(game.player_x_velocity - Math.sign(game.player_x_velocity));
  }

  if (game.player_y < 0) {
    game.player_y = 0;
    game.player_y_velocity = -game.player_y_velocity;
    game.player_is_in_jump = 0;
  }
};
