<template>
  <div class="error-message">
    <transition name="error-slide">
      <div class="error--text" v-show="!isValid">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseError',
  props: {
    isValid: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss">

.error-message {
  overflow: hidden;
  font-size: 12px;
  line-height: 12px;
  min-height: 14px;

  .error-slide-enter-active {
    animation: error-slide-in .2s;
  }

  .error-slide-leave-active {
    animation: error-slide-in .2s reverse;
  }

  @keyframes error-slide-in {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
}

</style>
