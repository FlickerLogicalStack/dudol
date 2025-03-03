/**
 * @returns {DUDOL.Entities.Debug}
 */
export const create_debug = () => ({
  enabled: 0,
  platforms_collisions: 0,
  platforms_renders: 0,

  platform_animations: 0,
  enemy_animations: 0,
});

/**
 * @param {DUDOL.Entities.Debug} from
 * @param {DUDOL.Entities.Debug} to
 */
export const copy_debug = (from, to) => {
  to.enabled = from.enabled;
  to.platforms_collisions = from.platforms_collisions;
  to.platforms_renders = from.platforms_renders;
};
