/**
 * @param {number} min
 * @param {number} max
 */
export const randrange = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * @param {number} t
 * @param {number} value_from
 * @param {number} value_to
 */
export function cubicBezier(t, value_from, value_to) {
  const p1 = 0;
  const p2 = 1;

  const value =
    Math.pow(1 - t, 3) * value_from +
    3 * Math.pow(1 - t, 2) * t * (value_from + p1 * (value_to - value_from)) +
    3 * (1 - t) * Math.pow(t, 2) * (value_from + p2 * (value_to - value_from)) +
    Math.pow(t, 3) * value_to;

  return value;
}
