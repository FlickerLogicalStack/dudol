import {
  generate_fly_player_particles,
  generate_collision_particles,
  generate_enemy_dead_particles,
} from './entities/particle/particle_generators.mjs';
import { create_animation } from './entities/animation/animation.mjs';
import { create_game_state, copy_game_state } from './game_state.mjs';
import { enemy_animation_dead, process_enemy_animations } from './entities/enemy/enemy_animation.mjs';
import { generate_platform, is_new_platform_required } from './entities/platform/platform_generator.mjs';
import { handle_input } from './game_inputs.mjs';
import { is_platform_visible } from './entities/platform/platform_helpers.mjs';
import { is_player_bounce_on_enemy, is_player_bounce_on_platform } from './entities/player/player_collision.mjs';
import { load_resources } from './resources.mjs';
import { loop } from '../engine/engine.mjs';
import { process_platform_animations } from './entities/platform/platform_animations.mjs';
import { render_background } from './entities/misc/render_background.mjs';
import { render_debug } from './entities/debug/debug_renderer.mjs';
import { render_enemy } from './entities/enemy/enemy_renderer.mjs';
import { render_particles } from './entities/particle/particle_renderer.mjs';
import { render_platform } from './entities/platform/platform_renderer.mjs';
import { render_player } from './entities/player/player_renderer.mjs';
import { render_score } from './entities/progress/score_renderer.mjs';

// #region [LOOP]
loop(
  () => /** @type {HTMLCanvasElement} */ (document.querySelector('canvas')),
  load_resources,
  { create: create_game_state, copy: copy_game_state },
  function on_frame(engine, game) {
    handle_input(engine, game.current);

    handle_gameplay(engine, game);

    if (engine.frame === 1) {
      handle_frame_1(engine, game.current);
    }

    render_test(engine, game.current);

    render_background(engine, game.current);
    render_platforms(engine, game.current);
    render_particles(engine, game.current);
    render_player(engine, game.current);
    render_enemy(engine, game.current);
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

    if (platform.is_visible === false) {
      continue;
    }

    if (platform.opacity === 0) {
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

  var platforms = current.platforms;
  var particles = current.particles;
  var enemies = current.enemies;

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
    player.y_velocity -= 10 * 4 * engine.delta_mul;
  }
  // #endregion

  // #region [INERTIA]
  const x_velocity_abs = Math.abs(player.x_velocity);
  if (x_velocity_abs > 0 && x_velocity_abs < 0.2) {
    player.x_velocity = 0;
  } else {
    player.x_velocity -= Math.sign(player.x_velocity) / 3;
  }
  // #endregion

  // #region [APPLY_VELOCITY]
  player.x += player.x_velocity * 100 * engine.delta_mul;
  player.y += player.y_velocity * 100 * engine.delta_mul;
  // #endregion

  // #region [ENEMIES_AI]
  for (var enemy of enemies) {
    if (enemy.alive === 1) {
      const diff_x = (player.x + player.width / 2 - enemy.base_x) / 2;
      const diff_y = (player.y + player.width / 2 - enemy.base_y) / 2;

      if (Math.abs(diff_x) < 200 && Math.abs(diff_y) < 200) {
        enemy.base_x += diff_x * engine.delta_mul;
        enemy.base_y += diff_y * engine.delta_mul;
      }
    }
  }
  // #endregion

  // #region [ANIMATIONS]
  process_platform_animations(engine, current);
  process_enemy_animations(engine, current);
  // #endregion

  // #region [COLLISIONS_ENEMIES]
  const enemies_count = enemies.length;
  if (player.y_velocity < 0) {
    for (var i = 0; i < enemies_count; i++) {
      var enemy = enemies[i];

      var current_intersection = is_player_bounce_on_enemy(game_buffer, i);

      if (current_intersection) {
        player.y = enemy.y + enemy.height;
        player.y_velocity = player.constant.bounce_velocity_y / 2 + Math.min(difficilty / 10, 2);
        player.jumps_left = player.constant.max_jumps;

        const dead_animation = create_animation(enemy.base_y, enemy.base_y - 200, 200, enemy_animation_dead);
        dead_animation.cycled = false;
        enemy.animations.push(dead_animation);

        generate_collision_particles(current);

        break;
      }
    }
  }
  // #endregion

  // #region [COLLISION_PLATFORMS]
  for (const platform of platforms) {
    platform.is_visible = is_platform_visible(engine, current, platform);
  }

  debug.platforms_collisions = 0;
  const platforms_count = platforms.length;

  if (player.y_velocity < 0) {
    for (var i = 0; i < platforms_count; i++) {
      var platform = platforms[i];

      if (platform.is_visible === false) {
        continue;
      }

      if (player.y + player.height > platform.y + platform.height) {
        if (platform.id === player.staying_on_platform) {
          player.y = platform.y + platform.height;
          player.y_velocity = 0;

          if (player.x_velocity !== 0) {
            generate_collision_particles(current);
          }

          break;
        }

        debug.platforms_collisions++;

        var current_intersection = is_player_bounce_on_platform(game_buffer, i);

        if (current_intersection) {
          player.y = platform.y + platform.height;
          player.y_velocity = player.constant.bounce_velocity_y + Math.min(difficilty / 10, 2);
          player.jumps_left = player.constant.max_jumps;

          generate_collision_particles(current);

          break;
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

  // #region [ENEMY_GENERATOR]
  // if (current.enemies_generator_enabled === 1) {
  //   generate_enemy(engine, current);

  //   if (enemies.length > 20) {
  //     enemies.splice(0, 1);
  //   }
  // }
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

  // #region [ENEMIES]
  var particles_length = enemies.length;
  for (var i = 0; i < particles_length; i++) {
    const enemy = enemies[i];

    if (enemy.alive === 0) {
      enemies.splice(i, 1);
      particles_length--;
    } else if (enemy.is_dying === 1) {
      generate_enemy_dead_particles(current, enemy);
    }
  }
  // #endregion
}
