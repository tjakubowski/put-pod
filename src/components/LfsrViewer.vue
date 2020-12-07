<template>
  <div>

    <div class="lfsr-list" v-for="(lfsr, name) in lfsrs" :key="name">
      <div class="d-flex justify-center">
        <v-slide-group
          class="py-3"
          show-arrows
        >
          <v-slide-item
            v-for="(item, index) in lfsr.state"
            :key="index"
          >
          <span
            :class="['lfsr-list__item', {'lfsr-list__item--polynomial': isPolynomial(lfsr.polynomial, index) }]">
            {{item}}
          </span>
          </v-slide-item>
        </v-slide-group>
      </div>

      <div class="d-flex justify-center">
        {{ polynomialString(lfsr) }} = {{ nextDigit(lfsr) }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'LfsrViewer',
  props: {
    lfsrs: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isPolynomial(polynomial, index) {
      return polynomial.includes(index + 1);
    },
    nextDigit(lfsr) {
      return lfsr.register.next();
    },
    polynomialString(lfsr) {
      const sortedPolynomial = [...lfsr.polynomial].sort((a, b) => a - b);
      return sortedPolynomial.map((index) => lfsr.state[index - 1]).join(' ^ ');
    },
  },
};
</script>

<style lang="scss">
.lfsr-list {
  padding: 8px 0 !important;

  &__item {
    display: inline-block;
    padding: 0 3px;
    margin: 0 1px;

    &--polynomial {
      position: relative;
      background-color: #eaeaea;
    }
  }
}
</style>
