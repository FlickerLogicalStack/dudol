export const create_inputs = () => {
  const inputs = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false,
    Space: false,
    // Enter: false,

    Digit1: false,
    Digit2: false,

    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,

    KeyC: false,

    KeyI: false,
    IntlBackslash: false,
  };

  window.addEventListener(
    'keydown',
    /**
     * @this {typeof inputs}
     * @param {KeyboardEvent} event
     */
    function onKeydown(event) {
      const code = event.code;

      // prettier-ignore
      if (code === 'ArrowUp') { this.ArrowUp = true}
      else
      if (code === 'ArrowRight') { this.ArrowRight = true}
      else
      if (code === 'ArrowDown') { this.ArrowDown = true}
      else
      if (code === 'ArrowLeft') { this.ArrowLeft = true}
      else
      if (code === 'Space') { this.Space = true}
      else
      // if (code === 'Enter') { this.Enter = true}
      // else
      if (code === 'Digit1') { this.Digit1 = true}
      else
      if (code === 'Digit2') { this.Digit2 = true}
      else
      if (code === 'KeyW') { this.KeyW = true}
      else
      if (code === 'KeyA') { this.KeyA = true}
      else
      if (code === 'KeyS') { this.KeyS = true}
      else
      if (code === 'KeyD') { this.KeyD = true}
      else
      if (code === 'KeyI') { this.KeyI = true}
      else
      if (code === 'KeyC') { this.KeyC = true}
      else
      if (code === 'IntlBackslash') { this.IntlBackslash = true}
    }.bind(inputs)
  );

  window.addEventListener(
    'keyup',
    /**
     * @this {typeof inputs}
     * @param {KeyboardEvent} event
     */
    function onKeydown(event) {
      const code = event.code;

      // prettier-ignore
      if (code === 'ArrowUp') { this.ArrowUp = false}
      else
      if (code === 'ArrowRight') { this.ArrowRight = false}
      else
      if (code === 'ArrowDown') { this.ArrowDown = false}
      else
      if (code === 'ArrowLeft') { this.ArrowLeft = false}
      else
      if (code === 'Space') { this.Space = false}
      else
      // if (code === 'Enter') { this.Enter = false}
      // else
      if (code === 'Digit1') { this.Digit1 = false}
      else
      if (code === 'Digit2') { this.Digit2 = false}
      else
      if (code === 'KeyW') { this.KeyW = false}
      else
      if (code === 'KeyA') { this.KeyA = false}
      else
      if (code === 'KeyS') { this.KeyS = false}
      else
      if (code === 'KeyD') { this.KeyD = false}
      else
      if (code === 'KeyI') { this.KeyI = false}
      else
      if (code === 'KeyC') { this.KeyC = false}
      else
      if (code === 'IntlBackslash') { this.IntlBackslash = false}
    }.bind(inputs)
  );

  return inputs;
};
