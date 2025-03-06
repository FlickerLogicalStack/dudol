import { create_engine_context } from '../engine/engine.mjs';

export {};

declare global {
  export type InferPromise<TPromise extends Promise<any>> = TPromise extends Promise<infer T> ? T : never;

  export namespace DUDOL {
    export type Resources = InferPromise<ReturnType<typeof import('../engine/resources/resources.mjs')['load_resources']>>;

    export type EngineContext<TResurces = Resources> = ReturnType<typeof create_engine_context<TResurces>>;

    export type GameBuffer = {
      current: GameState;
      prev: GameState;
    };

    export type GameState = {
      player: DUDOL.Entities.Player;

      platforms: DUDOL.Entities.Platform[];
      particles: DUDOL.Entities.Particle[];
      enemies: DUDOL.Entities.Enemy[];

      camera: DUDOL.Entities.Camera;
      physics: DUDOL.Entities.Physics;
      debug: DUDOL.Entities.Debug;
      progress: DUDOL.Entities.Progress;

      platforms_generator_enabled: number;
      enemies_generator_enabled: number;
    };

    export type Point2 = { x: number; y: number };

    export type Vector2 = { _1: Point2; _2: Point2 };

    export namespace Entities {
      export type Animation<T> = {
        from: number;
        to: number;

        cycled: boolean;
        speed: number;

        duration: number;
        current: number;

        apply: (this: T, animation: DUDOL.Entities.Animation<T>, game: DUDOL.GameState) => void;
      };

      export type Player = {
        x: number;
        y: number;

        width: number;
        height: number;

        x_velocity: number;
        y_velocity: number;

        jumps_left: number;

        staying_on_platform: number;

        constant: {
          default_x: number;
          default_y: number;

          max_jumps: number;

          jump_velocity_y: number;
          bounce_velocity_y: number;
        };
      };

      export type Platform = {
        id: number;

        x: number;
        y: number;

        width: number;
        height: number;

        moving: number;
        once: number;

        is_in_x_borders: boolean;

        is_visible: boolean;
        opacity: number;

        animations: Animation<Platform>[];
      };

      export type Enemy = {
        id: number;

        base_x: number;
        base_y: number;

        x: number;
        y: number;

        width: number;
        height: number;

        alive: number;
        is_dying: number;

        is_visible: boolean;
        opacity: number;

        sprite: number;

        animations: Animation<Enemy>[];
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

        platform_animations: number;
        enemy_animations: number;
      };

      export type Progress = {
        difficulty: number;
      };
    }
  }
}
