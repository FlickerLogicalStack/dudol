import { create_inputs } from './inputs.mjs';

/**
 * @param {HTMLCanvasElement} canvas
 */
export const create_engine_context = canvas => {
  const __ctx = canvas.getContext('2d');

  if (!__ctx) {
    throw new Error(`No 2d context (canvas.getContext('2d'))`);
  }

  return {
    __raf: 0,
    __prev_frame_time: 0,

    canvas: {
      element: canvas,

      width: canvas.width,
      height: canvas.height,
    },

    ctx: __ctx,

    inputs: create_inputs(),
    frame: 0,
    delta: 0,
    delta_mul: 0,

    is_paused: false,
  };
};

/**
 * @template T
 * @param {() => HTMLCanvasElement} canvas
 * @param {{ create: () => T, copy: (from: T, to: T) => void }} game_state
 * @param {(engine: DUDOL.EngineContext, game: { current: T, prev: T }) => void} on_frame
 */
export const loop = (canvas, game_state, on_frame) => {
  const engine = create_engine_context(canvas());

  engine.__prev_frame_time = performance.now();

  const outer_loop =
    /**
     * @this {{ engine: DUDOL.EngineContext, game: { current: T, prev: T }, game_state: typeof game_state, on_frame: typeof on_frame }}
     * @param {number} time
     */
    function inner_loop(time) {
      this.engine.frame += 1;
      this.engine.delta = (time - this.engine.__prev_frame_time) | 0;
      this.engine.delta_mul = this.engine.delta / 1000;
      this.engine.__prev_frame_time = time | 0;

      this.engine.ctx.clearRect(0, 0, this.engine.canvas.width, this.engine.canvas.height);

      this.on_frame(this.engine, this.game);

      game_state.copy(this.game.current, this.game.prev);

      this.engine.__raf = requestAnimationFrame(time => inner_loop.call(this, time));
    }.bind({
      engine: engine,
      game: {
        current: game_state.create(),
        prev: game_state.create(),
      },
      game_state,
      on_frame,
    });

  requestAnimationFrame(outer_loop);
};
