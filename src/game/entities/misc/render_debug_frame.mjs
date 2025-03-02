/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 */
export const render_debug_frame = (ctx, x, y, width, height) => {
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 2;

  ctx.strokeRect(x, y, width, height);
};
