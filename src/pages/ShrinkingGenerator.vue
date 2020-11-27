<template>
  <v-row>
    <portal to="app-info">
      <info-panels :panels="panels"/>
    </portal>

    <v-col cols="12" md="6" lg="3">
      <base-card title="Input data" icon="text-subject">
        <template #actions>
          <file-btn text color="primary" @input="importInputData">
            <v-icon left v-text="'mdi-import'"/> Import
          </file-btn>
          <v-btn text color="primary" @click="downloadInputData" :disabled="!isInputDataValid">
            <v-icon left v-text="'mdi-download'"/> Download
          </v-btn>
        </template>
        <v-form ref="inputForm" v-model="isInputDataValid">
          <v-text-field class="mt-3" dense outlined clearable
                        type="number"
                        label="Bits to generate"
                        :rules="generatedDigitsRules"
                        v-model.number="generatedDigitsTarget"
                        @input="validate"
          />
          <v-divider/>
          <lfsr-editor class="mt-3" :lfsr="lfsr.a" name="LFSR-A" @input="reset"/>
          <v-divider/>
          <lfsr-editor class="mt-3" :lfsr="lfsr.s" name="LFSR-S" @input="reset"/>
        </v-form>
      </base-card>
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <base-card title="Clock control" icon="update" :loading="isGenerating">
        <template #actions>
          <v-btn text color="error" @click="reset">
            <v-icon left v-text="'mdi-restart'"/> Reset
          </v-btn>
        </template>
        <v-row>
          <v-col>
            <v-btn text @click="tick" block outlined :disabled="isRunning || isDone">Single tick</v-btn>
          </v-col>
          <v-col>
            <v-btn text @click="run" block outlined :disabled="isRunning || isDone">Generate</v-btn>
          </v-col>
        </v-row>
        <v-divider/>
        <v-card-subtitle>Continuous work</v-card-subtitle>
        <v-row>
          <v-col cols="12">
            <v-text-field type="number" outlined hide-details dense label="Clock interval (ms)" :readonly="isRunning" v-model="clockInterval"/>
          </v-col>
          <v-col>
            <v-btn text @click="runClock" block outlined :disabled="isRunning || isDone">Start</v-btn>
          </v-col>
          <v-col>
            <v-btn text @click="stopClock" block outlined :disabled="isGenerating || !isRunning || isDone">Stop</v-btn>
          </v-col>
        </v-row>
      </base-card>
    </v-col>
    <v-col cols="12" lg="6">
      <base-card title="Result" icon="numeric">
        <template v-slot:actions>
          <v-btn text color="primary" @click="downloadResult" :disabled="!isDone">
            <v-icon left v-text="'mdi-download'"/> Download
          </v-btn>
        </template>
        <LfsrViewer :lfsrs="lfsr"/>
        <v-textarea readonly counter outlined dense height="200" label="Generated bits" class="mb-3" :value="result"/>
      </base-card>
    </v-col>
  </v-row>
</template>

<script>
import BaseCard from '@/components/base/BaseCard';
import LfsrEditor from '@/components/LfsrEditor';
import LfsrViewer from '@/components/LfsrViewer';
import InfoPanels from '@/components/InfoPanels';
import FileBtn from '@/components/FileBtn';
import { shrinkingGeneratorPanels as panels } from '@/components/data/panels';
import LFSR from '@/components/algorithms/lfsr';
import downloadFile from 'js-file-download';
import readFile from '@/components/utils/file';
import worker from '@/workers/shrinking-generator-worker';

export default {
  name: 'ShrinkingGenerator',
  components: {
    FileBtn, InfoPanels, LfsrViewer, LfsrEditor, BaseCard,
  },
  data() {
    return {
      panels,
      lfsr: {
        a: {
          state: [],
          initialState: '100001010010110111010111010',
          polynomial: [0, 1, 5, 8],
        },
        s: {
          state: [],
          initialState: '10101000010010001001111010010010010001',
          polynomial: [4, 1, 6, 9, 11, 17, 14],
        },
      },
      isInputDataValid: false,
      clockInterval: 100,
      clock: null,
      isGenerating: false,
      generatedDigitsTarget: 20000,
      generatedDigitsRules: [
        (v) => !!v || 'Bits to generate must be a number greater than 0',
      ],
      result: '',
    };
  },
  computed: {
    isRunning() {
      return !!this.clock || this.isGenerating;
    },
    isDone() {
      return this.generatedDigitsTarget === this.generatedDigits;
    },
    generatedDigits() {
      return this.result.length;
    },
  },
  methods: {
    runClock() {
      if (this.isDone) {
        this.stopClock();
        return;
      }

      this.tick();
      this.clock = setTimeout(this.runClock, this.clockInterval);
    },
    stopClock() {
      if (this.clock) {
        clearTimeout(this.clock);
        this.clock = null;
      }
    },
    tick() {
      const a = this.lfsr.a.register.tick();
      const s = this.lfsr.s.register.tick();

      this.mapLfsrs();
      if (s === 0) return;

      this.result = a + this.result;
    },
    async run() {
      this.isGenerating = true;

      window.Worker ? await this.runAsync() : this.runSync();

      this.isGenerating = false;
    },
    runSync() {
      while (this.generatedDigits < this.generatedDigitsTarget) this.tick();
    },
    async runAsync() {
      const data = this.getInputDataObject();

      const { result, lfsr } = await worker.send(data);

      this.result = result;
      this.lfsr.a.register.state = lfsr.a.state;
      this.lfsr.s.register.state = lfsr.s.state;

      this.mapLfsrs();
    },
    reset() {
      this.stopClock();

      this.result = '';

      this.lfsr.a.register.reset();
      this.lfsr.s.register.reset();

      this.mapLfsrs();
      this.validate();
    },
    validate() {
      this.$refs.inputForm.validate();
    },
    mapLfsrs() {
      const properties = ['state', 'initialState', 'polynomial'];

      properties.forEach((property) => { this.lfsr.a[property] = this.lfsr.a.register[property]; });
      properties.forEach((property) => { this.lfsr.s[property] = this.lfsr.s.register[property]; });
    },
    getInputDataObject() {
      return {
        bits: this.generatedDigitsTarget,
        lfsr: {
          a: {
            initialState: this.lfsr.a.register.initialState,
            polynomial: this.lfsr.a.register.polynomial,
          },
          s: {
            initialState: this.lfsr.s.register.initialState,
            polynomial: this.lfsr.s.register.polynomial,
          },
        },
      };
    },
    downloadResult() {
      if (this.isDone) downloadFile(this.result, 'shrinking-generator-result.txt');
    },
    downloadInputData() {
      const data = this.getInputDataObject();

      downloadFile(JSON.stringify(data), 'shrinking-generator-input.txt');
    },
    importInputData(file) {
      readFile(file, (result) => {
        const data = JSON.parse(result);

        this.generatedDigitsTarget = data.bits;

        const lfsrA = this.lfsr.a.register;
        const lfsrS = this.lfsr.s.register;

        lfsrA.initialState = data.lfsr.a.initialState;
        lfsrA.polynomial = data.lfsr.a.polynomial;

        lfsrS.initialState = data.lfsr.s.initialState;
        lfsrS.polynomial = data.lfsr.s.polynomial;

        this.reset();
      });
    },
  },
  created() {
    this.lfsr.a.register = new LFSR(this.lfsr.a.initialState, this.lfsr.a.polynomial);
    this.lfsr.s.register = new LFSR(this.lfsr.s.initialState, this.lfsr.s.polynomial);
    this.mapLfsrs();
  },
};
</script>
