// #region [create_platform]

import { randrange } from './utils.mjs';

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
// #endregion

// #region [copy_platform]
// /**
//  * @param {ReturnType<typeof create_platform>} from
//  * @param {ReturnType<typeof create_platform>} to
//  */
// const copy_platform = (from, to) => {
//   to.x = from.x;
//   to.y = from.y;
//   to.width = from.width;
//   to.height = from.height;

//   to.is_visible = from.is_visible;
//   to.is_in_x_borders = from.is_in_x_borders;
// };
// #endregion

// #region [create_camera]
/**
 * @param {number} y
 */
const create_camera = y => ({
  y: y,
  offset: 450,
});
// #endregion

// #region [copy_camera]
// /**
//  * @param {ReturnType<typeof create_camera>} from
//  * @param {ReturnType<typeof create_camera>} to
//  */
// const copy_camera = (from, to) => {
//   to.y = from.y;
// };
// #endregion

// #region [create_player]
const create_player = () => {
  const x_velocity = 0.0;
  const y_velocity = 0.0;

  const width = 50.0;
  const height = 50.0;

  const x = 500.0 - width / 2;
  const y = 250;

  return {
    x_velocity,
    y_velocity,

    width,
    height,

    x,
    y,

    jumps_left: 1,
  };
};
// #endregion

// #region [copy_player]
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
};
// #endregion

/**
 * @param {DUDOL.EngineContext} engine
 */
const platforms_generator = engine => {
  return {
    is_new_platform_required:
      /**
       * @param {ReturnType<typeof create_platform>[]} platforms
       * @param {number} camera_y
       * @param {number} canvas_height
       */
      (platforms, camera_y, canvas_height) => {
        const last_platform = platforms[platforms.length - 1];

        return last_platform.y - camera_y < canvas_height;
      },

    generate_platform: /**
     * @param {ReturnType<typeof create_platform>[]} platforms
     * @param {number} difficilty
     */ (
      // @ts-expect-error
      platforms,
      difficilty
    ) => {
      const last_platform = platforms[platforms.length - 1];

      const new_platform = create_platform(
        last_platform.id + 1,
        Math.round(randrange(0, engine.canvas.width - 192)),
        Math.round(last_platform.y + 200 + difficilty + randrange(0, 200)),
        192,
        32
      );

      if (Math.random() > 1 - difficilty / 100) {
        new_platform.moving = 1;
        new_platform.moving_duration = randrange(100, 2000);
        new_platform.move_from_x = new_platform.x;
        new_platform.move_from_y = new_platform.y;

        new_platform.move_to_x = new_platform.x + randrange(-200, 200);
        new_platform.move_to_y = new_platform.y + randrange(-200, 200);
      }

      console.log(new_platform);

      platforms.push(new_platform);
    },
  };
};

/**
 * @param {DUDOL.EngineContext} engine
 */
export const create_game_context = engine => {
  const player = create_player();

  return {
    player: player,

    camera: create_camera(player.y),

    platforms: [create_platform(0, 0, 0, engine.canvas.width, 32)],

    debug: {
      enabled: 1,
      platforms_collisions: 0,
      platforms_renders: 0,
    },

    physics: {
      gravity: 1,
    },

    progress: {
      difficilty: 0,
    },

    platforms_generator: platforms_generator(engine),
  };
};

/**
 * @param {ReturnType<typeof create_game_context>} from
 * @param {ReturnType<typeof create_game_context>} to
 */
export const copy_game_context = (from, to) => {
  copy_player(from.player, to.player);
};
