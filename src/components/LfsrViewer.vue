<template>
  <div class="shrinking-generator-visualizer">
    <ul class="lfsr-list">
      <li v-for="(item, index) in stateA">
        <span :class="{ 'text-bold':  polynomialA.includes(index) }">{{item}}</span>
      </li>
    </ul>
    <ul class="lfsr-list">
      <li v-for="(item, index) in stateS">
        <span :class="{ 'text-bold': polynomialS.includes(index) }">{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LfsrViewer',
  props: {
    lfsrA: {
      type: Object,
      required: true,
    },
    lfsrS: {
      type: Object,
      required: true,
    },
  },
  computed: {
    stateA() {
      return this.lfsrA.state;
    },
    stateS() {
      return this.lfsrS.state;
    },
    polynomialA() {
      return this.lfsrA.polynomial;
    },
    polynomialS() {
      return this.lfsrS.polynomial;
    },
  },
};
</script>

<style lang="scss">
.lfsr-list {
  list-style-type: none;

  li {
    display: inline-block;
  }

  .text-bold {
    font-weight: bold;
  }
}
</style>
