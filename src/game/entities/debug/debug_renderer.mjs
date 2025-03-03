/**
 * @param {DUDOL.EngineContext} engine
 * @param {DUDOL.GameState} game
 *
 */
export const render_debug = (engine, game) => {
  const SIZE = 16;

  const inputs = Object.entries(engine.inputs)
    .filter(entry => entry[1] === true)
    .map(entry => entry[0])
    .join(', ');

  engine.ctx.fillStyle = 'green';
  engine.ctx.font = `${SIZE}px monospace`;

  let _i = SIZE;
  engine.ctx.fillText(`Frame: ${engine.frame}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`FPS: ${Math.floor(1000 / engine.delta)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`Paused: ${engine.is_paused}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`player.x: ${game.player.x.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.x_velocity: ${game.player.x_velocity.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.y: ${game.player.y.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.y_velocity: ${game.player.y_velocity.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.jumps_left: ${game.player.jumps_left}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`player.staying_on_platform: ${game.player.staying_on_platform}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`inputs: ${inputs}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`physics.gravity: ${game.physics.gravity}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`progress.difficilty: ${game.progress.difficulty}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`camera.y: ${game.camera.y.toFixed(2)}`, SIZE, ((_i += SIZE), _i));
  _i += SIZE;
  engine.ctx.fillText(`debug.platforms: ${game.platforms.length}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`debug.particles: ${game.particles.length}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`debug.platforms_collisions: ${game.debug.platforms_collisions}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`debug.platforms_renders: ${game.debug.platforms_renders}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`debug.platform_animations: ${game.debug.platform_animations}`, SIZE, ((_i += SIZE), _i));
  engine.ctx.fillText(`debug.enemy_animations: ${game.debug.enemy_animations}`, SIZE, ((_i += SIZE), _i));
};
