<template>
  <v-app>

    <v-app-bar app flat color="white">
      <v-toolbar-title>Nihilist substitution</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>

          <v-col cols="12" md="6" lg="4">
            <base-card title="Input data" icon="text-subject">
              <template v-slot:actions>
                <v-btn text class="error--text" @click="clearText">
                  <v-icon left>
                    mdi-delete-outline
                  </v-icon>
                  Clear</v-btn>
              </template>
              <v-textarea v-model="text" @input="deleteFile" :label="textLabel" filled dense/>
              <v-file-input @change="readFile" v-model="textFile" label="Plaintext file" filled dense/>
            </base-card>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <base-card title="Secrets" icon="key-outline">
              <AlphabetTable @input="updateAlphabet" :size="alphabetMatrixSize"/>
              <v-divider class="my-3"/>
              <v-text-field v-model="encryptionKey" :rules="encryptionKeyRules" label="Key" filled dense/>
            </base-card>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <base-card title="Result" icon="lock-outline">
              <template v-slot:actions>
                <v-btn text @click="reverse">
                  <v-icon left v-text="'mdi-swap-vertical'"/>
                  Reverse</v-btn>
              </template>
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
import AlphabetTable from '@/components/AlphabetTable';

export default {
  name: 'App',
  components: {
    AlphabetTable,
    BaseCard,
  },
  data() {
    return {
      alphabetMatrixSize: 5,
      encrypt: true,
      textFile: null,
      text: '',
      alphabet: [],
      encryptionKey: '',
      encryptionKeyRules: [
        (v) => [...v].every((letter) => this.alphabet.includes(letter)) || 'Encryption key must contain alphabet characters only',
        (v) => !!v || 'Encryption key is required',
        (v) => (v && v.length >= 2) || 'Encryption key must be more than 2 characters',
      ],
    };
  },
  computed: {
    result() {
      return [...this.text].map((letter, index) => {
        const encryptionKeyLetter = this.encryptionKey[index % this.encryptionKey.length];
        const encryptionKeyValue = this.getLetterCode(encryptionKeyLetter);
        const letterValue = this.getLetterCode(letter);

        return ((encryptionKeyValue + letterValue) % 100).toString().padStart(2, '0');
      });
    },
    textLabel() {
      return this.encrypt ? 'Plaintext' : 'Encoded text';
    },
  },
  watch: {
    encryptionKey(newValue, previousValue) {
      return [...newValue].filter((letter) => this.alphabet.includes(letter));
    },
  },
  methods: {
    getLetterCode(letter) {
      const index = this.alphabet.indexOf(letter);
      return Math.floor(index / this.alphabetMatrixSize + 1) * 10 + index % this.alphabetMatrixSize + 1;
    },
    deleteFile() {
      this.textFile = null;
    },
    clearText() {
      this.text = '';
    },
    reverse() {
      this.text = this.result;
      this.encrypt = !this.encrypt;
    },
    updateAlphabet(alphabet) {
      this.alphabet = alphabet;
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
