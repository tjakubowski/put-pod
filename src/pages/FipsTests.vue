<template>
  <v-row>
    <portal to="app-info">
      <info-panels :panels="panels"/>
    </portal>

      <v-col cols="12" md="6" lg="3" offset-lg="3">
        <base-card title="Input data" icon="text-subject">
          <v-form ref="form" v-model="isInputDataValid">
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
          <v-alert v-for="test in testsResult" :key="test.name" dense text
                   :type="`${test.passed ? 'success' : 'error'}`">
            <p>{{test.name}}</p>
            <p>Result:</p>
            <div class="text-center" v-html="test.result"></div>
          </v-alert>
          <p class="text-center" v-show="testsResult.length === 0">No results</p>
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
import * as fips from '../components/algorithms/fips';

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
    testsResult() {
      if (!this.isInputDataValid || this.inputData.length === 0) return [];

      return [
        { name: 'The mono bit test', ...this.executeTestMonoBit() },
        { name: 'The runs test (for `1` bits)', ...this.executeTestRuns(1) },
        { name: 'The runs test (for `0` bits)', ...this.executeTestRuns(0) },
        { name: 'The long runs test', ...this.executeTestLongRuns() },
        { name: 'The poker test', ...this.executeTestPoker() },
      ];
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
    executeTestMonoBit() {
      const data = fips.testMonoBit(this.inputData);
      data.result = `9725 < ${data.result} < 10275`;
      return data;
    },
    executeTestRuns(bit = 1) {
      const data = fips.testRuns(this.inputData, bit);
      data.result = data.result.map(({ min, max, count }, index) => `<p><strong>${index + 1}. </strong>${min} < ${count} < ${max}</p>`).join('');
      return data;
    },
    executeTestLongRuns() {
      const data = fips.testLongRuns(this.inputData);
      data.result = `Number of 26+ runs: ${data.result}`;
      return data;
    },
    executeTestPoker() {
      const data = fips.testPoker(this.inputData);
      data.result = `2.16 < ${data.result} < 46.17`;
      return data;
    },
  },
  created() {
    this.inputData = this.$route.params.bits || '';
  },
};
</script>
