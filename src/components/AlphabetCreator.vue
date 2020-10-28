<template>
  <v-card>

    <v-card-text>
      <v-select
        v-model="selectedPresets"
        :items="presets"
        item-text="name"
        item-value="characters"
        label="Alphabet presets"
        hint="Create an alphabet from presets"
        multiple
        persistent-hint
        dense
      >
        <template v-slot:selection="{ item, index }">
          <span v-if="index === 0">
            Selected {{ selectedPresets.length }} presets ({{ selectedCharactersCount }} characters)
          </span>
        </template>
      </v-select>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="primary"
        text
        @click="close"
      >
        Cancel
      </v-btn>
      <v-btn
        color="primary"
        text
        @click="create"
      >
        Create
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: 'AlphabetCreator',
  data() {
    return {
      menu: false,
      selectedPresets: [],
      presets: [
        {
          name: 'Small letters',
          characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        },
        {
          name: 'Big letters',
          characters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        },
        {
          name: 'Small polish letters',
          characters: ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'],
        },
        {
          name: 'Big polish letters',
          characters: ['Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż'],
        },
        {
          name: 'Numbers',
          characters: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        },
        {
          name: 'Special characters',
          characters: ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', '\'', '/', ':', ';', '"', '\'', '<', '>', ',', '.', '?'],
        },
      ],
    };
  },
  computed: {
    selectedCharactersCount() {
      return this.selectedPresets.reduce((count, preset) => count + preset.length, 0);
    },
  },
  methods: {
    close() {
      this.$emit('close');
      this.selectedPresets = [];
    },
    create() {
      if (this.selectedPresets.length === 0) return;

      const createdAlphabet = this.selectedPresets.flat();
      const createdAlphabetTargetSize = Math.ceil(Math.sqrt(createdAlphabet.length));
      const newEmptyEntries = Array.from({ length: createdAlphabetTargetSize * createdAlphabetTargetSize - createdAlphabet.length }, () => '');

      this.$emit('input', [...createdAlphabet, ...newEmptyEntries]);
      this.close();
    },
  },
};
</script>

<style scoped>

</style>
