import { cubic_bezier } from '../../utils.mjs';

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const process_enemy_animations = (engine, game) => {
  game.debug.enemy_animations = 0;

  for (var enemy of game.enemies) {
    for (var animation of enemy.animations) {
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

      animation.apply.call(enemy, animation, game);

      game.debug.enemy_animations++;
    }
  }
};

export const enemy_animation_sprite = /** @type {DUDOL.Entities.Animation<DUDOL.Entities.Enemy>['apply']} */ (
  function (animation) {
    this.sprite = animation.speed === 1 ? 1 : 0;
  }
);

export const enemy_animation_levitate_x = /** @type {DUDOL.Entities.Animation<DUDOL.Entities.Enemy>['apply']} */ (
  function (animation) {
    // this.x = this.base_x;
    this.x = this.base_x + cubic_bezier(animation.current / animation.duration, animation.from, animation.to);
  }
);

export const enemy_animation_levitate_y = /** @type {DUDOL.Entities.Animation<DUDOL.Entities.Enemy>['apply']} */ (
  function (animation) {
    // this.y = this.base_y;
    this.y = this.base_y + cubic_bezier(animation.current / animation.duration, animation.from, animation.to);
  }
);

export const enemy_animation_dead = /** @type {DUDOL.Entities.Animation<DUDOL.Entities.Enemy>['apply']} */ (
  function (animation) {
    const animation_perc = animation.current / animation.duration;

    this.base_y = cubic_bezier(animation_perc, animation.from, animation.to);
    // this.opacity = 1 - animation_perc;

    if (animation.speed === 0) {
      this.alive = 0;
    }
  }
);
