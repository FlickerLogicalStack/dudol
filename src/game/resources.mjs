/**
 * @param {HTMLImageElement} image
 */
const await_image = image =>
  /** @type {Promise<void>} */ (
    new Promise(resolve => (image.complete ? resolve() : (image.onload = () => resolve())))
  );

/**
 * @param {number} left_x
 * @param {number} left_y
 * @param {number} center_x
 * @param {number} center_y
 * @param {number} right_x
 * @param {number} right_y
 */
const platform_sprites = (left_x, left_y, center_x, center_y, right_x, right_y) => {
  return [
    { x: left_x, y: left_y, size: 16 },
    { x: center_x, y: center_y, size: 16 },
    { x: right_x, y: right_y, size: 16 },
  ];
};

export const load_resources = async () => {
  var x = 0;
  var y = 0;
  // const sprites1 = new Image(918, 203);
  // sprites1.src = '/src/resources/sprites1.png';

  // const sprites2 = new Image(133, 88);
  // sprites2.src = '/src/resources/sprites2.png';

  const sprites3 = new Image(338, 338);
  sprites3.src = '/src/resources/sprites3.png';

  Promise.all([/* await_image(sprites1), */ /* await_image(sprites2), */ await_image(sprites3)]);

  return {
    // sprites1,
    // sprites2,
    sprites3,

    map: {
      platforms: [
        // ((x = 68), (y = 51), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        // ((x = 68), (y = 68), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        // ((x = 68), (y = 85), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        // ((x = 68), (y = 102), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        // ((x = 68), (y = 119), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        ((x = 170), (y = 272), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        // ((x = 119), (y = 119), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        ((x = 170), (y = 136), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        ((x = 255), (y = 272), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        // ((x = 170), (y = 272), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
        // ((x = 119), (y = 199), platform_sprites(x, y, x + (16 + 1) * 1, y, x + (16 + 1) * 2, y)),
      ],
    },
  };
};
