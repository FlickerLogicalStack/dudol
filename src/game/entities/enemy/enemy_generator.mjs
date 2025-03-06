import { rand_range, with_possibility } from '../../utils.mjs';
import { create_enemy } from './enemy.mjs';

/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 */
export const generate_enemy = (engine, game) => {
  if (with_possibility(0.1)) {
    const last_enemy = game.enemies[game.enemies.length - 1];

    var new_enemies = create_enemy(
      last_enemy ? last_enemy.id + 1 : 0,
      rand_range(0, engine.canvas.width - 50),
      game.player.y + 1000
    );

    game.enemies.push(new_enemies);
  }
};
