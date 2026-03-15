<template>
  <section class="panel" :class="panelClass">
    <h2 v-if="title" class="panel__title">{{ title }}</h2>
    <OverlayScrollbarsComponent
      v-if="$slots.default"
      class="panel__scroll"
      :options="scrollOptions"
      defer
    >
      <div class="panel__body">
        <slot />
      </div>
    </OverlayScrollbarsComponent>
    <p v-else-if="emptyText" class="panel__empty">{{ emptyText }}</p>
  </section>
</template>

<script>
import { computed } from 'vue';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';
import 'overlayscrollbars/overlayscrollbars.css';

const VARIANTS = ['default', 'program', 'results'];

const SCROLL_OPTIONS = {
  scrollbars: {
    theme: 'os-theme-dark',
    visibility: 'auto',
    autoHide: 'leave',
    autoHideDelay: 200,
    clickable: true,
  },
};

export default {
  name: 'Panel',
  components: { OverlayScrollbarsComponent },
  props: {
    title: {
      type: String,
      default: '',
    },
    variant: {
      type: String,
      default: 'default',
      validator: (v) => VARIANTS.includes(v),
    },
    emptyText: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const panelClass = computed(() => ({
      'panel--program': props.variant === 'program',
      'panel--results': props.variant === 'results',
    }));
    return { panelClass, scrollOptions: SCROLL_OPTIONS };
  },
};
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  min-height: 0;
  background: #16213e;
}
.panel--program {
  background: #1e3a5f;
}
.panel--results {
  background: #1a472a;
}
.panel__title {
  margin: 0 0 12px;
  font-size: 1.1rem;
  color: #fff;
  font-weight: 600;
  flex-shrink: 0;
}
.panel--program .panel__title {
  color: #7eb8da;
}
.panel--results .panel__title {
  color: #7dce82;
}
.panel__scroll {
  flex: 1 1 0;
  min-height: 0;
}
.panel__scroll :deep(.os-viewport) {
  overflow-x: hidden;
}
.panel__body {
  font-size: 0.85rem;
}
.panel__empty {
  color: #888;
  font-size: 0.9rem;
  margin: 0;
}
</style>
