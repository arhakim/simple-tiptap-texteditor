<script setup lang="ts">
import { ref } from 'vue';
import type { Editor } from '@tiptap/core';

interface Props {
  editor: Editor | undefined;
  visible: boolean;
  position: { x: number; y: number };
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const imageWidth = ref('');
const imageHeight = ref('');

function applyImageSize() {
  const attrs: Record<string, string> = {};
  if (imageWidth.value?.trim()) attrs.width = imageWidth.value.trim();
  if (imageHeight.value?.trim()) attrs.height = imageHeight.value.trim();

  if (Object.keys(attrs).length > 0) {
    props.editor?.chain().focus().updateAttributes('image', attrs).run();
  }
  closeImageMenu();
}

function closeImageMenu() {
  imageWidth.value = '';
  imageHeight.value = '';
  emit('close');
}
</script>

<template>
  <div
    v-if="visible"
    class="image-bubble-menu stte-floating-menu"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
  >
    <div class="stte-inline-field">
      <label class="stte-inline-label">W</label>
      <input
        v-model="imageWidth"
        class="stte-inline-input"
        placeholder="auto"
        @keydown.enter.prevent
      />
    </div>
    <div class="stte-inline-field">
      <label class="stte-inline-label">H</label>
      <input
        v-model="imageHeight"
        class="stte-inline-input"
        placeholder="auto"
        @keydown.enter.prevent
      />
    </div>
    <button type="button" class="stte-btn" @click="applyImageSize">Apply</button>
    <button type="button" class="stte-btn" @click="closeImageMenu">Cancel</button>
  </div>
</template>
