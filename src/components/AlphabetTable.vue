<template>
  <div class="alphabet-table">
    <table v-cloak>
      <tr>
        <th>
          <v-btn x-small icon
                 :disabled="alphabetMatrixSize >= maxAlphabetMatrixSize"
                 @click="$emit('increase')">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn x-small icon
                 :disabled="alphabetMatrixSize <= minAlphabetMatrixSize"
                 @click="$emit('decrease')">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </th>
        <th
            v-for="y in alphabetMatrixSize" :key="`top-${y}`">
          {{ y }}
        </th>
      </tr>
      <tr v-for="y in alphabetMatrixSize" :key="`left-${y}`">
        <th>
          {{ y }}
        </th>
        <td v-for="x in alphabetMatrixSize" :key="`value-${x}`">
          <label>
            <input type="text"
                   maxlength="1"
                   :class="cellClasses({x, y})"
                   :data-index="getCellIndex({x,y})"
                   :value="alphabet[getCellIndex({x,y})]"
                   @input="onInput($event, {x, y})"
            >
            <span class="caption">{{ y }}{{ x }}</span>
          </label>
        </td>
      </tr>
    </table>
    <base-error class="px-2 mt-1" :is-valid="isValid">Alphabet characters are missing</base-error>
  </div>
</template>

<script>
import BaseError from '@/components/BaseError';

export default {
  name: 'AlphabetTable',
  components: { BaseError },
  model: {
    prop: 'alphabet',
  },
  props: {
    alphabet: {
      type: Array,
      required: true,
    },
    maxAlphabetMatrixSize: {
      type: Number,
      default: 6,
    },
    minAlphabetMatrixSize: {
      type: Number,
      default: 2,
    },
    isValid: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    alphabetMatrixSize() {
      return Math.sqrt(this.alphabet.length);
    },
  },
  methods: {
    onInput(event, position) {
      const index = this.getCellIndex(position);

      if (!this.alphabet.includes(event.target.value) && event.target.value.length !== 0 )
      {
        const nextInput = document.querySelector(
          `.alphabet-table__input[data-index='${index + 1}']`,
        );
        if (nextInput) nextInput.focus();

        this.$set(this.alphabet, index, event.target.value);
        this.emitValue();
      } else event.target.value = '';
    },
    getCellIndex({ x, y }) {
      return (y - 1) * this.alphabetMatrixSize + x - 1;
    },
    cellClasses(position) {
      const cellIndex = this.getCellIndex(position);
      const cell = this.alphabet[cellIndex];
      const tempArray = [...this.alphabet];
      tempArray.splice(cellIndex, 1);
      return {
        'alphabet-table__input': true,
        'alphabet-table__input--error': cell.length === 0 || tempArray.includes(cell),
      };
    },
    emitValue() {
      this.$emit('input', this.alphabet);
    },
  },
};
</script>

<style lang="scss">
.alphabet-table {
  padding: 8px;

  table {
    width: 100%;
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
