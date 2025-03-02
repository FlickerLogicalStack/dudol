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

  style: 0,

  is_visible: false,
  is_in_x_borders: false,

  moving: 0,
  moving_direction: 1,
  moving_duration: 0,
  moving_current: 0,
  move_from_x: 0,
  move_from_y: 0,
  move_to_x: 0,
  move_to_y: 0,
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
  to.moving = from.moving;
  to.moving_direction = from.moving_direction;
  to.moving_duration = from.moving_duration;
  to.moving_current = from.moving_current;
  to.move_from_x = from.move_from_x;
  to.move_from_y = from.move_from_y;
  to.move_to_x = from.move_to_x;
  to.move_to_y = from.move_to_y;
};
