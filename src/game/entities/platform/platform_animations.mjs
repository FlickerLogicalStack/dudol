import { cubic_bezier } from '../../utils.mjs';

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const process_platform_animations = (engine, game) => {
  game.debug.platform_animations = 0;

  for (var platform of game.platforms) {
    for (var animation of platform.animations) {
      if (animation.speed === 0) {
        continue;
      }

      animation.current += engine.delta * animation.speed;

      if (animation.current > animation.duration) {
        animation.current = animation.duration;

        if (animation.cycled === true) {
          animation.speed = -animation.speed;
        } else {
          animation.speed = 0;
        }
      } else if (animation.current < 0) {
        animation.current = 0;

        if (animation.cycled === true) {
          animation.speed = -animation.speed;
        } else {
          animation.speed = 0;
        }
      }

      animation.apply.call(platform, animation, game);

      game.debug.platform_animations++;
    }
  }
};

export const platform_animation_x = /** @type {DUDOL.Entities.Animation<DUDOL.Entities.Platform>['apply']} */ (
  function (animation) {
    this.x = cubic_bezier(animation.current / animation.duration, animation.from, animation.to);
  }
);

export const platform_animation_y = /** @type {DUDOL.Entities.Animation<DUDOL.Entities.Platform>['apply']} */ (
  function (animation) {
    this.y = cubic_bezier(animation.current / animation.duration, animation.from, animation.to);
  }
);

export const platform_animation_opacity = /** @type {DUDOL.Entities.Animation<DUDOL.Entities.Platform>['apply']} */ (
  function (animation) {
    this.opacity = cubic_bezier(animation.current / animation.duration, animation.from, animation.to);
  }
);
