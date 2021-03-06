<template>
  <div>
    <portal to="app-info">
      <info-panels :panels="panels"/>
    </portal>

    <v-row>
      <v-col class="text-right">
        <v-btn outlined text @click="reverse">
          <v-icon left v-text="'mdi-swap-vertical'" :class="{'v-icon--rotate': !encrypt}"/>
          {{ encrypt ? 'Encrypt' : 'Decrypt' }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row>

      <v-col cols="12" md="6" lg="3" offset-lg="3">
        <base-card title="Input data" icon="text-subject">
          <v-form ref="inputForm" v-model="isInputDataValid">
            <file-btn class="mb-3" text block color="primary" @input="importData($event, 'generatedBits')">
              <v-icon left v-text="'mdi-import'"/> Import bits stream
            </file-btn>
            <v-textarea counter outlined dense height="200" label="Generated bits" :rules="generatedBitsRules" v-model="generatedBits"/>
            <v-switch class="mt-0" dense label="Loop generated bits (not recommended)" v-model="loopBits" />

            <v-divider/>

            <file-btn class="my-3" text block color="primary" @input="importData($event, 'inputData')">
              <v-icon left v-text="'mdi-import'"/> Import data
            </file-btn>
            <v-textarea counter outlined dense height="200" label="Input data" :rules="inputDataRules" v-model="inputData"/>
            <base-error class="mx-3" v-if="encrypt && hasDiacritics">
              Input data has diacritics or accents.
              <v-btn text small color="error" @click="removeDiacritics">Remove them</v-btn>
            </base-error>
            <v-textarea readonly counter outlined dense height="200" label="Input data bits" class="mb-3" :value="inputDataBits" v-if="encrypt"/>
          </v-form>
        </base-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <base-card title="Result" icon="numeric">
          <template v-slot:actions>
            <v-btn text color="primary" @click="downloadResult" :disabled="!isDone">
              <v-icon left v-text="'mdi-download'"/> Download
            </v-btn>
          </template>
          <v-textarea readonly counter outlined dense height="400" label="Result" class="mb-3" :value="result"/>
        </base-card>
      </v-col>

    </v-row>

  </div>
</template>

<script>
import downloadFile from 'js-file-download';
import readFile from '@/components/utils/file';
import {
  bitsToGroups, bytesToString, isBinary, stringToBinary,
} from '@/components/utils/binary';
import { streamCipherPanels as panels } from '@/components/data/panels';
import InfoPanels from '@/components/InfoPanels';
import BaseCard from '@/components/base/BaseCard';
import FileBtn from '@/components/FileBtn';
import Diacritics from 'diacritic';
import BaseError from '@/components/base/BaseError';

export default {
  name: 'StreamCipher',
  components: {
    BaseError, FileBtn, BaseCard, InfoPanels,
  },
  data() {
    return {
      panels,
      encrypt: true,
      loopBits: false,
      isInputDataValid: false,
      generatedBits: '',
      inputData: '',
      generatedBitsRules: [
        (v) => v.length > 0 || 'Generated bits are required',
        (v) => isBinary(v) || 'Generated bits must be a binary string',
        (v) => (this.loopBits || v.length >= this.inputDataLength) || `Binary stream length must be equal or greater than ${this.inputDataLength}`,
      ],
      inputDataRules: [
        (v) => v.length > 0 || 'Input data is required',
        (v) => this.encrypt || (!this.encrypt && isBinary(v)) || 'Input data must be a binary string',
      ],
    };
  },
  watch: {
    inputData() {
      this.validate();
    },
    loopBits() {
      this.validate();
    },
  },
  computed: {
    hasDiacritics() {
      return this.inputData !== Diacritics.clean(this.inputData);
    },
    isDone() {
      return this.result.length > 0;
    },
    inputDataLength() {
      return this.inputDataBits.length;
    },
    inputDataBits() {
      if (!this.encrypt) return this.inputData;

      return stringToBinary(this.inputData);
    },
    result() {
      if (!this.isInputDataValid) return '';

      const xorResult = [...this.inputDataBits]
        .map((bit, index) => {
          const generatedBitsIndex = index % this.generatedBits.length;
          return +bit ^ +this.generatedBits[generatedBitsIndex];
        })
        .join('');

      if (this.encrypt) return xorResult;

      const bytes = bitsToGroups(xorResult);
      return bytesToString(bytes);
    },
  },
  methods: {
    validate() {
      this.$refs.inputForm.validate();
    },
    downloadResult() {
      if (this.isDone) downloadFile(this.result, 'stream-cipher-result.txt');
    },
    importData(file, target) {
      readFile(file, (result) => {
        this.$set(this, target, result);
      });
    },
    reverse() {
      this.inputData = this.result;
      this.encrypt = !this.encrypt;
    },
    removeDiacritics() {
      this.inputData = Diacritics.clean(this.inputData);
    },
  },
  created() {
    this.generatedBits = this.$route.params.bits || '';
  },
};
</script>
