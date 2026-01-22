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

const videoWidth = ref('');
const videoHeight = ref('');

function applyVideoSize() {
  const attrs: Record<string, number> = {};
  if (videoWidth.value?.trim()) {
    const width = parseInt(videoWidth.value.trim(), 10);
    if (!Number.isNaN(width)) attrs.width = width;
  }
  if (videoHeight.value?.trim()) {
    const height = parseInt(videoHeight.value.trim(), 10);
    if (!Number.isNaN(height)) attrs.height = height;
  }

  if (Object.keys(attrs).length > 0) {
    props.editor?.chain().focus().updateAttributes('youtube', attrs).run();
  }
  closeVideoMenu();
}

function closeVideoMenu() {
  videoWidth.value = '';
  videoHeight.value = '';
  emit('close');
}
</script>

<template>
  <div
    v-if="visible"
    class="video-bubble-menu stte-floating-menu"
    :style="{ left: `${position.x}px`, top: `${position.y}px` }"
  >
    <div class="stte-inline-field">
      <label class="stte-inline-label">W</label>
      <input
        v-model="videoWidth"
        class="stte-inline-input"
        placeholder="560"
        @keydown.enter.prevent
      />
    </div>
    <div class="stte-inline-field">
      <label class="stte-inline-label">H</label>
      <input
        v-model="videoHeight"
        class="stte-inline-input"
        placeholder="315"
        @keydown.enter.prevent
      />
    </div>
    <button type="button" class="stte-btn" @click="applyVideoSize">Apply</button>
    <button type="button" class="stte-btn" @click="closeVideoMenu">Cancel</button>
  </div>
</template>
