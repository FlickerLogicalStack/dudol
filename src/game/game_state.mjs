import { create_camera } from './entities/camera/camera.mjs';
import { create_debug } from './entities/debug/debug.mjs';
import { create_physics } from './entities/physics/physics.mjs';
import { create_platform } from './entities/platform/platform.mjs';
import { copy_player, create_player } from './entities/player/player.mjs';
import { create_progress } from './entities/progress/progress.mjs';

/**
 * @param {DUDOL.EngineContext} engine
 * @returns {DUDOL.GameState}
 */
export const create_game_state = engine => {
  const player = create_player();
  const camera = create_camera(player.y);
  const physics = create_physics();
  const debug = create_debug();
  const progress = create_progress();

  return {
    player: player,
    platforms: [create_platform(0, 0, 0, engine.canvas.width)],
    camera: camera,
    physics: physics,
    debug: debug,
    progress: progress,
  };
};

/**
 * @param {DUDOL.GameState} from
 * @param {DUDOL.GameState} to
 */
export const copy_game_state = (from, to) => {
  copy_player(from.player, to.player);
};
