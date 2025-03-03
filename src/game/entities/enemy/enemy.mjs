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
