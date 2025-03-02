import { create_inputs } from './inputs.mjs';

/**
 * @template TResources
 * @param {HTMLCanvasElement} canvas
 * @param {TResources} resources
 */
export const create_engine_context = (canvas, resources) => {
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

    resources,
  };
};

/**
 * @template TGameState
 * @template TResources
 * @param {() => HTMLCanvasElement} canvas
 * @param {() => Promise<TResources>} load_resources
 * @param {{ create: (engine: DUDOL.EngineContext<TResources>) => TGameState, copy: (from: TGameState, to: TGameState) => void }} game_state
 * @param {(engine: DUDOL.EngineContext<TResources>, game: { current: TGameState, prev: TGameState }) => void} on_frame
 */
export const loop = async (canvas, load_resources, game_state, on_frame) => {
  const __canvas = canvas();

  const engine = create_engine_context(__canvas, await load_resources());

  engine.__prev_frame_time = performance.now();

  window.addEventListener('resize', () => {
    const width = __canvas.clientWidth;
    const height = __canvas.clientHeight;

    __canvas.width = width;
    __canvas.height = height;

    engine.canvas.width = width;
    engine.canvas.height = height;
  });

  window.dispatchEvent(new Event('resize'));

  const loop_context = {
    engine,
    game: {
      current: game_state.create(engine),
      prev: game_state.create(engine),
    },
    game_state,
    on_frame,
  };

  const outer_loop =
    /**
     * @this {{ engine: DUDOL.EngineContext<TResources>, game: { current: TGameState, prev: TGameState }, game_state: typeof game_state, on_frame: typeof on_frame }}
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
    }.bind(loop_context);

  // @ts-expect-error
  window.__ENGINE__ = { engine, game: loop_context.game.current };

  requestAnimationFrame(outer_loop);
};
