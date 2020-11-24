<template>
  <div>
    <v-text-field
      clearable
      dense
      counter
      outlined
      type="number"
      :rules="stateRules"
      :label="stateLabel"
      v-model="state"
      @input="onInput"
    />
    <v-combobox
      multiple
      counter
      outlined
      small-chips
      type="number"
      :append-icon="null"
      :rules="polynomialRules"
      :label="polynomialLabel"
      v-model="polynomial"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  name: 'LfsrEditor',
  props: {
    lfsr: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      polynomialRules: [
        (v) => v.length > 0 || 'Polynomial is required',
        (v) => {
          const maxPolynomial = this.register.getMaxPolynomial();
          return v.every((char) => +char <= maxPolynomial)
          || `Max polynomial degree is ${maxPolynomial}`;
        },
      ],
      stateRules: [
        (v) => v.length > 0 || 'State cannot be empty',
        (v) => [...v].every((char) => [0, 1].includes(+char)) || 'State must be a binary string',
      ],
    };
  },
  computed: {
    register() {
      return this.lfsr.register;
    },
    state: {
      set(value) {
        this.register.initialState = value;
      },
      get() {
        return this.lfsr.initialState.join('');
      },
    },
    polynomial: {
      set(value) {
        this.register.polynomial = value;
      },
      get() {
        return this.lfsr.polynomial.map((digit) => `${digit}`);
      },
    },
    stateLabel() {
      return `${this.name} state`;
    },
    polynomialLabel() {
      return `${this.name} polynomial`;
    },
  },
  methods: {
    onInput() {
      this.$emit('input', { state: this.state, polynomial: this.polynomial });
    },
  },
};
</script>
