<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useEditor, EditorContent, AnyExtension } from '@tiptap/vue-3';
import { Dropcursor } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import { TextStyleKit } from '@tiptap/extension-text-style';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import FileHandler from '@tiptap/extension-file-handler';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TableKit } from '@tiptap/extension-table';
import { Typography } from '../extensions/typographyExtensions';
import TableBubble from './TableBubble.vue';
import ImageBubble from './ImageBubble.vue';
import VideoBubble from './videoBubble.vue';
import SourceCodeModal from './SourceCodeModal.vue';
import Toolbars from './Toolbars.vue';

interface Props {
  modelValue?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  toolbarPosition?: 'top' | 'bottom';
  buttons?: string[] | string[][];
  uploadImage?: (file: File) => Promise<string>;
  onError?: (message: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: 'Start writing...',
  label: '',
  required: false,
  toolbarPosition: 'top',
  buttons: () => [
    'undo',
    'redo',
    'separator',
    'typography',
    'bold',
    'italic',
    'underline',
    'strike',
    'subscript',
    'superscript',
    'link',
    'bulletList',
    'orderedList',
    'separator',
    'table',
    'column',
    'image',
    'youtube',
    'separator',
    'textColor',
    'backgroundColor',
    'separator',
    'lineHeight',
    'heading',
    'list',
    'blockquote',
    'textAlign',
    'hardBreak',
    'separator',
    'fontFamily',
    'fontSize',
    'separator',
    'horizontalRule',
    'sourceCode',
    'code',
    'fullscreen',
  ],
  uploadImage: undefined,
  onError: undefined,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  error: [message: string];
}>();

const editor = useEditor({
  content: props.modelValue || '<p></p>',
  extensions: [
    Dropcursor.configure({
      color: '#68cef8',
    }),
    StarterKit.configure({
      link: {
        openOnClick: false,
        enableClickSelection: true,
      },
    }),
    TextStyleKit,
    TableKit.configure({
      table: {
        resizable: true,
        HTMLAttributes: { class: 'stte-table', border: 1 },
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({
      placeholder: ({ node }) => (node.type.name === 'paragraph' ? props.placeholder : ''),
    }),
    Subscript,
    Superscript,
    Typography,
    Youtube.configure({ controls: false, nocookie: true }),
    FileHandler.configure({
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
      /* onDrop: async (_currentEditor, files) => {
        for (const file of files) {
          await handleImageUpload(file);
        }
      }, */
      onPaste: async (_currentEditor, files, htmlContent) => {
        if (htmlContent) return false;
        for (const file of files) {
          await handleImageUpload(file);
        }
        return true;
      },
    }),
    Image.configure({
      HTMLAttributes: {
        style: 'max-width: 100%; height: auto; cursor: pointer;',
      } as Record<string, string>,
      allowBase64: false,
      inline: false,
      resize: {
        enabled: true,
        directions: ['top', 'bottom', 'left', 'right'], // can be any direction or diagonal combination
        minWidth: 50,
        minHeight: 50,
        alwaysPreserveAspectRatio: true,
      },
    }),
  ],
  onUpdate: ({ editor }) => {
    const html = editor.getHTML();
    emit('update:modelValue', html === '<p></p>' ? '' : html);
  },
  onSelectionUpdate: ({ editor }) => {
    const isImageSelected = editor.isActive('image');
    const isVideoSelected = editor.isActive('youtube');
    const isTable = editor.isActive('table') || editor.isActive('tableCell');
    showTableBubble.value = isTable && !isImageSelected && !isVideoSelected;

    imageMenuVisible.value = isImageSelected;
    videoMenuVisible.value = isVideoSelected;

    if (isImageSelected || isVideoSelected) {
      const { from, to } = editor.state.selection;
      const start = editor.view.coordsAtPos(from);
      const end = editor.view.coordsAtPos(to);
      const editorElement = editor.view.dom;
      const editorRect = editorElement.getBoundingClientRect();

      const centerX = editorRect.left + (start.left + end.left) / 2;
      const topY = editorRect.top + Math.min(start.top, end.top);

      if (isImageSelected) {
        imageMenuPosition.value = { x: centerX - 120, y: topY - 70 };
      }

      if (isVideoSelected) {
        videoMenuPosition.value = { x: centerX - 120, y: topY - 70 };
      }
    }
  },
});

const imageMenuVisible = ref(false);
const imageMenuPosition = ref({ x: 0, y: 0 });
const showTableBubble = ref(false);

const videoMenuVisible = ref(false);
const videoMenuPosition = ref({ x: 0, y: 0 });

const editorRoot = ref<HTMLElement | null>(null);
const isFullscreen = ref(false);
const previousBodyOverflow = ref<string | null>(null);

const showSource = ref(false);

let fullscreenChangeHandler: (() => void) | null = null;
let keydownHandler: ((e: KeyboardEvent) => void) | null = null;

watch(
  () => props.modelValue,
  (newValue) => {
    if (editor.value) {
      const currentContent = editor.value.getHTML();
      const normalizedNewValue = newValue || '<p></p>';
      // Only update editor content if there's a significant difference
      // This prevents overwriting content when the prop is synced from internal updates
      if (normalizedNewValue !== currentContent && !editor.value.isFocused) {
        editor.value.commands.setContent(normalizedNewValue);
      }
    }
  },
  { flush: 'post' },
);

watch(editor, (newEditor) => {
  if (newEditor) {
    const editorElement = newEditor.view.dom;
    editorElement.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'IMG') {
        const pos = newEditor.view.posAtDOM(target, 0);
        if (pos !== undefined) {
          newEditor.commands.setNodeSelection(pos);
        }
      }
    });
  }
});

function normalizeButtons(buttons: string[] | string[][] | undefined): string[][] {
  if (!buttons) return [];
  if (Array.isArray(buttons[0])) {
    return buttons as string[][];
  }
  return [buttons as string[]];
}

async function toggleFullscreen() {
  if (!isFullscreen.value) {
    const el: HTMLElement | Document = editorRoot.value || document.documentElement;
    try {
      if (el && el.requestFullscreen) {
        await el.requestFullscreen();
        isFullscreen.value = true;
      } else {
        previousBodyOverflow.value = document.body.style.overflow || null;
        document.body.style.overflow = 'hidden';
        isFullscreen.value = true;
      }
    } catch (e) {
      previousBodyOverflow.value = document.body.style.overflow || null;
      document.body.style.overflow = 'hidden';
      isFullscreen.value = true;
    }

    nextTick(() => {
      editor.value?.chain().focus().run();
    });
  } else {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      // ignore
    }

    isFullscreen.value = false;
    if (previousBodyOverflow.value !== null) {
      document.body.style.overflow = previousBodyOverflow.value;
      previousBodyOverflow.value = null;
    } else {
      document.body.style.overflow = '';
    }
  }
}

