<template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="panel in panels" :key="panel.name">
      <v-expansion-panel-header v-text="panel.header"/>
      <v-expansion-panel-content>
        <p v-for="text in panel.content">{{text}}</p>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'InfoPanels',
  props: {
    panels: {
      type: Array,
      required: true,
    },
  },
};
</script>
