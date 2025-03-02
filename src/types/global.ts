import { create_engine_context } from '../engine/engine.mjs';

export {};

declare global {
  export namespace DUDOL {
    export type Resources = Awaited<ReturnType<typeof import('../game/resources.mjs')['load_resources']>>;

    export type EngineContext<TResurces = Resources> = ReturnType<typeof create_engine_context<TResurces>>;

    export type GameState = ReturnType<typeof import('../game/game_context.mjs')['create_game_context']>;
    export type GameContext = {
      current: GameState;
      prev: GameState;
    };
  }
}
