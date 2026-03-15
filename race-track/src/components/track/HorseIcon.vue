<template>
  <span
    class="horse-icon"
    :style="{ color: color }"
    v-html="svgContent"
    aria-hidden="true"
  />
</template>

<script>
import horseSvg from '../../assets/horse.svg?raw';

export default {
  name: 'HorseIcon',
  props: {
    color: {
      type: String,
      default: '#888',
    },
  },
  setup() {
    return { svgContent: horseSvg };
  },
};
</script>

<style scoped>
.horse-icon :deep(svg) {
  display: block;
  width: 28px;
  height: auto;
  vertical-align: middle;
}
</style>
