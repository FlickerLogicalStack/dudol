import { create_engine_context } from '../engine/engine.mjs';

export {};

declare global {
  export type InferPromise<TPromise extends Promise<any>> = TPromise extends Promise<infer T> ? T : never;

  export namespace DUDOL {
    export type Resources = InferPromise<ReturnType<typeof import('../game/resources.mjs')['load_resources']>>;

    export type EngineContext<TResurces = Resources> = ReturnType<typeof create_engine_context<TResurces>>;

    export type GameBuffer = {
      current: GameState;
      prev: GameState;
    };

    export type GameState = {
      player: DUDOL.Entities.Player;
      platforms: DUDOL.Entities.Platform[];
      particles: DUDOL.Entities.Particle[];
      camera: DUDOL.Entities.Camera;
      physics: DUDOL.Entities.Physics;
      debug: DUDOL.Entities.Debug;
      progress: DUDOL.Entities.Progress;
    };

    export namespace Entities {
      export type Player = {
        x: number;
        y: number;

        width: number;
        height: number;

        x_velocity: number;
        y_velocity: number;

        jumps_left: number;
      };

      export type Platform = {
        id: number;

        x: number;
        y: number;

        width: number;
        height: number;

        style: number;

        is_visible: boolean;
        is_in_x_borders: boolean;

        moving: number;
        moving_direction: number;
        moving_duration: number;
        moving_current: number;
        move_from_x: number;
        move_from_y: number;
        move_to_x: number;
        move_to_y: number;
      };

      export type Particle = {
        id: number;

        type: number;

        center_x: number;
        center_y: number;
        size: number;

        lifetime: number;
        lifetime_left: number;
      };

      export type Camera = {
        y: number;
        offset: number;
      };

      export type Physics = {
        gravity: number;
      };

      export type Debug = {
        enabled: number;
        platforms_collisions: number;
        platforms_renders: number;
      };

      export type Progress = {
        difficulty: number;
      };
    }
  }
}
