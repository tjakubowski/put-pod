<template>
  <v-form @submit.prevent="onSubmit">
    <v-textarea filled label="Plaintext" v-model="plaintext"/>
    <v-file-input filled label="Plaintext file" @change="onFileSelect" v-model="plaintextFile"/>
    <v-btn type="submit" depressed block :disabled="isDisabled">Run algorithm</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'DataForm',
  computed: {
    isDisabled() {
      return this.plaintext && this.plaintext.length === 0;
    },
  },
  methods: {
    onFileSelect(file) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        this.plaintext = target.result;
      };
      reader.readAsText(file);
    },
  },
  data() {
    return {
      plaintext: null,
      plaintextFile: null,
      plaintextFile: null,
    };
  },
};
</script>

<style lang="scss">

</style>
