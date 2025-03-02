/**
 * @param {DUDOL.GameState} game
 * @param {DUDOL.Entities.Particle} particle
 */
export const spawn_particle = (game, particle) => {
  game.particles.push(particle);
};
