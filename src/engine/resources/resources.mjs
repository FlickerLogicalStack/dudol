import { BACKGROUND as BACKGROUND_B64, FONT as FONT_B64, SPRITE_2_B64 } from './resources_base64.mjs';

/**
 * @param {number} x
 * @param {number} y
 * @param {number} size
 */
const sprite_sq = (x, y, size) => ({ x, y, size });

/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
const sprite_req = (x, y, w, h) => ({ x, y, w, h });

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
  return [sprite_sq(left_x, left_y, 8), sprite_sq(center_x, center_y, 8), sprite_sq(right_x, right_y, 8)];
};

export const load_resources = async () => {
  var x = 0;
  var y = 0;

  const font = new Image(256, 64);
  // const font = new Image(576, 128);
  font.src = FONT_B64;

  const sprites = new Image(133, 88);
  sprites.src = SPRITE_2_B64;

  const background = new Image(1024, 1024);
  background.src = BACKGROUND_B64;

  Promise.all([await_image(font), await_image(sprites), await_image(background)]);

  return {
    font,
    sprites,
    background,

    map: {
      platforms: [
        ((x = 27), (y = 27), platform_sprites(x, y, x + 9, y, x + 18, y)),
        ((x = 90), (y = 27), platform_sprites(x, y, x + 9, y, x + 18, y)),
        ((x = 27), (y = 18), platform_sprites(x, y, x + 9, y, x + 18, y)),
      ],
      particles: [
        //
        sprite_sq(72, 54, 8),
        sprite_sq(81, 54, 8),
        sprite_sq(45, 63, 8),
        sprite_sq(54, 63, 8),
      ],
      enemies: [
        //
        sprite_sq(63, 63, 8),
        sprite_sq(72, 63, 8),
      ],
      font:
        ((x = 128),
        /** @type {Record<string, { x: number, y: number, size: number }>} */ ({
          0: sprite_sq(x, 20, 8),
          1: sprite_sq((x += 8), 20, 8),
          2: sprite_sq((x += 8), 20, 8),
          3: sprite_sq((x += 8), 20, 8),
          4: sprite_sq((x += 8), 20, 8),
          5: sprite_sq((x += 8), 20, 8),
          6: sprite_sq((x += 8), 20, 8),
          7: sprite_sq((x += 8), 20, 8),
          8: sprite_sq((x += 8), 20, 8),
          9: sprite_sq((x += 8), 20, 8),
        })),
    },
  };
};
