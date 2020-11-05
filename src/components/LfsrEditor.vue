<template>
  <div>
    <v-text-field
      clearable
      counter
      outlined
      type="number"
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
      :label="polynomialLabel"
      v-model="polynomial"
    />
  </div>
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
  computed: {
    state: {
      set(value) {
        this.lfsr.initialState = value;
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
