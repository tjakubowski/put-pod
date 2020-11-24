export default class LFSR {
  #initialState;

  #state;

  #polynomial;

  constructor(initialState, polynomial) {
    this.initialState = initialState;
    this.polynomial = polynomial;
  }

  set initialState(value) {
    const newState = [...value].map((char) => +char);

    if (newState.some((digit) => ![0, 1].includes(digit))) return;

    this.#initialState = newState;
    this.#state = [...newState];
  }

  get initialState() {
    return this.#initialState;
  }

  get state() {
    return this.#state;
  }

  set polynomial(value) {
    const newPolynomial = [...new Set(value.map((char) => +char))];
    const maxPolynomial = this.getMaxPolynomial();

    if (
      newPolynomial.length === 0
      || newPolynomial.some((number) => number > maxPolynomial)
    ) return;

    this.#polynomial = newPolynomial;
  }

  get polynomial() {
    return this.#polynomial;
  }

  getMaxPolynomial = () => this.state.length - 1;

  next = () => {
    const input = this.polynomial.reduce((previous, current) => {

      const previousBit = this.state[previous];
      const nextBit = this.state[current];

      return previousBit ^ nextBit;
    });
    const output = this.#state.pop();

    this.#state.unshift(input);
    return output;
  }

  reset = () => {
    this.initialState = [...this.#initialState];
  }
}
