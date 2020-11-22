<template>
  <v-row>
    <v-col cols="12" md="6" lg="3">
      <base-card title="Input data" icon="text-subject">
        <v-text-field class="mt-3"
                      dense
                      outlined
                      clearable
                      type="number"
                      label="Bits to generate"
                      :rules="generatedDigitsRules"
                      v-model.number="generatedDigitsTarget"
        />
        <v-divider/>
        <lfsr-editor class="mt-3" :lfsr="lfsrA" name="LFSR-A"/>
        <v-divider/>
        <lfsr-editor class="mt-3" :lfsr="lfsrS" name="LFSR-S"/>
      </base-card>
    </v-col>
    <v-col cols="12" md="6" lg="3">
      <base-card title="Clock control" icon="update">
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
            <v-btn text @click="stopClock" block outlined :disabled="!isRunning || isDone">Stop</v-btn>
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
        <LfsrViewer :lfsrA="lfsrA" :lfsrS="lfsrS"/>
        <v-textarea readonly outlined dense hide-details height="200" label="Generated bits" class="mb-3" :value="result"/>
        <v-textarea readonly outlined dense hide-details height="100" label="Decimal result" :value="resultDecimal"/>
      </base-card>
    </v-col>
  </v-row>
</template>

<script>
import BaseCard from '@/components/base/BaseCard';
import LFSR from '@/components/algorithms/lfsr';
import fileDownload from 'js-file-download';
import LfsrEditor from '@/components/LfsrEditor';
import LfsrViewer from '@/components/LfsrViewer';

export default {
  name: 'ShrinkingGenerator',
  components: { LfsrViewer, LfsrEditor, BaseCard },
  data() {
    return {
      lfsrA: {
        state: [],
        initialState: '100001010010110111010111010',
        polynomial: [0, 1, 5, 8],
      },
      lfsrS: {
        state: [],
        initialState: '10101000010010001001111010010010010001',
        polynomial: [4, 1, 6, 9, 11, 17, 14],
      },
      clockInterval: 100,
      clock: null,
      generatedDigitsTarget: 20000,
      generatedDigits: 0,
      generatedDigitsRules: [
        (v) => !!v || 'Bits to generate must be a number greater than 0',
      ],
      result: '',
    };
  },
  computed: {
    isRunning() {
      return !!this.clock;
    },
    isDone() {
      return this.generatedDigitsTarget === this.generatedDigits;
    },
    resultDecimal() {
      return this.result.length > 0 ? BigInt(`0b${this.result}`) : '';
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
      const a = this.lfsrA.register.next();
      const s = this.lfsrS.register.next();

      this.mapLfsrs();
      if (s === 0) return;

      this.result = a + this.result;
      this.generatedDigits++;
    },
    run() {
      while (this.generatedDigits < this.generatedDigitsTarget) this.tick();
    },
    reset() {
      this.stopClock();

      this.result = '';
      this.generatedDigits = 0;

      this.lfsrA.register.reset();
      this.lfsrS.register.reset();

      this.mapLfsrs();
    },
    mapLfsrs() {
      const properties = ['state', 'polynomial'];

      properties.forEach((property) => { this.lfsrA[property] = this.lfsrA.register[property]; });
      properties.forEach((property) => { this.lfsrS[property] = this.lfsrS.register[property]; });
    },
    downloadResult() {
      if (this.isDone) fileDownload(this.result, 'shrinking-generator-result.txt');
    },
  },
  created() {
    this.lfsrA.register = new LFSR(this.lfsrA.initialState, this.lfsrA.polynomial);
    this.lfsrS.register = new LFSR(this.lfsrS.initialState, this.lfsrS.polynomial);
    this.mapLfsrs();
  },
};
</script>
