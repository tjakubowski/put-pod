<template>
  <v-app>

    <v-main>
      <v-container fluid>
        <app-bar/>
        <router-view/>
      </v-container>
    </v-main>

    <app-footer/>

  </v-app>
</template>

<script>
import AppBar from '@/components/AppBar';
import AppFooter from '@/components/AppFooter';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppBar,
  },
};
</script>

<style lang="scss">
.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}

.v-icon--rotate {
  transform: rotate(180deg);
}
</style>
