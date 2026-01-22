<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Editor } from '@tiptap/core';

interface Props {
  editor: Editor | undefined;
  visible: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
  'update:modelValue': [value: string];
  error: [message: string];
}>();

const sourceContent = ref('');

watch(
  () => props.visible,
  (newVisible) => {
    if (newVisible && props.editor) {
      setSourceFromEditor();
    }
  },
);

function setSourceFromEditor() {
  sourceContent.value = formatHTML(props.editor?.getHTML() || '');
}

function applySourceToEditor() {
  try {
    emit('update:modelValue', sourceContent.value === '<p></p>' ? '' : sourceContent.value);
    emit('close');
  } catch (e) {
    emit('error', 'Failed to update source HTML');
  }
}

function formatHTML(html: string) {
  if (!html) return '';
  let formatted = html.replace(/>\s*</g, '><');
  formatted = formatted.replace(/></g, '>\n<');

  const lines = formatted.split('\n');
  const indentSize = 2;
  let indent = 0;
  const out: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const isClosingTag = /^<\//.test(line);
    const isOpeningTag = /^<(?!\/|\?|!)/.test(line);
    const isSelfClosing =
      /<[^>]+\/>$/.test(line) || /<(br|hr|img|input|meta|link|source)(\s|>)/i.test(line);

    if (isClosingTag) indent = Math.max(indent - 1, 0);

    out.push(' '.repeat(indent * indentSize) + line);

    if (isOpeningTag && !isSelfClosing) indent++;
  }

  return out.join('\n');
}

function formatSource() {
  sourceContent.value = formatHTML(sourceContent.value);
}
</script>

<template>
  <div v-if="visible" class="stte-modal">
    <div class="stte-modal-content">
      <div class="stte-modal-body">
        <textarea v-model="sourceContent" class="stte-textarea" spellcheck="false" />
      </div>
      <div class="stte-modal-footer">
        <button type="button" class="stte-btn" @click="formatSource">Format</button>
        <button type="button" class="stte-btn" @click="applySourceToEditor">Apply</button>
        <button type="button" class="stte-btn" @click="emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>
