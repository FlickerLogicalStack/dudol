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
  to.id = from.id;

  to.x = from.x;
  to.y = from.y;
  to.width = from.width;
  to.height = from.height;
};

/**
 * @param {DUDOL.Entities.Platform} platform
 */
export const clone_platform = platform => {
  const new_platform = create_platform(platform.id, platform.x, platform.y, platform.width);

  return new_platform;
};

/**
 * @param {DUDOL.Entities.Platform[]} from
 * @param {DUDOL.Entities.Platform[]} to
 */
export const copy_platforms = (from, to) => {
  const from_platfroms_count = from.length;
  const to_platfroms_count = to.length;

  const copy_count = Math.min(from_platfroms_count, to_platfroms_count);

  for (var i = 0; i < copy_count; i++) {
    copy_platform(from[i], to[i]);
  }

  if (from_platfroms_count !== to_platfroms_count) {
    if (to_platfroms_count > from_platfroms_count) {
      to.length = from_platfroms_count;
    } else {
      for (let i = to_platfroms_count; i < from_platfroms_count; i++) {
        const platform_for_copy = from[i];

        const clone = clone_platform(platform_for_copy);

        to.push(clone);
      }
    }
  }
};
