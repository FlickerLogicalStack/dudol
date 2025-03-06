/**
 * @param {number} min
 * @param {number} max
 */
export const rand_range = (min, max) => {
  return Math.random() * (max - min) + min;
};

/**
 * @param {number} spread
 */
export const rand_spread = spread => {
  return rand_range(-spread, spread);
};

/**
 * @param {number} t
 * @param {number} value_from
 * @param {number} value_to
 */
export function cubic_bezier(t, value_from, value_to) {
  const p1 = 0;
  const p2 = 1;

  const value =
    Math.pow(1 - t, 3) * value_from +
    3 * Math.pow(1 - t, 2) * t * (value_from + p1 * (value_to - value_from)) +
    3 * (1 - t) * Math.pow(t, 2) * (value_from + p2 * (value_to - value_from)) +
    Math.pow(t, 3) * value_to;

  return value;
}

/**
 * @param {number} chance
 */
export const with_possibility = chance => {
  if (chance >= 100) {
    return true;
  }

  return Math.random() < chance / 100;
};

export const is_vectors_intersect = (() => {
  /**
   * @param {{ x: number, y: number }} p
   * @param {{ x: number, y: number }} q
   * @param {{ x: number, y: number }} r
   */
  function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (val === 0) {
      return 0;
    }

    return val > 0 ? 1 : 2;
  }

  /**
   * @param {{ x: number, y: number }} p
   * @param {{ x: number, y: number }} q
   * @param {{ x: number, y: number }} r
   */
  function onSegment(p, q, r) {
    if (
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y)
    ) {
      return true;
    }
    return false;
  }

  /**
   * @param {{ x: number, y: number }} A1
   * @param {{ x: number, y: number }} A2
   * @param {{ x: number, y: number }} B1
   * @param {{ x: number, y: number }} B2
   */
  function doIntersect(A1, A2, B1, B2) {
    const o1 = orientation(A1, A2, B1);
    const o2 = orientation(A1, A2, B2);
    const o3 = orientation(B1, B2, A1);
    const o4 = orientation(B1, B2, A2);

    if (o1 !== o2 && o3 !== o4) {
      return true;
    }

    if (o1 === 0 && onSegment(A1, B1, A2)) return true;

    if (o2 === 0 && onSegment(A1, B2, A2)) return true;

    if (o3 === 0 && onSegment(B1, A1, B2)) return true;

    if (o4 === 0 && onSegment(B1, A2, B2)) return true;

    return false;
  }

  return doIntersect;
})();

/**
 * @template T
 * @param {number} x
 * @param {number} y
 * @param {number} radius
 * @param {number[]} angles
 * @param {(x: number, y: number) => T} fn
 */
export const call_in_circle = (x, y, radius, angles, fn) => {
  return Array.from(angles, angle => {
    const angleInRadians = angle * (Math.PI / 180);

    const pointX = x + radius * Math.cos(angleInRadians);
    const pointY = y + radius * Math.sin(angleInRadians);

    return fn(pointX, pointY);
  });
};
