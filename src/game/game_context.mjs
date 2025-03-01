/**
 * @param {number} id
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
const create_platform = (id, x, y, width, height) => ({
  id,
  x,
  y,
  width,
  height,
  is_in_x_borders: false,
});

/**
 * @param {ReturnType<typeof create_platform>} from
 * @param {ReturnType<typeof create_platform>} to
 */
const copy_platform = (from, to) => {
  to.x = from.x;
  to.y = from.y;
  to.width = from.width;
  to.height = from.height;

  to.is_in_x_borders = from.is_in_x_borders;
};

/**
 * @param {number} max_y
 */
const create_camera = max_y => ({
  max_y,
  offset: 450,
});

/**
 * @param {ReturnType<typeof create_camera>} from
 * @param {ReturnType<typeof create_camera>} to
 */
const copy_camera = (from, to) => {
  to.max_y = from.max_y;
};

const create_player = () => {
  const x_velocity = 0.0;
  const y_velocity = 0.0;

  const width = 100.0;
  const height = 100.0;

  const x = 500.0 - width / 2;
  const y = 500.0 - height / 2;

  const is_locked = false;

  return {
    x_velocity,
    y_velocity,

    width,
    height,

    x,
    y,

    is_locked,
  };
};

/**
 * @param {ReturnType<typeof create_player>} from
 * @param {ReturnType<typeof create_player>} to
 */
const copy_player = (from, to) => {
  to.x = from.x;
  to.y = from.y;

  to.width = from.width;
  to.height = from.height;

  to.x_velocity = from.x_velocity;
  to.y_velocity = from.y_velocity;

  to.is_locked = from.is_locked;
};

export const create_game_context = () => {
  const player = create_player();

  return {
    player: player,

    camera: create_camera(player.y),

    platforms: Array.from({ length: 10 }, (_, i) => {
      return create_platform(i, 200 + (i % 3) * 200, 200 + i++ * 200, 200, 20);
    }),
  };
};

/**
 * @param {ReturnType<typeof create_game_context>} from
 * @param {ReturnType<typeof create_game_context>} to
 */
export const copy_game_context = (from, to) => {
  copy_player(from.player, to.player);

  copy_camera(from.camera, to.camera);

  const from_platfroms_count = from.platforms.length;
  const to_platfroms_count = to.platforms.length;

  const copy_count = Math.min(from_platfroms_count, to_platfroms_count);

  for (var i = 0; i < copy_count; i++) {
    copy_platform(from.platforms[i], to.platforms[i]);
  }

  // if (from_platfroms_count > to_platfroms_count) {
  // }

  // for (var i = 0; i < platfroms_count; i++) {
  //   to.platforms[i].x = from.platforms[i].x;
  //   to.platforms[i].y = from.platforms[i].y;
  // }

  // to.platforms.length = platfroms_count;
};
