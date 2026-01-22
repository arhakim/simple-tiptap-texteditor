<script setup lang="ts">
const props = defineProps<{ editor: any }>();

defineEmits<{ close: [] }>();

function cmd(action: string) {
  props.editor?.chain().focus()[action]().run();
}
</script>

<template>
  <div v-if="editor" class="stte-bubble stte-table-bubble">
    <div class="stte-bubble-buttons">
      <button type="button" class="stte-btn stte-btn-danger" @click="cmd('unsetColumns')">
        Delete Column Layout
      </button>
      <button type="button" class="stte-btn" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<style scoped>
.stte-bubble {
  position: absolute;
  top: 90px;
  left: 12px;
  z-index: 40;
  background: #fff;
  border: 1px solid #d4d4d8;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
  padding: 6px;
}

.stte-bubble-buttons {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.stte-btn {
  padding: 6px 10px;
  border: 1px solid #d4d4d8;
  background: #f8fafc;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
}

.stte-btn:hover {
  background: #e2e8f0;
}

.stte-btn-danger {
  border-color: #fecdd3;
  background: #fff1f2;
  color: #b91c1c;
}
</style>
