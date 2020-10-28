<template>
  <v-app>

    <v-app-bar app flat color="white">
      <v-toolbar-title>Nihilist substitution</v-toolbar-title>
      <v-spacer/>
      <v-dialog
        v-model="helpDialog"
        width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Jak to działa?</span>
          </v-card-title>
          <v-stepper
            v-model="e6"
            vertical
          >
            <v-stepper-step step="1" :complete="e6 > 1" editable edit-icon="$complete">
              Klucz jawny
            </v-stepper-step>

            <v-stepper-content step="1">
              Tekst jawny jest wymagany i powinien zawierać znaki, które zawiera alfabet. Jeśli wystepują w nim znaki, których nie zawiera alfabet, są one pomijane.
            </v-stepper-content>

            <v-stepper-step step="2" :complete="e6 > 2" editable edit-icon="$complete">
              Alfabet
            </v-stepper-step>

            <v-stepper-content step="2">
              Aflabet jest wymagany. Musi on zawierać unikatowe znaki, które składają się na macierz N x N. Dla każego znaku przypisywana jest jego pozycja w macierzy.
            </v-stepper-content>

            <v-stepper-step step="3" :complete="e6 > 3" editable edit-icon="$complete">
              Klucz
            </v-stepper-step>

            <v-stepper-content step="3">
              Klucz jest wymagany. Musi składać się ze znaków występujących w alfabecie. Do każdego znaku klucza przypisywana jest pozycja z alfabetu.
            </v-stepper-content>

            <v-stepper-step step="4" :complete="e6 > 4" editable edit-icon="$complete">
              Szyfrowanie
            </v-stepper-step>

            <v-stepper-content step="4">
              <p>Każdy znak tekstu jawnego jest przepisywany do tabeli, która zawiera tyle samo kolumn ile znaków zawiera klucz. Każdy przepisany znak z tekstu jawnego otrzymuje wartość wyliczana na podstawie sumy pozycji znaku w alfabecie i pozycji znaku klucza w danej kolumnie.</p>
              <p>Jeżeli wartość jest większa od 100, od wartości jest odejmowana liczba 100.</p>
              <p>Dla macierzy większych niż 5x5 zastosowano kodowanie 3 cyfrowe, co jest rozszerzeniem metody szyfrowania Nihilistów.</p>
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-main>
      <v-container fluid>

        <v-row>
          <v-col class="text-right">
            <v-btn outlined text @click="reverse">
              <v-icon left v-text="'mdi-swap-vertical'" :class="{'v-icon--rotate': !encrypt}"/>
              {{ encrypt ? 'Encrypt' : 'Decrypt' }}
            </v-btn>
          </v-col>
        </v-row>

        <v-form ref="form">
        <v-row>

            <v-col cols="12" md="6" lg="3">
              <base-card title="Input data" icon="text-subject">
                <template v-slot:actions>
                  <v-btn text color="error" @click="clearInput">
                    <v-icon left v-text="'mdi-delete-outline'"/> Clear
                  </v-btn>
                </template>
                <v-textarea v-model="text" @input="deleteFile" :label="inputLabel" filled dense :rules="textRules"/>
                <v-file-input @change="readFile" v-model="textFile" label="Plaintext file" filled dense/>
              </base-card>
            </v-col>

            <v-col cols="12" md="6" lg="6">
              <base-card title="Secrets" icon="key-outline">
                <template v-slot:actions>
                  <v-btn text color="error" @click="clearSecrets">
                    <v-icon left v-text="'mdi-delete-outline'"/> Clear
                  </v-btn>
                </template>

                <div class="text-right">
                  <v-menu
                    v-model="alphabetCreatorMenu"
                    :close-on-content-click="false"
                    :close-on-click="false"
                    :nudge-width="200"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        text
                        color="primary"
                      >
                        Presets
                        <v-icon right v-text="alphabetCreatorMenu ? 'mdi-menu-up' : 'mdi-menu-down'" />
                      </v-btn>
                    </template>

                    <AlphabetCreator @input="setAlphabetPreset" @close="alphabetCreatorMenu = !alphabetCreatorMenu"/>
                  </v-menu>
                  <v-btn text color="primary" @click="shuffleAlphabet">
                    <v-icon left v-text="'mdi-shuffle'"/> Shuffle
                  </v-btn>
                </div>

                <AlphabetTable v-model="alphabet"
                               @increase="alphabetMatrixSize++"
                               @decrease="alphabetMatrixSize--"
                               :is-valid="isAlphabetValid"/>

                <v-divider class="mb-3"/>

                <v-text-field v-model="encryptionKey"
                              :rules="encryptionKeyRules"
                              label="Key"
                              clearable
                              filled
                              dense
                />
              </base-card>
            </v-col>

            <v-col cols="12" md="6" lg="3">
              <base-card title="Result" icon="lock-outline">
                <template v-slot:actions>
                  <v-btn text color="primary" @click="downloadResult" :disabled="result.length === 0">
                    <v-icon left v-text="'mdi-download'"/> Download
                  </v-btn>
                </template>

                <v-textarea :value="result" label="Encrypted text" readonly filled dense/>

                <v-card-actions>
                  <v-spacer/>

                  <v-btn
                    icon
                    @click="encryptionTableShow = !encryptionTableShow"
                  >
                    <v-icon>{{ encryptionTableShow ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="encryptionTableShow">
                    <v-divider class="mb-3"/>

                    <encryption-table
                      v-show="isFormValid"
                      :encryption-key="encryptionKeyMapped"
                      :text="inputMapped"
                    />
                    <div class="text-center caption" v-show="!isFormValid">Encryption table not available</div>
                  </div>
                </v-expand-transition>

              </base-card>
            </v-col>

          </v-row>
        </v-form>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import BaseCard from '@/components/BaseCard';
import AlphabetTable from '@/components/AlphabetTable';
import EncryptionTable from '@/components/EncryptionTable';
import AlphabetCreator from '@/components/AlphabetCreator';
import fileDownload from 'js-file-download';

export default {
  name: 'App',
  components: {
    AlphabetCreator,
    EncryptionTable,
    AlphabetTable,
    BaseCard,
  },
  data() {
    return {
      e6: 1,
      helpDialog: false,
      encrypt: true,
      alphabetCreatorMenu: false,
      alphabetMatrixSize: 5,
      textFile: null,
      text: '',
      textRules: [
        (v) => !!v || `${this.inputLabel} is required`,
        (v) => !this.encrypt || [...v].every((letter) => this.alphabet.includes(letter)) || 'Some characters in the text are not in the alphabet and will be omitted',
      ],
      alphabet: [],
      encryptionKey: '',
      encryptionKeyRules: [
        (v) => [...v].every((letter) => this.alphabet.includes(letter)) || 'Encryption key must contain alphabet characters only',
        (v) => !!v || 'Encryption key is required',
        (v) => (v && v.length >= 2) || 'Encryption key must be more than 2 characters',
      ],
      encryptionTableShow: true,
    };
  },
  watch: {
    alphabetMatrixSize(value) {
      if (Number.isInteger(value)) this.resizeAlphabet();
    },
    inputMapped(value) {
      if (value.length > 0 && value[0].length > 6 || value.length > 4) this.encryptionTableShow = false;
    },
    alphabet() {
      this.$refs.form.validate();
    },
  },
  computed: {
    inputLabel() {
      return this.encrypt ? 'Plaintext' : 'Encoded text';
    },
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
      return this.encrypt
        ? [...this.text].filter((letter) => this.alphabet.includes(letter))
        : this.text.replaceAll(' ', '');
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
        input = this.inputCleared.match(new RegExp(`.{1,${codeLength}}`, 'g'))
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
      this.alphabetMatrixSize = Math.sqrt(this.alphabet.length);
    },
    getLetterCode(letter) {
      const index = this.alphabet.indexOf(letter);
      return Math.floor(index / this.alphabetMatrixSize + 1) * 10 + (index % this.alphabetMatrixSize) + 1;
    },
    shuffleAlphabet() {
      let array = [...this.alphabet];

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }

      array = array.filter((letter) => letter !== '');
      const newEmptyEntries = Array.from({ length: this.alphabet.length - array.length }, () => '');

      this.alphabet = [...array, ...newEmptyEntries];
    },
    deleteFile() {
      this.textFile = null;
    },
    clearInput() {
      this.text = '';
      this.textFile = null;
    },
    clearSecrets() {
      this.alphabet = this.alphabet.map(() => '');
      this.encryptionKey = '';
    },
    reverse() {
      this.text = this.result;
      this.encrypt = !this.encrypt;
    },
    downloadResult() {
      fileDownload(this.result, `${this.encrypt ? 'encryption' : 'decryption'}-result.txt`);
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
