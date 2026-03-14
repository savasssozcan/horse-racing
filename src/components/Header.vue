<template>
  <header class="header">
    <button
      class="btn btn-generate"
      :disabled="!canGenerate"
      @click="$store.dispatch('game/generateProgram')"
    >
      GENERATE PROGRAM
    </button>
    <button
      class="btn btn-start"
      :disabled="!canStart"
      @click="toggleRace"
    >
      {{ isRacing ? (isPaused ? 'START' : 'PAUSE') : 'START' }}
    </button>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Header',
  computed: {
    ...mapGetters('game', ['canGenerate', 'canStart', 'isRacing', 'isPaused']),
  },
  methods: {
    toggleRace() {
      if (this.isRacing && !this.isPaused) {
        this.$store.dispatch('game/setPaused', true);
      } else if (this.isRacing && this.isPaused) {
        this.$store.dispatch('game/setPaused', false);
      } else {
        this.$store.dispatch('game/setRacing', true);
        this.$store.dispatch('game/setPaused', false);
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
</style>
