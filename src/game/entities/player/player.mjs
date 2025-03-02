/**
 * @returns {DUDOL.Entities.Player}
 */
export const create_player = () => {
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
