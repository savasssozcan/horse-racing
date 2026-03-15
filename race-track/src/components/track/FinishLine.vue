<template>
  <div class="finish-line" aria-label="Finish line">
    <span class="finish-line__label">FINISH</span>
  </div>
</template>

<script>
export default {
  name: 'FinishLine',
};
</script>

<style scoped>
.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 24px;
  background: #0f3460;
  border-left: 2px solid #7eb8da;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 4px;
}
.finish-line__label {
  font-weight: bold;
  color: #7eb8da;
  font-size: 0.7rem;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  letter-spacing: 1px;
  transform: rotate(180deg);
}
</style>
