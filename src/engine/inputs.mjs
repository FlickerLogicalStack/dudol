export const create_inputs = () => {
  const inputs = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
    Space: false,
    KeyP: false,
  };

  window.addEventListener(
    'keydown',
    /**
     * @this {typeof inputs}
     * @param {KeyboardEvent} event
     */
    function onKeydown(event) {
      if (event.code === 'ArrowUp') {
        this.ArrowUp = true;
      } else if (event.code === 'ArrowRight') {
        this.ArrowRight = true;
      } else if (event.code === 'ArrowDown') {
        this.ArrowDown = true;
      } else if (event.code === 'ArrowLeft') {
        this.ArrowLeft = true;
      } else if (event.code === 'Space') {
        this.Space = true;
      } else if (event.code === 'KeyP') {
        this.KeyP = true;
      }
    }.bind(inputs)
  );

  window.addEventListener(
    'keyup',
    /**
     * @this {typeof inputs}
     * @param {KeyboardEvent} event
     */
    function onKeydown(event) {
      if (event.code === 'ArrowUp') {
        this.ArrowUp = false;
      } else if (event.code === 'ArrowRight') {
        this.ArrowRight = false;
      } else if (event.code === 'ArrowDown') {
        this.ArrowDown = false;
      } else if (event.code === 'ArrowLeft') {
        this.ArrowLeft = false;
      } else if (event.code === 'Space') {
        this.Space = false;
      } else if (event.code === 'KeyP') {
        this.KeyP = false;
      }
    }.bind(inputs)
  );

  return inputs;
};
