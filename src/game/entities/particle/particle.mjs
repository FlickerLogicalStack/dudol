export const create_particle = /**
 * @this {{ id: number }}
 * @param {number} x
 * @param {number} y
 * @param {number} size
 * @param {number} type
 * @param {number} lifetime
 * @returns {DUDOL.Entities.Particle}
 */ function create_particle_inner(x, y, size, type, lifetime) {
  return {
    id: this.id++,
    center_x: x,
    center_y: y,
    size,
    type,
    lifetime,
    lifetime_left: lifetime,
  };
}.bind({ id: 0 });

/**
 * @param {DUDOL.Entities.Particle} from
 * @param {DUDOL.Entities.Particle} to
 */
export const copy_particle = (from, to) => {
  to.center_x = from.center_x;
  to.center_y = from.center_y;
  to.size = from.size;
  to.type = from.type;
  to.lifetime = from.lifetime;
  to.lifetime_left = from.lifetime_left;
};
