<template>
<div class="encryption-table">
  <table>
    <tr>
      <th v-for="{letter, value} in encryptionKey">
        <div v-html="getLetterOrWhitespace(letter)"></div>
        <span class="caption">{{ value }}</span>
      </th>
    </tr>
    <tr v-for="group in text">
      <td v-for="{letter, value} in group">
        <div v-html="getLetterOrWhitespace(letter)"></div>
        <span class="caption">{{ value }}</span>
      </td>
    </tr>
  </table>
</div>
</template>

<script>
export default {
  name: 'EncryptionTable',
  props: {
    encryptionKey: {
      type: Array,
      required: true,
    },
    text: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getLetterOrWhitespace(letter) {
      return letter === ' ' ? '&nbsp;' : letter;
    },
  }
};
</script>

<style lang="scss">

.encryption-table {
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
}
</style>
