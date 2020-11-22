<template>
  <v-form ref="form">
    <v-text-field
      clearable
      dense
      counter
      outlined
      type="number"
      :rules="stateRules"
      :label="stateLabel"
      v-model="state"
      @input="$emit('input')"
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
      @input="$emit('input')"
    />
  </v-form>
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
        this.$refs.form.validate();
      },
      get() {
        return this.register.state.join('');
      },
    },
    polynomial: {
      set(value) {
        this.register.polynomial = value;
      },
      get() {
        return this.register.polynomial.map((digit) => `${digit}`);
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
