/**
 * @param {number} y
 * @returns {DUDOL.Entities.Camera}
 */
export const create_camera = y => ({
  y: y,
  offset: 450,
});

/**
 * @param {DUDOL.Entities.Camera} from
 * @param {DUDOL.Entities.Camera} to
 */
export const copy_camera = (from, to) => {
  to.y = from.y;
};
