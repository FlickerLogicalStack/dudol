export {};

declare global {
  export namespace DUDOL {
    export type EngineContext = ReturnType<typeof import('../engine/engine.mjs')['create_engine_context']>;
    export type GameContext = ReturnType<typeof import('../game/game_context.mjs')['create_game_context']>;
  }
}
