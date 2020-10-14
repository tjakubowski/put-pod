<template>
  <v-app>

    <v-app-bar app flat color="white">
      <v-toolbar-title>Nihilist substitution</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>

        <v-row>
          <v-col class="text-right">
            <v-btn text class="error--text" @click="clear">
              <v-icon left>
                mdi-delete-outline
              </v-icon>
              Clear</v-btn>
            <v-btn text @click="reverse">
              <v-icon left v-text="'mdi-swap-vertical'"/>
              Reverse</v-btn>
          </v-col>
        </v-row>

        <v-row>

          <v-col cols="4">
            <base-card title="Input data" icon="text-subject">
              <v-textarea v-model="text" @input="deleteFile" :label="textLabel" filled dense/>
              <v-file-input @change="readFile" v-model="textFile" label="Plaintext file" filled dense/>
            </base-card>
          </v-col>

          <v-col cols="4">
            <base-card title="Secrets" icon="key-outline">
            </base-card>
          </v-col>

          <v-col cols="4">
            <base-card title="Result" icon="lock-outline">
              <v-textarea :value="result" label="Encrypted text" readonly filled dense/>
            </base-card>
          </v-col>

        </v-row>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import BaseCard from '@/components/BaseCard';

export default {
  name: 'App',
  components: {
    BaseCard,
  },
  data() {
    return {
      encrypt: true,
      textFile: null,
      text: '',
    };
  },
  computed: {
    result() {
      return '';
    },
    textLabel() {
      return this.encrypt ? 'Plaintext' : 'Code';
    },
  },
  methods: {
    deleteFile() {
      this.textFile = null;
    },
    clear() {
      this.text = '';
    },
    reverse() {
      this.text = this.result;
      this.encrypt = !this.encrypt;
    },
    readFile(file) {
      const reader = new FileReader();
      reader.onload = ({ target }) => {
        this.text = target.result;
      };
      reader.readAsText(file);
    },
  },
};
</script>

<style lang="scss">
.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}
</style>
