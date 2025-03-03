/**
 * @template T
 * @param {number} from
 * @param {number} to
 * @param {number} duration
 * @param {DUDOL.Entities.Animation<T>['apply']} apply
 * @returns {DUDOL.Entities.Animation<T>}
 */
export const create_animation = (from, to, duration, apply) => {
  return {
    from,
    to,
    cycled: true,
    speed: from === to && duration === 0 ? 0 : 1,
    duration,
    current: 0,
    apply,
  };
};
