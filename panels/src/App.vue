<template>
  <div class="panels-wrapper">
    <HorseList />
    <ProgramResults />
  </div>
</template>

<script>
import HorseList from './components/horse/HorseList.vue';
import ProgramResults from './components/ProgramResults.vue';

export default {
  name: 'PanelsApp',
  components: {
    HorseList,
    ProgramResults,
  },
};
</script>

<style scoped>
.panels-wrapper {
  display: flex;
  gap: 16px;
  min-width: 0;
  flex: 0 0 auto;
}
</style>
