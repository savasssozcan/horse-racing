<template>
  <header class="header">
    <button
      class="btn btn-generate"
      :disabled="!canGenerate"
      @click="generateProgram"
    >
      GENERATE PROGRAM
    </button>
    <button
      class="btn btn-start"
      :disabled="!canStart && !isRacing"
      @click="toggleRace"
    >
      {{ startButtonLabel }}
    </button>
    <button
      class="btn btn-reset"
      :disabled="!canReset"
      @click="resetAll"
    >
      RESET
    </button>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters('program', ['canGenerate', 'canReset']),
    ...mapGetters('race', ['canStart', 'isRacing', 'isPaused']),
    startButtonLabel() {
      if (this.isRacing && this.isPaused) return 'CONTINUE';
      if (this.isRacing) return 'PAUSE';
      return 'START';
    },
  },
  methods: {
    ...mapActions('program', { generateProgram: 'generate', resetAll: 'reset' }),
    ...mapActions('race', ['setRacing', 'setPaused']),
    toggleRace() {
      if (this.isRacing && !this.isPaused) {
        this.setPaused(true);
      } else if (this.isRacing && this.isPaused) {
        this.setPaused(false);
      } else {
        this.setRacing(true);
        this.setPaused(false);
        this.$emit('start-race');
      }
    },
  },
};
</script>

<style scoped>
.header {
  background: #c0392b;
  padding: 12px 24px;
  display: flex;
  gap: 16px;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.btn {
  padding: 10px 24px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-generate {
  background: #fff;
  color: #c0392b;
}
.btn-start {
  background: #27ae60;
  color: #fff;
}
.btn-reset {
  background: #f39c12;
  color: #fff;
}
</style>
