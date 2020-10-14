<template>
  <v-app>

    <v-app-bar app flat>
      Nihilist substitution
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <DataForm/>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <AlgorithmSimulator/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import DataForm from './components/DataForm';
import AlgorithmSimulator from './components/AlgorithmSimulator';

export default {
  name: 'App',
  components: {
    DataForm,
    AlgorithmSimulator,
  },
};
</script>
