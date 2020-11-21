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
        <lfsr-editor class="mt-3" :lfsr="lfsr1.register" name="LFSR-1"/>
        <v-divider/>
        <lfsr-editor class="mt-3" :lfsr="lfsr2.register" name="LFSR-2"/>
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
            <v-text-field type="number" filled hide-details dense label="Clock interval (ms)" :readonly="isRunning" v-model="clockInterval"/>
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
        <v-textarea readonly filled dense hide-details height="200" label="Generated bits" class="mb-3" :value="result"/>
        <v-textarea readonly filled dense hide-details height="100" label="Decimal result" :value="resultDecimal"/>
      </base-card>
    </v-col>
  </v-row>
</template>

<script>
import BaseCard from '@/components/base/BaseCard';
import LFSR from '@/components/algorithms/lfsr';
import fileDownload from 'js-file-download';
import LfsrEditor from "@/components/LfsrEditor";

export default {
  name: 'ShrinkingGenerator',
  components: {LfsrEditor, BaseCard },
  data() {
    return {
      lfsr1: new LFSR('01100100100100110100001011010010010101', [0, 1, 4, 6, 7, 12, 18]),
      lfsr2: new LFSR('10101000010010001001111010010010010001', [4, 1, 6, 9, 11, 17, 14]),
      clockInterval: 100,
      clock: null,
      generatedDigitsTarget: 20000,
      generatedDigits: 0,
      result: '',
    };
  },
  watch: {
    generatedDigits: {
      immediate: true,
      handler(v) {
        console.log(v);
      },
    },
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
      const a = this.lfsr1.next();
      const b = this.lfsr2.next();

      if (a === 0) return;

      this.result = b + this.result;
      this.generatedDigits++;
    },
    run() {
      while (this.generatedDigits < this.generatedDigitsTarget) this.tick();
    },
    reset() {
      this.stopClock();

      this.result = '';
      this.generatedDigits = 0;

      this.lfsr1.reset();
      this.lfsr2.reset();
    },
    downloadResult() {
      if (this.isDone) fileDownload(this.result, 'shrinking-generator-result.txt');
    },
  },
};
</script>
