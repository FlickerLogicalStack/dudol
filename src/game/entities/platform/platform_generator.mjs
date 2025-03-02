import { randrange } from '../../utils.mjs';
import { create_platform } from './platform.mjs';

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const is_new_platform_required = (engine, game) => {
  const last_platform = game.platforms[game.platforms.length - 1];

  return last_platform.y - game.camera.y < engine.canvas.height;
};

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const generate_platform = (engine, game) => {
  const last_platform = game.platforms[game.platforms.length - 1];

  const new_platform = create_platform(
    last_platform.id + 1,
    Math.round(randrange(0, engine.canvas.width - 192)),
    Math.round(last_platform.y + 200 + game.progress.difficulty + randrange(0, 200)),
    192
  );

  if (Math.random() > 1 - game.progress.difficulty / 100) {
    new_platform.moving = 1;
    new_platform.moving_duration = randrange(100, 2000);
    new_platform.move_from_x = new_platform.x;
    new_platform.move_from_y = new_platform.y;

    new_platform.move_to_x = new_platform.x + randrange(-200, 200);
    new_platform.move_to_y = new_platform.y + randrange(-200, 200);
  }

  console.log(new_platform);

  game.platforms.push(new_platform);
};
