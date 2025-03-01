/**
 * @param {HTMLImageElement} image
 */
const await_image = image =>
  /** @type {Promise<void>} */ (
    new Promise(resolve => (image.complete ? resolve() : (image.onload = () => resolve())))
  );

export const load_resources = async () => {
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
  };
};
