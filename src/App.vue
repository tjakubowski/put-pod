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
              <template v-slot:actions>
                <v-btn text class="error--text" @click="clearSecrets">
                  <v-icon left>
                    mdi-delete-outline
                  </v-icon>
                  Clear</v-btn>
              </template>

              <AlphabetTable v-model="alphabet" @increase="alphabetMatrixSize++" @decrease="alphabetMatrixSize--"/>
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
              <encryption-table
                :encryption-key="encryptionKeyMapped"
                :text="textMapped"
              />
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
import EncryptionTable from '@/components/EncryptionTable';

export default {
  name: 'App',
  components: {
    EncryptionTable,
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
  watch: {
    alphabetMatrixSize(value) {
      if (Number.isInteger(value)) this.resizeAlphabet();
    },
  },
  computed: {
    result() {
      return [...this.textCleared].map((letter, index) => {
        const encryptionKeyLetter = this.encryptionKey[index % this.encryptionKey.length];
        const encryptionKeyValue = this.getLetterCode(encryptionKeyLetter);
        const letterValue = this.getLetterCode(letter);

        return ((encryptionKeyValue + letterValue) % 100).toString().padStart(2, '0');
      });
    },
    encryptionKeyMapped() {
      return [...this.encryptionKey].map((letter) => ({
        letter,
        value: this.getLetterCode(letter),
      }));
    },
    textCleared() {
      return this.text.replace(/\W/g, '');
    },
    textMapped() {
      const size = this.encryptionKey.length;

      const textMapped = [...this.textCleared].map((letter, index) => ({
        letter,
        value: this.getLetterCode(letter) + this.getLetterCode(this.encryptionKey[index % this.encryptionKey.length]),
      }));

      return Array.from({ length: Math.ceil(textMapped.length / size) }, (v, i) => textMapped.slice(i * size, i * size + size));
    },
    textLabel() {
      return this.encrypt ? 'Plaintext' : 'Encoded text';
    },
  },
  methods: {
    resizeAlphabet() {
      const targetAlphabetSize = this.alphabetMatrixSize * this.alphabetMatrixSize;
      const currentAlphabetSize = this.alphabet.length;

      if (targetAlphabetSize < currentAlphabetSize) {
        this.alphabet.splice(targetAlphabetSize);
      } else if (targetAlphabetSize > currentAlphabetSize) {
        const newEmptyEntries = Array.from({ length: targetAlphabetSize - currentAlphabetSize }, () => '');
        this.alphabet = [...this.alphabet, ...newEmptyEntries];
      }
    },
    getLetterCode(letter) {
      const index = this.alphabet.indexOf(letter);
      return Math.floor(index / this.alphabetMatrixSize + 1) * 10 + (index % this.alphabetMatrixSize) + 1;
    },
    deleteFile() {
      this.textFile = null;
    },
    clearText() {
      this.text = '';
    },
    clearSecrets() {
      this.alphabet = this.alphabet.map((letter) => '');
      this.encryptionKey = '';
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
  created() {
    this.resizeAlphabet();
  },
};
</script>

<style lang="scss">
.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}
</style>
