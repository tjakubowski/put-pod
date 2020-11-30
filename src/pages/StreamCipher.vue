<template>
  <v-row>
    <portal to="app-info">
      <info-panels :panels="panels"/>
    </portal>

    <v-col cols="12" md="6" lg="3">
      <base-card title="Input data" icon="text-subject">
        <v-textarea counter outlined dense height="200" label="Generated bits" v-model="generatedBits"/>
        <file-btn text block color="primary" @input="importInputData">
          <v-icon left v-text="'mdi-import'"/> Import bits stream
        </file-btn>

        <v-divider/>

        <v-textarea counter outlined dense height="200" label="Input text" v-model="inputText"/>
        <file-btn text block color="primary" @input="importInputData">
          <v-icon left v-text="'mdi-import'"/> Import text
        </file-btn>
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
import FileBtn from "@/components/FileBtn";

export default {
  name: 'StreamCipher',
  components: {FileBtn, BaseCard, InfoPanels },
  data() {
    return {
      panels,
      generatedBits: '',
      inputText: '',
      result: '',
    };
  },
  computed: {
    isDone() {
      return this.result.length > 0;
    },
    inputTextBits() {
      return [...this.inputText]
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('');
    },
  },
  methods: {
    downloadResult() {
      if (this.isDone) downloadFile(this.result, 'stream-cipher-result.txt');
    },
    importInputData(file) {
      readFile(file, (result) => {
        console.log(result);
      });
    },
  },
};
</script>
