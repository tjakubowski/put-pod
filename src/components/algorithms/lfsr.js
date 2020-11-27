export default class LFSR {
  #initialState;

  #state;

  #polynomial;

  constructor(initialState, polynomial) {
    this.initialState = initialState;
    this.polynomial = polynomial;
  }

  set initialState(state) {
    const newState = this.normalizeState(state);

    if (!this.isStateValid(newState)) return;

    this.#initialState = newState;
    this.#state = [...newState];
  }

  get initialState() {
    return this.#initialState;
  }

  set state(state) {
    const newState = this.normalizeState(state);

    if (!this.isStateValid(state)) return;

    this.#state = [...newState];
  }

  get state() {
    return this.#state;
  }

  set polynomial(polynomial) {
    const newPolynomial = this.normalizePolynomial(polynomial);

    if (!this.isPolynomialValid(newPolynomial)) return;

    this.#polynomial = newPolynomial;
  }

  get polynomial() {
    return this.#polynomial;
  }

  isStateValid = (state) => [...state].every((digit) => [0, 1].includes(digit));

  isPolynomialValid = (polynomial) => {
    const maxPolynomial = this.getMaxPolynomial();
    return polynomial.length > 0 && polynomial.every((number) => number <= maxPolynomial);
  }

  normalizeState = (state) => [...state].map((char) => +char);

  normalizePolynomial = (polynomial) => [...new Set(polynomial.map((char) => +char))];

  getMaxPolynomial = () => this.#state.length - 1;

  next = () => this.polynomial.reduce((previous, current) => {
    const previousBit = this.state[previous];
    const nextBit = this.state[current];

    return previousBit ^ nextBit;
  })

  tick = () => {
    const input = this.next();
    const output = this.#state.pop();

    this.#state.unshift(input);
    return output;
  }

  reset = () => {
    this.initialState = [...this.#initialState];
  }
}
