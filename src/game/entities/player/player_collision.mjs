import { is_vectors_intersect } from '../../utils.mjs';
import { point2 } from '../misc/point2.mjs';

/**
 * @param {DUDOL.GameBuffer} game_buffer
 * @param {number} platform_index
 */
export const is_player_bounce_on_platform = (game_buffer, platform_index) => {
  var player = game_buffer.current.player;
  var prev_player = game_buffer.prev.player;

  var platform = game_buffer.current.platforms[platform_index];
  var prev_platform = game_buffer.prev.platforms[platform_index];

  var A = point2(prev_player.x, prev_player.y);

  var B = point2(prev_player.x + prev_player.width, prev_player.y);

  var D = point2(player.x, player.y);
  var C = point2(player.x + player.width, player.y);

  var Y = point2(prev_platform.x, prev_platform.y + prev_platform.height);
  var W = point2(prev_platform.x + prev_platform.width, prev_platform.y + prev_platform.height);

  var Z = point2(platform.x, platform.y + platform.height);
  var X = point2(platform.x + platform.width, platform.y + platform.height);

  var current_intersection =
    is_vectors_intersect(A, D, Z, X) ||
    is_vectors_intersect(B, C, Y, W) ||
    is_vectors_intersect(A, B, Y, W) ||
    is_vectors_intersect(D, C, W, X) ||
    is_vectors_intersect(A, B, Z, X) ||
    is_vectors_intersect(A, B, Y, Z) ||
    is_vectors_intersect(A, B, W, X) ||
    is_vectors_intersect(D, C, Y, W) ||
    is_vectors_intersect(D, C, Z, X) ||
    is_vectors_intersect(D, C, Y, Z) ||
    is_vectors_intersect(A, D, Y, W) ||
    is_vectors_intersect(A, D, Y, Z) ||
    is_vectors_intersect(A, D, W, X) ||
    is_vectors_intersect(B, C, Z, X) ||
    is_vectors_intersect(B, C, Y, Z) ||
    is_vectors_intersect(B, C, W, X);

  return current_intersection;
};

/**
 * @param {DUDOL.GameBuffer} game_buffer
 * @param {number} enemy_index
 */
export const is_player_bounce_on_enemy = (game_buffer, enemy_index) => {
  var player = game_buffer.current.player;
  var prev_player = game_buffer.prev.player;

  var enemy = game_buffer.current.enemies[enemy_index];
  var prev_enemy = game_buffer.prev.enemies[enemy_index];

  var A = point2(prev_player.x, prev_player.y);

  var B = point2(prev_player.x + prev_player.width, prev_player.y);

  var D = point2(player.x, player.y);
  var C = point2(player.x + player.width, player.y);

  var Y = point2(prev_enemy.x, prev_enemy.y + prev_enemy.height);
  var W = point2(prev_enemy.x + prev_enemy.width, prev_enemy.y + prev_enemy.height);

  var Z = point2(enemy.x, enemy.y + enemy.height);
  var X = point2(enemy.x + enemy.width, enemy.y + enemy.height);

  var current_intersection =
    is_vectors_intersect(A, D, Z, X) ||
    is_vectors_intersect(B, C, Y, W) ||
    is_vectors_intersect(A, B, Y, W) ||
    is_vectors_intersect(D, C, W, X) ||
    is_vectors_intersect(A, B, Z, X) ||
    is_vectors_intersect(A, B, Y, Z) ||
    is_vectors_intersect(A, B, W, X) ||
    is_vectors_intersect(D, C, Y, W) ||
    is_vectors_intersect(D, C, Z, X) ||
    is_vectors_intersect(D, C, Y, Z) ||
    is_vectors_intersect(A, D, Y, W) ||
    is_vectors_intersect(A, D, Y, Z) ||
    is_vectors_intersect(A, D, W, X) ||
    is_vectors_intersect(B, C, Z, X) ||
    is_vectors_intersect(B, C, Y, Z) ||
    is_vectors_intersect(B, C, W, X);

  return current_intersection;
};
