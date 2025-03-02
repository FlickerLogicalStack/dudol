/**
 * @returns {DUDOL.Entities.Progress}
 */
export const create_progress = () => ({
  difficulty: 1,
});

/**
 * @param {DUDOL.Entities.Progress} from
 * @param {DUDOL.Entities.Progress} to
 */
export const copy_progress = (from, to) => {
  to.difficulty = from.difficulty;
};
