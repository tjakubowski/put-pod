<template>
  <v-app-bar app flat color="white">
    <v-toolbar-title>Nihilist substitution</v-toolbar-title>
    <v-spacer/>
    <v-dialog
      v-model="helpDialog"
      width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          icon
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Jak to działa?</span>
        </v-card-title>
        <help-panels/>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import HelpPanels from "@/components/HelpPanels";
export default {
  name: 'AppBar',
  components: {HelpPanels},
  data() {
    return {
      helpDialog: false,
    };
  },
};
</script>

<style scoped>

</style>
