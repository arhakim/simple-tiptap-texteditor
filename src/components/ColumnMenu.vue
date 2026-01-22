<script setup lang="ts">
import { ref } from 'vue';

const maxCols = ref(6);
const cols = ref(0);

const emit = defineEmits<{ select: [number] }>();

function hoverCell(index: number) {
  cols.value = index + 1;
}

function selectColumns() {
  emit('select', cols.value);
}
</script>

<template>
  <div class="stte-menu">
    <div class="stte-column-row">
      <div
        v-for="index in maxCols"
        :key="index"
        class="stte-grid-cell"
        :class="{ 'stte-grid-cell-active': index <= cols }"
        @mouseenter="hoverCell(index - 1)"
        @click="selectColumns"
      />
    </div>
    <p class="stte-menu-label">{{ cols }} columns</p>
  </div>
</template>

<style scoped>
.stte-menu {
  padding: 8px;
}

.stte-column-row {
  display: flex;
  gap: 4px;
}

.stte-grid-cell {
  width: 20px;
  height: 20px;
  border: 1px solid #d4d4d8;
  border-radius: 4px;
  cursor: pointer;
}

.stte-grid-cell-active {
  background: #bfdbfe;
  border-color: #60a5fa;
}

.stte-menu-label {
  margin-top: 8px;
  font-size: 12px;
  color: #4b5563;
}
</style>
