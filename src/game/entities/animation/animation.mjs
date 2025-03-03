/**
 * @param {number} from
 * @param {number} to
 * @param {number} duration
 * @param {DUDOL.Entities.Animation<DUDOL.Entities.Platform>['apply']} apply
 * @returns {DUDOL.Entities.Animation<DUDOL.Entities.Platform>}
 */
export const create_animation = (from, to, duration, apply) => {
  return {
    from,
    to,
    cycled: true,
    speed: 1,
    duration,
    current: 0,
    apply,
  };
};
