<script setup lang="ts">
import { ref } from 'vue';

const maxRows = ref(8);
const maxCols = ref(5);

const rows = ref(0);
const cols = ref(0);
const withHeader = ref(false);

const emit = defineEmits<{ select: [{ rows: number; cols: number; withHeader: boolean }] }>();

function hoverCell(index: number) {
  rows.value = Math.floor(index / maxCols.value) + 1;
  cols.value = (index % maxCols.value) + 1;

  if (rows.value === maxRows.value) maxRows.value++;
  if (cols.value === maxCols.value) maxCols.value++;
}

function selectTable() {
  emit('select', {
    rows: rows.value,
    cols: cols.value,
    withHeader: withHeader.value,
  });
}
</script>

<template>
  <div class="stte-menu">
    <label class="stte-checkbox">
      <input v-model="withHeader" type="checkbox" />
      <span>With header</span>
    </label>

    <div class="stte-grid" :style="{ gridTemplateColumns: `repeat(${maxCols}, 20px)` }">
      <div
        v-for="index in maxRows * maxCols"
        :key="index"
        class="stte-grid-cell"
        :class="{
          'stte-grid-cell-active':
            Math.floor((index - 1) / maxCols) < rows && (index - 1) % maxCols < cols,
        }"
        @mouseenter="hoverCell(index - 1)"
        @click="selectTable"
      />
    </div>

    <p class="stte-menu-label">{{ rows }} × {{ cols }}</p>
  </div>
</template>

<style scoped>
.stte-menu {
  padding: 8px;
}

.stte-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  margin-bottom: 8px;
}

.stte-grid {
  display: grid;
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
