<template>
  <v-app>

    <v-app-bar app flat color="white">
      <v-toolbar-title>Nihilist substitution</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>

        <v-row>
          <v-col class="text-right">
            <v-btn text @click="reverse">
              <v-icon left v-text="'mdi-swap-vertical'" :class="{'v-icon--rotate': !encrypt}"/>
              {{ encrypt ? 'Encrypt' : 'Decrypt' }}
            </v-btn>
          </v-col>
        </v-row>

        <v-row>

          <v-col cols="12" md="6" lg="3">
            <base-card title="Input data" icon="text-subject">
              <template v-slot:actions>
                <v-btn text class="error--text" @click="clearText">
                  <v-icon left>
                    mdi-delete-outline
                  </v-icon>
                  Clear</v-btn>
              </template>
              <v-textarea v-model="text" @input="deleteFile" :label="encrypt ? 'Plaintext' : 'Encoded text'" filled dense :rules="textRules"/>
              <v-file-input @change="readFile" v-model="textFile" label="Plaintext file" filled dense/>
            </base-card>
          </v-col>

          <v-col cols="12" md="6" lg="6">
            <base-card title="Secrets" icon="key-outline">
              <template v-slot:actions>
                <v-btn text @click="shuffleAlphabet">
                  <v-icon left>
                    mdi-shuffle
                  </v-icon>
                  Shuffle</v-btn>
                <v-btn text class="error--text" @click="clearSecrets">
                  <v-icon left>
                    mdi-delete-outline
                  </v-icon>
                  Clear</v-btn>
              </template>

              <v-menu
                v-model="alphabetCreatorMenu"
                :close-on-content-click="false"
                :close-on-click="false"
                :nudge-width="200"
                offset-x
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    text
                    block
                  >
                    Presets
                  </v-btn>
                </template>

                <AlphabetCreator @input="setAlphabetPreset" @close="alphabetCreatorMenu = !alphabetCreatorMenu"/>
              </v-menu>

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

          <v-col cols="12" md="6" lg="3">
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
import AlphabetCreator from '@/components/AlphabetCreator';
import BaseError from "@/components/BaseError";

export default {
  name: 'App',
  components: {
    BaseError,
    AlphabetCreator,
    EncryptionTable,
    AlphabetTable,
    BaseCard,
  },
  data() {
    return {
      alphabetCreatorMenu: false,
      alphabetMatrixSize: 5,
      encrypt: true,
      textFile: null,
      text: '',
      textRules: [
        (v) => [...v].every((letter) => this.alphabet.includes(letter)) || 'Some characters in the text are not in the alphabet and will be omitted',
      ],
      alphabet: [],
      encryptionKey: '',
      encryptionKeyRules: [
        (v) => [...v].every((letter) => this.alphabet.includes(letter)) || 'Encryption key must contain alphabet characters only',
        (v) => !!v || 'Encryption key is required',
        (v) => (v && v.length >= 2) || 'Encryption key must be more than 2 characters',
      ],
      alphabetPresets: [
        {
          name: 'Small polish alphabet',
          alphabet: ['a', 'ą', 'b', 'c', 'ć', 'd', 'e', 'ę', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'ł', 'm', 'n', 'ń', 'o', 'ó', 'p', 'q', 'r', 's', 'ś', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ź', 'ż', ' '],
        },
        {
          name: 'Big polish alphabet',
          alphabet: ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż', ' '],
        },
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
      return this.alphabet.every((l) => l.length > 0);
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

      const codeLength = this.alphabetMatrixSize <= 5 ? 2 : 3;
      const encryptionKeyLength = this.encryptionKey.length;
      let input = [];

      if (this.encrypt) {
        input = [...this.inputCleared].map((letter, index) => {
          let code = this.getLetterCode(letter) + this.getLetterCode(this.encryptionKey[index % encryptionKeyLength]);

          if (this.alphabetMatrixSize <= 5) code %= 100;

          return {
            letter,
            value: code.toString().padStart(codeLength, '0'),
          };
        });
      } else {
        input = Array.from({ length: Math.ceil(this.inputCleared.length / codeLength) }, (v, i) => this.inputCleared.slice(i * codeLength, i * codeLength + codeLength))
          .map((code, index) => {
            let alphabetPosition = +code - this.getLetterCode(this.encryptionKey[index % encryptionKeyLength]);
            if (alphabetPosition < 0 && this.alphabetMatrixSize <= 5) alphabetPosition += 100;
            const alphabetIndex = (+(`${alphabetPosition}`)[0] - 1) * this.alphabetMatrixSize + (+(`${alphabetPosition}`)[1] - 1);
            return {
              letter: this.alphabet[alphabetIndex] || '-',
              value: code,
            };
          });
      }

      return Array.from({ length: Math.ceil(input.length / encryptionKeyLength) }, (v, i) => input.slice(i * encryptionKeyLength, i * encryptionKeyLength + encryptionKeyLength));
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
    setAlphabetPreset(preset) {
      this.alphabet = preset;
    },
    getLetterCode(letter) {
      const index = this.alphabet.indexOf(letter);
      return Math.floor(index / this.alphabetMatrixSize + 1) * 10 + (index % this.alphabetMatrixSize) + 1;
    },
    shuffleAlphabet() {
      const array = [...this.alphabet];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      this.alphabet = array;
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
