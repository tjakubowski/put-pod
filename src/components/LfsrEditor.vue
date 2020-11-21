<template>
  <v-form ref="form">
    <v-text-field
      clearable
      counter
      outlined
      type="number"
      :rules="stateRules"
      :label="stateLabel"
      v-model="state"
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
    />
  </v-form>
</template>

<script>
import LFSR from '@/components/algorithms/lfsr';

export default {
  name: 'LfsrEditor',
  props: {
    lfsr: {
      type: LFSR,
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
        (v) => {
          const maxPolynomial = this.lfsr.getMaxPolynomial();
          return v.every((char) => +char <= maxPolynomial)
          || `Max polynomial degree is ${maxPolynomial}`;
        },
      ],
      stateRules: [
        (v) => [...v].every((char) => [0, 1].includes(+char)) || 'State must be a binary string',
      ],
    };
  },
  computed: {
    state: {
      set(value) {
        this.lfsr.initialState = value;
        this.$refs.form.validate();
      },
      get() {
        return this.lfsr.state.join('');
      },
    },
    polynomial: {
      set(value) {
        this.lfsr.polynomial = value;
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
};
</script>
