import { randrange } from '../../utils.mjs';

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const render_particles = (engine, game) => {
  for (var particle of game.particles) {
    if (particle.lifetime_left === 0) {
      continue;
    }

    if (particle.type === 0) {
      const sprite_info =
        engine.resources.map.particles[particle.lifetime - particle.lifetime_left > particle.lifetime / 2 ? 1 : 0];

      engine.ctx.drawImage(
        engine.resources.sprites2,
        sprite_info.x,
        sprite_info.y,
        sprite_info.size,
        sprite_info.size,
        particle.center_x - particle.size / 2,
        engine.canvas.height - particle.center_y - particle.size / 2 + (game.camera.y - game.camera.offset),
        particle.size,
        particle.size
      );
    }

    if (particle.type === 1) {
      const sprite_info = engine.resources.map.particles[2];

      engine.ctx.drawImage(
        engine.resources.sprites2,
        sprite_info.x,
        sprite_info.y,
        sprite_info.size,
        sprite_info.size,
        particle.center_x - particle.size / 2,
        engine.canvas.height - particle.center_y - particle.size / 2 + (game.camera.y - game.camera.offset),
        particle.size,
        particle.size
      );
    }
  }
};
