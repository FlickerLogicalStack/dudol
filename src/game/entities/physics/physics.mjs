/**
 * @returns {DUDOL.Entities.Physics}
 */
export const create_physics = () => ({
  gravity: 1,
});

/**
 * @param {DUDOL.Entities.Physics} from
 * @param {DUDOL.Entities.Physics} to
 */
export const copy_physics = (from, to) => {
  to.gravity = from.gravity;
};
