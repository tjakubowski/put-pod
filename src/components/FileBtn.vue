<template>
<v-btn v-bind="$attrs" @click="onClick" :loading="isSelecting">
  <slot></slot>
  <input
    ref="fileInput"
    class="d-none"
    type="file"
    :accept="accept"
    @change="onFileChanged"
  >
</v-btn>
</template>

<script>
export default {
  name: 'FileBtn',
  props: {
    accept: {
      type: String,
    },
  },
  data() {
    return {
      isSelecting: false,
    };
  },
  methods: {
    onClick(e) {
      this.isSelecting = true;

      window.addEventListener('focus', () => {
        this.isSelecting = false;
      }, { once: true });

      this.$refs.fileInput.click();
      this.$emit('click', e);
    },
    onFileChanged(e) {
      this.$emit('input', e.target.files[0]);
    },
  },
};
</script>
