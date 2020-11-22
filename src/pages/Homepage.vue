<template>
    <v-row>
      <v-col cols="12" md="6" offset-md="3">
        <v-row>
          <v-col cols="12" sm="6" v-for="page in pages" :key="page.title">
            <v-card>
              <v-card-title>{{ page.title }}</v-card-title>
              <v-card-text>{{ page.description }}</v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn depressed text color="primary" :to="page.to">Go</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'Homepage',
  data() {
    return {
      pages: [
        {
          title: 'Nihilist substitution cipher',
          description: 'An easy-to-use tool for encrypting and decrypting texts using nihilist ciphers.',
          to: '/nihilist-substitution',
        },
        {
          title: 'Shrinking generator',
          description: 'Shrinking generator is a form of pseudorandom number generator intended to be used in a stream cipher.',
          to: '/shrinking-generator',
        },
      ],
    };
  },
};
</script>
