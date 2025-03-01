export const create_game_context = () => {
  const player_x_velocity = 0.0;
  const player_y_velocity = 0.0;

  const player_width = 100.0;
  const player_height = 100.0;

  const player_x = 500.0 - player_width / 2;
  const player_y = 500.0 - player_height / 2;

  const player_is_in_jump = 0;

  const platforms = [
    {
      x: 400,
      y: 200,
      width: 200,
      height: 100,
    },
    {
      x: 200,
      y: 400,
      width: 200,
      height: 1,
    },
    {
      x: 600,
      y: 600,
      width: 200,
      height: 10,
    },
  ];

  return {
    player_x_velocity,
    player_y_velocity,

    player_width,
    player_height,

    player_x,
    player_y,

    player_is_in_jump,

    platforms,
  };
};
