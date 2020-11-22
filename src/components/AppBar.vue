<template>
  <v-app-bar app flat color="white">
    <v-btn
      v-if="!isHomepage"
      to="/"
      icon
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
    <v-spacer/>
    <v-dialog
      width="600px"
      v-if="!isHomepage"
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
        <portal-target name="app-info"/>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  computed: {
    isHomepage() {
      return this.$route.name === 'home';
    },
  },
};
</script>
