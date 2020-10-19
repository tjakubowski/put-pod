<template>
  <v-app>

    <v-app-bar app flat color="white">
      <v-toolbar-title>Nihilist substitution</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>

        <v-row>
          <v-col class="text-right">
            <v-btn text @click="reverse">
              <v-icon left v-text="'mdi-swap-vertical'" :class="{'v-icon--rotate': !encrypt}"/>
              {{ encrypt ? 'Encrypt' : 'Decrypt' }}
            </v-btn>
          </v-col>
        </v-row>

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

              <AlphabetTable v-model="alphabet"
                             @increase="alphabetMatrixSize++"
                             @decrease="alphabetMatrixSize--"
                             :is-valid="isAlphabetValid"/>
              <v-divider class="mb-3"/>
              <v-text-field v-model="encryptionKey"
                            :rules="encryptionKeyRules"
                            label="Key"
                            filled dense/>
            </base-card>
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <base-card title="Result" icon="lock-outline">
              <v-textarea :value="result" label="Encrypted text" readonly filled dense/>
              <encryption-table
                v-show="isFormValid"
                :encryption-key="encryptionKeyMapped"
                :text="inputMapped"
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
    isAlphabetValid() {
      return this.alphabet.every(l => l.length > 0);
    },
    isFormValid() {
      return this.inputCleared.length > 0
        && this.encryptionKey.length > 0
        && [...this.encryptionKey].every((encryptionLetter) => this.alphabet.includes(encryptionLetter))
        && this.isAlphabetValid;
    },
    result() {
      if (!this.isFormValid) return '';

      return this.encrypt
        ? this.inputMapped.flat().map(({ letter, value }) => value).join(' ')
        : this.inputMapped.flat().map(({ letter, value }) => letter).join('');
    },
    encryptionKeyMapped() {
      return [...this.encryptionKey].map((letter) => ({
        letter,
        value: this.getLetterCode(letter),
      }));
    },
    inputCleared() {
      return this.text.replace(/\W/g, '');
    },
    inputMapped() {
      if (!this.isFormValid) return [];

      const encryptionKeyLength = this.encryptionKey.length;
      let input = [];

      if (this.encrypt) {
        input = [...this.inputCleared].map((letter, index) => ({
          letter,
          value: ((this.getLetterCode(letter) + this.getLetterCode(this.encryptionKey[index % encryptionKeyLength])) % 100).toString().padStart(2, '0'),
        }));
      } else {
        input = Array.from({ length: Math.ceil(this.inputCleared.length / 2) }, (v, i) => this.inputCleared.slice(i * 2, i * 2 + 2))
          .map((code, index) => {
            let alphabetPosition = +code - this.getLetterCode(this.encryptionKey[index % encryptionKeyLength]);
            if (alphabetPosition < 0) alphabetPosition += 100;
            const alphabetIndex = (Math.floor(alphabetPosition / 10) - 1) * 5 + ((alphabetPosition - 1) % 5);
            return {
              letter: this.alphabet[alphabetIndex] || '-',
              value: code,
            };
          });
      }

      return Array.from({ length: Math.ceil(input.length / encryptionKeyLength) }, (v, i) => input.slice(i * encryptionKeyLength, i * encryptionKeyLength + encryptionKeyLength));
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
      this.alphabet = this.alphabet.map(() => '');
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

.v-icon--rotate {
  transform: rotate(180deg);
}
</style>
