import { rand_spread } from '../../utils.mjs';
import { create_animation } from '../animation/animation.mjs';
import { enemy_animation_levitate_x, enemy_animation_levitate_y, enemy_animation_sprite } from './enemy_animation.mjs';

/**
 * @param {number} id
 * @param {number} x
 * @param {number} y
 * @returns {DUDOL.Entities.Enemy}
 */
export const create_enemy = (id, x, y) => ({
  id,

  base_x: x,
  base_y: y,

  x,
  y,

  width: 50.0,
  height: 50.0,

  alive: 1,
  is_dying: 0,

  is_visible: true,
  opacity: 1.0,

  sprite: 0,

  animations: [
    create_animation(0, 0, 64, enemy_animation_sprite),
    create_animation(-10 + rand_spread(5), 10 + rand_spread(5), 500 + rand_spread(100), enemy_animation_levitate_x),
    create_animation(-10, 10, 500 + rand_spread(100), enemy_animation_levitate_y),
  ],
});

/**
 * @param {DUDOL.Entities.Enemy} from
 * @param {DUDOL.Entities.Enemy} to
 */
export const copy_enemy = (from, to) => {
  to.x = from.x;
  to.y = from.y;
};

/**
 * @param {DUDOL.Entities.Enemy} platform
 */
export const clone_enemy = platform => {
  const new_platform = create_enemy(platform.id, platform.x, platform.y);

  return new_platform;
};

/**
 * @param {DUDOL.Entities.Enemy[]} from
 * @param {DUDOL.Entities.Enemy[]} to
 */
export const copy_enemies = (from, to) => {
  const from_enemies_count = from.length;
  const to_enemies_count = to.length;

  const copy_count = Math.min(from_enemies_count, to_enemies_count);

  for (var i = 0; i < copy_count; i++) {
    copy_enemy(from[i], to[i]);
  }

  if (from_enemies_count !== to_enemies_count) {
    if (to_enemies_count > from_enemies_count) {
      to.length = from_enemies_count;
    } else {
      for (let i = to_enemies_count; i < from_enemies_count; i++) {
        const platform_for_copy = from[i];

        const clone = clone_enemy(platform_for_copy);

        to.push(clone);
      }
    }
  }
};
