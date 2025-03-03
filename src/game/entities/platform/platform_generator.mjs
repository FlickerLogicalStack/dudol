import { randrange } from '../../utils.mjs';
import { create_animation } from '../animation/animation.mjs';
import { create_platform } from './platform.mjs';
import { platform_animation_opacity, platform_animation_x, platform_animation_y } from './platform_animations.mjs';

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

  if (new_platform.y < 2000) {
    new_platform.opacity = 0;
    const opacity_animation = create_animation(0, 1, 1000, platform_animation_opacity);

    opacity_animation.cycled = false;

    new_platform.animations.push(opacity_animation);
  }

  if (Math.random() > 1 - game.progress.difficulty / 100) {
    new_platform.type = 1;

    const duration = randrange(100, 2000);

    new_platform.animations.push(
      create_animation(new_platform.x, new_platform.x + randrange(-200, 200), duration, platform_animation_x),
      create_animation(new_platform.y, new_platform.y + randrange(-200, 200), duration, platform_animation_y)
    );
  }

  game.platforms.push(new_platform);
};
