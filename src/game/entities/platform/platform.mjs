/**
 * @param {number} id
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @returns {DUDOL.Entities.Platform}
 */
export const create_platform = (id, x, y, width) => ({
  id,
  x,
  y,
  width,
  height: 32,

  moving: 0,
  once: 0,

  is_visible: false,
  is_in_x_borders: false,

  opacity: 1.0,

  animations: [],
});

/**
 * @param {DUDOL.Entities.Platform} from
 * @param {DUDOL.Entities.Platform} to
 */
export const copy_platform = (from, to) => {
  to.x = from.x;
  to.y = from.y;
  to.width = from.width;
  to.height = from.height;

  to.is_visible = from.is_visible;
  to.is_in_x_borders = from.is_in_x_borders;

  to.is_visible = from.is_visible;
  to.is_in_x_borders = from.is_in_x_borders;
};
