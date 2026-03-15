<template>
  <span class="color-badge">
    <span
      class="color-badge__dot"
      :style="{ backgroundColor: hexColor }"
      :aria-label="label"
    />
    <span v-if="showLabel" class="color-badge__label">{{ label }}</span>
  </span>
</template>

<script>
import { computed } from 'vue';
import { getColorHex } from '../../utils/colors';

export default {
  name: 'ColorBadge',
  props: {
    colorName: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const hexColor = computed(() => getColorHex(props.colorName));
    const label = computed(() => props.colorName || '—');
    return { hexColor, label };
  },
};
</script>

<style scoped>
.color-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.color-badge__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.color-badge__label {
  font-size: inherit;
}
</style>
