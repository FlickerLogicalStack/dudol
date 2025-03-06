import { spawn_particle } from './particle_spawner.mjs';
import { create_particle } from './particle.mjs';
import { rand_spread } from '../../utils.mjs';

/**
 * @param {DUDOL.GameState} game
 */
export const generate_collision_particles = game => {
  const player = game.player;

  const particle_every_pixels = 10;
  const player_width = player.width;
  const player_width_half = player_width / 2;

  const particles = Math.floor(player_width / particle_every_pixels);

  for (let i = 0; i < particles; i++) {
    spawn_particle(
      game,
      create_particle(
        player.x + player_width / 2 - (i * 10 - player_width_half) + rand_spread(5),
        player.y + rand_spread(5),
        32,
        0,
        100 + rand_spread(50)
      )
    );
  }
};

/**
 * @param {DUDOL.GameState} game
 */
export const generate_fly_player_particles = game => {
  const player = game.player;

  spawn_particle(
    game,
    create_particle(player.x + player.width / 2 + rand_spread(16), player.y + rand_spread(16), 32, 1, 200)
  );
};

/**
 * @param {DUDOL.GameState} game
 * @param {DUDOL.Entities.Enemy} enemy
 */
export const generate_enemy_dead_particles = (game, enemy) => {
  spawn_particle(game, create_particle(enemy.x + rand_spread(16), enemy.y + rand_spread(16), 32, 2, 200));
};
