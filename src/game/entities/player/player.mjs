/**
 * @param {DUDOL.EngineContext} engine
 * @returns {DUDOL.Entities.Player}
 */
export const create_player = engine => {
  const x_velocity = 0.0;
  const y_velocity = 0.0;

  const width = 50.0;
  const height = 50.0;

  const default_x = engine.canvas.width / 2 - width / 2;
  const default_y = 32;

  const max_jumps = 1;
  const jump_velocity_y = 20;
  const bounce_velocity_y = 20;

  return {
    x_velocity,
    y_velocity,

    width,
    height,

    x: default_x,
    y: default_y,

    jumps_left: max_jumps,

    staying_on_platform: 0,

    constant: {
      default_x,
      default_y,

      max_jumps,

      jump_velocity_y,
      bounce_velocity_y,
    },
  };
};

/**
 * @param {DUDOL.Entities.Player} from
 * @param {DUDOL.Entities.Player} to
 */
export const copy_player = (from, to) => {
  to.x = from.x;
  to.y = from.y;

  to.width = from.width;
  to.height = from.height;

  to.x_velocity = from.x_velocity;
  to.y_velocity = from.y_velocity;
};