function onKeydown(e: KeyboardEvent) {
  if (isFullscreen.value && e.key === 'Escape') {
    toggleFullscreen();
  }
}

function openSource() {
  showSource.value = true;
}

async function handleImageUpload(file: File) {
  if (!file) return;
  if (!props.uploadImage) {
    notifyError(
      'No uploadImage handler supplied. Provide uploadImage(file) to enable image uploads.',
    );
    return;
  }

  try {
    const url = await props.uploadImage(file);
    editor.value
      ?.chain()
      .insertContentAt(editor.value?.state.selection.anchor, {
        type: 'image',
        attrs: { src: url },
      })
      .focus()
      .run();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image.';
    notifyError(errorMessage || 'Failed to upload image.');
  }
}

function notifyError(message: string) {
  emit('error', message);
  // eslint-disable-next-line no-console
  console.error(message);
}

function selectImage(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files && files.length > 0) {
    handleImageUpload(files[0]);
  }
  target.value = '';
}

onMounted(() => {
  keydownHandler = onKeydown;
  window.addEventListener('keydown', keydownHandler);

  fullscreenChangeHandler = () => {
    isFullscreen.value = !!document.fullscreenElement;
    if (!isFullscreen.value && previousBodyOverflow.value !== null) {
      document.body.style.overflow = previousBodyOverflow.value;
      previousBodyOverflow.value = null;
    }
  };

  document.addEventListener('fullscreenchange', fullscreenChangeHandler);
});

onUnmounted(() => {
  editor.value?.destroy();

  if (keydownHandler) {
    window.removeEventListener('keydown', keydownHandler);
    keydownHandler = null;
  }

  if (fullscreenChangeHandler) {
    document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    fullscreenChangeHandler = null;
  }

  if (previousBodyOverflow.value !== null) {
    document.body.style.overflow = previousBodyOverflow.value;
    previousBodyOverflow.value = null;
  }
});
</script>

<template>
  <div class="stte-wrapper">
    <label v-if="label" class="stte-label">
      <span>{{ label }}</span>
      <span v-if="required" class="stte-required">*</span>
    </label>

    <div
      ref="editorRoot"
      class="stte-editor"
      :class="{
        'te-fullscreen': isFullscreen,
      }"
      style="scrollbar-width: 2px"
    >
      <TableBubble v-if="showTableBubble" :editor="editor" @close="showTableBubble = false" />
      <ImageBubble
        :editor="editor"
        :visible="imageMenuVisible"
        :position="imageMenuPosition"
        @close="imageMenuVisible = false"
      />
      <VideoBubble
        :editor="editor"
        :visible="videoMenuVisible"
        :position="videoMenuPosition"
        @close="videoMenuVisible = false"
      />
      <SourceCodeModal
        :editor="editor"
        :visible="showSource"
        @close="showSource = false"
        @update:model-value="emit('update:modelValue', $event)"
        @error="emit('error', $event)"
      />

      <Toolbars
        v-if="toolbarPosition === 'top'"
        :editor="editor"
        :buttons="normalizeButtons(buttons)"
        :is-fullscreen="isFullscreen"
        @select-image="selectImage"
        @open-source="openSource"
        @toggle-fullscreen="toggleFullscreen"
      />

      <EditorContent :editor="editor" class="tiptap prose prose-sm stte-content" />

      <Toolbars
        v-if="toolbarPosition === 'bottom'"
        :editor="editor"
        :buttons="normalizeButtons(buttons)"
        :is-fullscreen="isFullscreen"
        @select-image="selectImage"
        @open-source="openSource"
        @toggle-fullscreen="toggleFullscreen"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../styles/editor.scss';
</style>
