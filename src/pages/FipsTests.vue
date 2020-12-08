<template>
  <v-row>
    <portal to="app-info">
      <info-panels :panels="panels"/>
    </portal>

      <v-col cols="12" md="6" lg="3" offset-lg="3">
        <base-card title="Input data" icon="text-subject">
          <v-form ref="inputForm" v-model="isInputDataValid">
            <file-btn class="mb-3" text block color="primary" @input="importData($event, 'inputData')">
              <v-icon left v-text="'mdi-import'"/> Import binary data
            </file-btn>
            <v-textarea counter outlined dense height="200" label="Bits" :rules="inputDataRules" v-model="inputData"/>
            <base-error class="mx-3" v-if="isInputDataTooBig">
              Input data is too big.
              <v-btn text small color="error" @click="shortenInputData">Shorten the data</v-btn>
            </base-error>
          </v-form>
        </base-card>
      </v-col>

      <v-col cols="12" md="6" lg="3">
        <base-card title="Results" icon="numeric">
        </base-card>
      </v-col>

    </v-row>
</template>

<script>
import readFile from '@/components/utils/file';
import { fipsTestsPanels as panels } from '@/components/data/panels';
import InfoPanels from '@/components/InfoPanels';
import BaseCard from '@/components/base/BaseCard';
import BaseError from '@/components/base/BaseError';
import FileBtn from '@/components/FileBtn';
import { isBinary } from '../components/utils/binary';

export default {
  name: 'FlipTests',
  components: {
    FileBtn, BaseCard, InfoPanels, BaseError,
  },
  data() {
    return {
      panels,
      isInputDataValid: false,
      maxInputDataLength: 20000,
      inputData: '',
      inputDataRules: [
        (v) => v.length > 0 || 'Input data is required',
        (v) => isBinary(v) || 'Input data must be a binary string',
        (v) => v.length === this.maxInputDataLength || `Input data length must be ${this.maxInputDataLength}`,
      ],
    };
  },
  computed: {
    isInputDataTooBig() {
      return this.inputData.length > this.maxInputDataLength;
    },
  },
  methods: {
    importData(file, target) {
      readFile(file, (result) => {
        this.$set(this, target, result);
      });
    },
    shortenInputData() {
      this.inputData = this.inputData.slice(0, this.maxInputDataLength);
    },
  },
  created() {
    this.inputData = this.$route.params.bits || '';
  },
};
</script>
