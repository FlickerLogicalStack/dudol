import { spawn_particle } from './particle_spawner.mjs';
import { create_particle } from './particle.mjs';
import { randrange } from '../../utils.mjs';

/**
 * @param {DUDOL.GameState} game
 */
export const generate_platform_bounce_particles = game => {
  const player = game.player;

  const particle_every_pixels = 10;
  const player_width = player.width;
  const player_width_half = player_width / 2;

  const particles = Math.floor(player_width / particle_every_pixels);

  for (let i = 0; i < particles; i++) {
    spawn_particle(
      game,
      create_particle(
        player.x + player_width / 2 - (i * 10 - player_width_half) + randrange(-5, 5),
        player.y + randrange(-5, 5),
        32,
        0,
        100 + randrange(-50, 50)
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
    create_particle(
      player.x + player.width / 2 + randrange(-16, 16),
      player.y + player.height / 2 + randrange(-16, 16),
      32,
      1,
      200
    )
  );
};
