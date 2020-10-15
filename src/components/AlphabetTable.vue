<template>
  <div class="alphabet-table">
    <table v-cloak>
      <tr>
        <th></th>
        <th
            v-for="y in size" :key="`top-${y}`">
          {{ y }}
        </th>
      </tr>
      <tr v-for="y in size" :key="`left-${y}`">
        <th>
          {{ y }}
        </th>
        <td v-for="x in size" :key="`value-${x}`">
          <label>
            <input type="text" :class="cellClasses({x, y})" maxlength="1" v-model="alphabet[getCellIndex({x,y})]" >
            <span class="caption">{{ y }}{{ x }}</span>
          </label>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AlphabetTable',
  props: {
    size: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      alphabet: [],
    };
  },
  computed: {
    alphabetOccurences() {
      return this.alphabet.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    },
  },
  methods: {
    getCellIndex({x, y}) {
      return (y - 1) * this.size + x - 1;
    },
    cellClasses(position) {
      const cell = this.alphabet[this.getCellIndex(position)];
      return {
        'alphabet-table__input': true,
        'alphabet-table__input--error': cell.length === 0 || this.alphabetOccurences[cell] > 1,
      };
    },
  },
  created() {
    this.alphabet = Array.from({ length: this.size * this.size }, () => '');
    this.$emit('input', this.alphabet);
  },
};
</script>

<style lang="scss">

.alphabet-table {
  width: 100%;
  padding: 8px;

  table {
    border-collapse: collapse;
  }

  td, th {
    padding: 8px 16px;
    text-align: center;
  }

  td {
    border: 1px solid #f3f3f3;
  }

  &__input {
    width: 100%;
    display: block;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.06);
    border-radius: 4px;
    border: 1px solid transparent;

    &--error {
      border-color: var(--v-error-base);
    }
  }

}

</style>
