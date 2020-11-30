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

      <v-col cols="12" md="6" lg="3">
        <base-card title="Input data" icon="text-subject">
          <v-form ref="inputForm" v-model="isInputDataValid">
            <file-btn class="mb-3" text block color="primary" @input="importData($event, 'generatedBits')">
              <v-icon left v-text="'mdi-import'"/> Import bits stream
            </file-btn>
            <v-textarea counter outlined dense height="200" label="Generated bits" :rules="generatedBitsRules" v-model="generatedBits"/>

            <v-divider/>

            <file-btn class="my-3" text block color="primary" @input="importData($event, 'inputData')">
              <v-icon left v-text="'mdi-import'"/> Import data
            </file-btn>
            <v-textarea counter outlined dense height="200" label="Input data" :rules="inputDataRules" v-model="inputData"/>
          </v-form>
        </base-card>
      </v-col>

      <v-col cols="12" lg="6">
        <base-card title="Result" icon="numeric">
          <template v-slot:actions>
            <v-btn text color="primary" @click="downloadResult" :disabled="!isDone">
              <v-icon left v-text="'mdi-download'"/> Download
            </v-btn>
          </template>
          <v-textarea readonly counter outlined dense height="200" label="Result" class="mb-3" :value="result"/>
        </base-card>
      </v-col>

    </v-row>

  </div>
</template>

<script>
import downloadFile from 'js-file-download';
import readFile from '@/components/utils/file';
import { bitsToBytes, stringToBinary, isBinary, bytesToString } from '@/components/utils/binary';
import { streamCipherPanels as panels } from '@/components/data/panels';
import InfoPanels from '@/components/InfoPanels';
import BaseCard from '@/components/base/BaseCard';
import FileBtn from '@/components/FileBtn';

export default {
  name: 'StreamCipher',
  components: { FileBtn, BaseCard, InfoPanels },
  data() {
    return {
      panels,
      encrypt: true,
      isInputDataValid: false,
      generatedBits: '',
      inputData: '',
      generatedBitsRules: [
        (v) => v.length > 0 || 'Generated bits are required',
        (v) => isBinary(v) || 'Generated bits must be a binary string',
        (v) => v.length >= this.inputDataLength || `Binary stream length must be equal or greater than ${this.inputDataLength}`,
      ],
      inputDataRules: [
        (v) => v.length > 0 || 'Input data is required',
        (v) => this.encrypt || (!this.encrypt && isBinary(v)) || 'Input data must be a binary string',
      ],
    };
  },
  watch: {
    inputData() {
      this.$refs.inputForm.validate();
    },
  },
  computed: {
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
        .map((bit, index) => +bit ^ +this.generatedBits[index]).join('');

      if (this.encrypt) return xorResult;

      const bytes = bitsToBytes(xorResult);
      return bytesToString(bytes);
    },
  },
  methods: {
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
  },
};
</script>
