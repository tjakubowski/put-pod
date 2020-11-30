<template>
  <v-row>
    <portal to="app-info">
      <info-panels :panels="panels"/>
    </portal>

    <v-col cols="12" md="6" lg="3">
      <base-card title="Input data" icon="text-subject">
        <v-form ref="inputForm" v-model="isInputDataValid">
          <file-btn class="mb-3" text block color="primary" @input="importData($event, 'generatedBits')">
            <v-icon left v-text="'mdi-import'"/> Import bits stream
          </file-btn>
          <v-textarea counter outlined dense height="200" label="Generated bits" :rules="generatedBitsRules" v-model="generatedBits"/>

          <v-divider/>

          <file-btn class="my-3" text block color="primary" @input="importData($event, 'inputText')">
            <v-icon left v-text="'mdi-import'"/> Import text
          </file-btn>
          <v-textarea counter outlined dense height="200" label="Input text" :rules="inputTextRules" v-model="inputText"/>
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
        <v-textarea readonly counter outlined dense height="200" label="Generated bits" class="mb-3" :value="result"/>
      </base-card>
    </v-col>

  </v-row>
</template>

<script>
import downloadFile from 'js-file-download';
import readFile from '@/components/utils/file';
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
      isInputDataValid: false,
      generatedBits: '',
      inputText: '',
      generatedBitsRules: [
        (v) => v.length > 0 || 'Generated bits are required',
        (v) => [...v].every((char) => ['0', '1'].includes(char)) || 'Generated bits must be a binary string',
        (v) => v.length >= this.inputTextBitsLength || `Binary stream length must be equal or greater than ${this.inputTextBitsLength}`,
      ],
      inputTextRules: [
        (v) => v.length > 0 || 'Input text is required',
      ],
    };
  },
  watch: {
    inputText() {
      this.$refs.inputForm.validate();
    },
  },
  computed: {
    isDone() {
      return this.result.length > 0;
    },
    inputTextBitsLength() {
      return this.inputText.length * 8;
    },
    inputTextBits() {
      return [...this.inputText]
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('');
    },
    result() {
      if (!this.isInputDataValid) return '';

      return [...this.inputTextBits]
        .map((bit, index) => +bit ^ +this.generatedBits[index])
        .join('');
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
  },
};
</script>
