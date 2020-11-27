<template>
  <v-card :loading="loading">
    <v-card-title class="heading">
      <v-icon v-if="icon" large class="mr-3" color="primary">mdi-{{icon}}</v-icon>
      {{title}}
      <v-spacer></v-spacer>
      <slot name="actions"></slot>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
