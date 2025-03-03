import { create_game_state, copy_game_state } from './game_state.mjs';
import { generate_platform, is_new_platform_required } from './entities/platform/platform_generator.mjs';
import { handle_input } from './game_inputs.mjs';
import { is_platform_visible } from './entities/platform/platform_helpers.mjs';
import { load_resources } from './resources.mjs';
import { loop } from '../engine/engine.mjs';
import { render_background } from './entities/misc/render_background.mjs';
import { render_debug } from './entities/debug/debug_renderer.mjs';
import { render_platform } from './entities/platform/platform_renderer.mjs';
import { render_player } from './entities/player/player_renderer.mjs';
import { render_score } from './entities/progress/score_renderer.mjs';
import { render_particles } from './entities/particle/particle_renderer.mjs';
import {
  generate_fly_player_particles,
  generate_platform_collision_particles,
} from './entities/particle/particle_generators.mjs';
import { process_platform_animations } from './entities/platform/platform_animations.mjs';

// #region [LOOP]
loop(
  () => /** @type {HTMLCanvasElement} */ (document.querySelector('canvas')),
  load_resources,
  { create: create_game_state, copy: copy_game_state },
  function on_frame(engine, game) {
    if (engine.frame === 1) {
      handle_frame_1(engine, game.current);
    }

    handle_input(engine, game.current);

    handle_gameplay(engine, game);

    render_test(engine, game.current);

    render_background(engine, game.current);
    render_platforms(engine, game.current);
    render_particles(engine, game.current);
    render_player(engine, game.current);
    render_score(engine, game.current);

    if (game.current.debug.enabled === 1) {
      render_debug(engine, game.current);
    }
  }
);
// #endregion

// #region [FRAME 1]
/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
const handle_frame_1 = (engine, game) => {
  engine;
  game;
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

    render_platform(engine, game, platform);
  }
};
// #endregion

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameBuffer} game_buffer
 */
function handle_gameplay(engine, game_buffer) {
  var current = game_buffer.current;

  var player = current.player;
  var prev_player = game_buffer.prev.player;

  var platforms = current.platforms;
  var particles = current.particles;
  var camera = current.camera;
  var physics = current.physics;
  var debug = current.debug;
  var progress = current.progress;

  // #region [DIFFICULTY]
  const new_difficulty = Math.floor(camera.y / 1000);

  if (new_difficulty > progress.difficulty) {
    progress.difficulty = new_difficulty;
  }

  const difficilty = progress.difficulty;
  // #endregion

  // #region [GRAVITY]
  if (player.y > 1 && physics.gravity === 1) {
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

  // #region [ANIMATIONS]
  process_platform_animations(engine, current);
  // #endregion

  // #region [COLLISION_PLATFORMS]
  for (const platform of platforms) {
    const is_in_x_borders = player.x + player.width > platform.x && player.x < platform.x + platform.width;

    platform.is_in_x_borders = is_in_x_borders;
    platform.is_visible = is_platform_visible(engine, current, platform);
  }

  debug.platforms_collisions = 0;
  if (player.y_velocity < 0) {
    for (const platform of platforms) {
      if (platform.is_visible) {
        if (platform.is_in_x_borders) {
          if (platform.id === player.staying_on_platform) {
            player.y = platform.y + platform.height;
            player.y_velocity = 0;

            if (player.x_velocity !== 0) {
              generate_platform_collision_particles(current);
            }

            break;
          }

          debug.platforms_collisions++;

          const platform_top = platform.y + platform.height;
          const platform_bottom = platform.y;

          const was_above_platform = prev_player.y > platform_top;
          const is_in_platform_now = player.y > platform_bottom && player.y < platform_top;

          if (was_above_platform && is_in_platform_now) {
            player.y = platform_top;
            player.y_velocity = player.constant.bounce_velocity_y + Math.min(difficilty / 10, 2);
            player.jumps_left = player.constant.max_jumps;

            generate_platform_collision_particles(current);

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
    player.y_velocity = -(player.y_velocity / 2);
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
  camera.y = Math.floor(Math.max(player.y, camera.offset));
  // #endregion

  // #region [PLATFORM_GENERATOR]
  if (current.platforms_generator_enabled === 1 && is_new_platform_required(engine, current)) {
    generate_platform(engine, current);

    if (platforms.length > 20) {
      platforms.splice(1, 1);
    }
  }
  // #endregion

  // #region [PARTICLES]
  var particles_length = particles.length;
  for (var i = 0; i < particles_length; i++) {
    const particle = particles[i];

    if (particle.lifetime_left === 0) {
      continue;
    }

    if (particle.lifetime_left - engine.delta > 0) {
      particle.lifetime_left -= engine.delta;
    } else {
      particles.splice(i, 1);
      particles_length--;
    }
  }

  if (player.y_velocity > 6) {
    generate_fly_player_particles(current);
  }
  // #endregion
}
