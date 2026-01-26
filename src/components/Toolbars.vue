<script setup lang="ts">
import { ref } from 'vue';
import TableMenu from './TableMenu.vue';

const props = defineProps<{
  editor: any;
  buttons: string[][];
  isFullscreen?: boolean;
}>();

const emit = defineEmits<{
  'open-source': [];
  'toggle-fullscreen': [];
  'select-image': [event: Event];
}>();

const openMenu = ref<string | null>(null);
const colorButton = ref('');
const colorInputRefs = ref<{ [key: string]: HTMLInputElement }>({});
const imageInput = ref<HTMLInputElement | null>(null);
const fontSize = ref(14);
const lineHeight = ref(1);

const buttonList = [
  { name: 'typography', title: 'Typography', dataType: 'dropdown', onClick: () => {} },
  {
    name: 'bold',
    title: 'Bold',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleBold().run(),
  },
  {
    name: 'italic',
    title: 'Italic',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleItalic().run(),
  },
  {
    name: 'strike',
    title: 'Strikethrough',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleStrike().run(),
  },
  {
    name: 'underline',
    title: 'Underline',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleUnderline().run(),
  },
  {
    name: 'subscript',
    title: 'Subscript',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleSubscript().run(),
  },
  {
    name: 'superscript',
    title: 'Superscript',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleSuperscript().run(),
  },
  { name: 'link', title: 'Link', dataType: 'button', onClick: () => setLink() },
  {
    name: 'textColor',
    title: 'Text Color',
    dataType: 'color',
    onClick: () => colorInputClick('textColor'),
  },
  {
    name: 'backgroundColor',
    title: 'Background Color',
    dataType: 'color',
    onClick: () => colorInputClick('backgroundColor'),
  },
  { name: 'heading', title: 'Heading', dataType: 'dropdown', onClick: () => {} },
  { name: 'list', title: 'List', dataType: 'dropdown', onClick: () => {} },
  {
    name: 'bulletList',
    title: 'Bullet List',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleBulletList().run(),
  },
  {
    name: 'orderedList',
    title: 'Ordered List',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleOrderedList().run(),
  },
  {
    name: 'blockquote',
    title: 'Blockquote',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleBlockquote().run(),
  },
  { name: 'textAlign', title: 'Text Align', dataType: 'dropdown', onClick: () => {} },
  {
    name: 'fontSize',
    title: 'Font Size',
    placeholder: '14',
    dataType: 'number',
    step: 1,
    min: 8,
    onChange: (e: Event) => {
      const input = e.target as HTMLInputElement;
      const value = parseInt(input.value);
      fontSize.value = value;
      props.editor?.chain().focus().setFontSize(`${value}px`).run();
    },
  },
  { name: 'fontFamily', title: 'Font Family', dataType: 'dropdown', onClick: () => {} },
  {
    name: 'image',
    title: 'Image',
    dataType: 'image',
    onClick: () => {
      imageInput.value?.click();
    },
  },
  { name: 'youtube', title: 'YouTube', dataType: 'button', onClick: () => insertYoutube() },
  { name: 'table', title: 'Table', dataType: 'table', onClick: () => hasTable() },
  {
    name: 'code',
    title: 'Code',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().toggleCode().run(),
  },
  {
    name: 'sourceCode',
    title: 'Source Code',
    dataType: 'button',
    onClick: () => emit('open-source'),
  },
  {
    name: 'undo',
    title: 'Undo',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().undo().run(),
  },
  {
    name: 'redo',
    title: 'Redo',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().redo().run(),
  },
  {
    name: 'fullscreen',
    title: 'Fullscreen',
    dataType: 'button',
    onClick: () => emit('toggle-fullscreen'),
  },
  {
    name: 'lineHeight',
    title: 'Line Height',
    placeholder: 'Line Height',
    dataType: 'number',
    step: 0.5,
    min: 1,
    onChange: (e: Event) => {
      const input = e.target as HTMLInputElement;
      const value = parseFloat(input.value);
      lineHeight.value = value;
      props.editor?.chain().focus().setLineHeight(value).run();
    },
  },
  {
    name: 'hardBreak',
    title: 'Hard Break',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().setHardBreak().run(),
  },
  {
    name: 'horizontalRule',
    title: 'Horizontal Rule',
    dataType: 'button',
    onClick: () => props.editor?.chain().focus().setHorizontalRule().run(),
  },
];

const typographyItems = [
  { label: 'UPPERCASE', onSelect: () => props.editor?.chain().focus().toUppercase().run() },
  { label: 'lowercase', onSelect: () => props.editor?.chain().focus().toLowercase().run() },
  { label: 'Capital Case', onSelect: () => props.editor?.chain().focus().toTitleCase().run() },
  { label: 'Sentence case', onSelect: () => props.editor?.chain().focus().toSentenceCase().run() },
  { label: 'snake_case', onSelect: () => props.editor?.chain().focus().toSnakeCase().run() },
  { label: 'kebab-case', onSelect: () => props.editor?.chain().focus().toKebabCase().run() },
];

const alignItems = [
  { label: 'Align Left', onSelect: () => props.editor?.chain().focus().setTextAlign('left').run() },
  {
    label: 'Align Center',
    onSelect: () => props.editor?.chain().focus().setTextAlign('center').run(),
  },
  {
    label: 'Align Right',
    onSelect: () => props.editor?.chain().focus().setTextAlign('right').run(),
  },
  { label: 'Justify', onSelect: () => props.editor?.chain().focus().setTextAlign('justify').run() },
];

const headingItems = [
  {
    label: 'Heading 1',
    onSelect: () =>
      props.editor?.chain().focus().toggleNode('heading', 'paragraph', { level: 1 }).run(),
  },
  {
    label: 'Heading 2',
    onSelect: () =>
      props.editor?.chain().focus().toggleNode('heading', 'paragraph', { level: 2 }).run(),
  },
  {
    label: 'Heading 3',
    onSelect: () =>
      props.editor?.chain().focus().toggleNode('heading', 'paragraph', { level: 3 }).run(),
  },
];

const listItems = [
  { label: 'Bullet List', onSelect: () => props.editor?.chain().focus().toggleBulletList().run() },
  {
    label: 'Ordered List',
    onSelect: () => props.editor?.chain().focus().toggleOrderedList().run(),
  },
];

const fontFamilyItems = [
  { label: 'Arial', onSelect: () => props.editor?.chain().focus().setFontFamily('Arial').run() },
  {
    label: 'Helvetica',
    onSelect: () => props.editor?.chain().focus().setFontFamily('Helvetica').run(),
  },
  {
    label: 'Times New Roman',
    onSelect: () => props.editor?.chain().focus().setFontFamily('Times New Roman').run(),
  },
  {
    label: 'Georgia',
    onSelect: () => props.editor?.chain().focus().setFontFamily('Georgia').run(),
  },
  {
    label: 'Palatino',
    onSelect: () => props.editor?.chain().focus().setFontFamily('Palatino').run(),
  },
  {
    label: 'Garamond',
    onSelect: () => props.editor?.chain().focus().setFontFamily('Garamond').run(),
  },
  {
    label: 'Comic Sans MS',
    onSelect: () => props.editor?.chain().focus().setFontFamily('Comic Sans MS').run(),
  },
  {
    label: 'Trebuchet MS',
    onSelect: () => props.editor?.chain().focus().setFontFamily('Trebuchet MS').run(),
  },
  {
    label: 'Verdana',
    onSelect: () => props.editor?.chain().focus().setFontFamily('Verdana').run(),
  },
  {
    label: 'Courier New',
    onSelect: () => props.editor?.chain().focus().setFontFamily('Courier New').run(),
  },
];

const tableMenuItems = [
  { label: 'Add Row', onClick: () => props.editor?.chain().focus().addRowAfter().run() },
  { label: 'Delete Row', onClick: () => props.editor?.chain().focus().deleteRow().run() },
  { label: 'Add Column', onClick: () => props.editor?.chain().focus().addColumnAfter().run() },
  { label: 'Delete Column', onClick: () => props.editor?.chain().focus().deleteColumn().run() },
];

function hasTable() {
  let hasTableNode = false;
  props.editor?.state.doc.nodesBetween(0, props.editor.state.doc.content.size, (node: any) => {
    if (node.type.name === 'table') {
      hasTableNode = true;
      return false;
    }
    return undefined;
  });
  return hasTableNode;
}

function colorInputClick(button: string) {
  colorButton.value = button;
  colorInputRefs.value[`input_${button}`]?.click();
}

function insertYoutube() {
  const url = window.prompt('Enter YouTube URL:');
  if (url) {
    props.editor.chain().focus().setYoutubeVideo({ src: url }).run();
  }
}

function setLink() {
  const previousUrl = props.editor?.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);
  if (url === null) return;

  if (url === '') {
    props.editor?.chain().focus().extendMarkRange('link').unsetMark('link').run();
    return;
  }

  props.editor?.chain().focus().extendMarkRange('link').setMark('link', { href: url }).run();
}

function insertTable(rows?: number, cols?: number, header?: boolean) {
  props.editor
    ?.chain()
    .focus()
    .insertTable({ rows: rows ?? 3, cols: cols ?? 3, withHeaderRow: header })
    .run();
  openMenu.value = null;
}

function isButtonExist(name: string) {
  return buttonList.find((btn) => btn.name === name);
}

function getButton(name: string) {
  return buttonList.find((btn) => btn.name === name);
}

function onColorChange(e: Event) {
  const input = e.target as HTMLInputElement;
  const color = input.value;
  if (!color) return;

  if (colorButton.value === 'textColor') {
    props.editor?.chain().focus().setColor(color).run();
  } else if (colorButton.value === 'backgroundColor') {
    props.editor?.chain().focus().setBackgroundColor(color).run();
  }
  openMenu.value = null;
}

function getDropdownItems(name: string) {
  const dropdownMap: Record<string, any[]> = {
    typography: typographyItems,
    heading: headingItems,
    list: listItems,
    textAlign: alignItems,
    fontFamily: fontFamilyItems,
  };
  return dropdownMap[name] ?? [];
}

function toggleMenu(menuKey: string) {
  openMenu.value = openMenu.value === menuKey ? null : menuKey;
}
</script>

<template>
  <div class="stte-toolbar" :class="{ 'stte-toolbar-fullscreen': isFullscreen }">
    <div v-for="(buttonRow, rowIndex) in buttons" :key="rowIndex" class="stte-toolbar-row">
      <template v-for="(button, buttonIndex) in buttonRow" :key="`${rowIndex}-${buttonIndex}`">
        <span v-if="button === 'separator'" class="stte-divider" />

        <template v-else>
          <button
            v-if="
              isButtonExist(button) &&
              ['button', 'color', 'image'].includes(getButton(button)?.dataType as string)
            "
            type="button"
            class="stte-btn"
            :class="{ 'stte-btn-active': editor?.isActive(button) }"
            @click="(getButton(button) as any)?.onClick()"
          >
            {{ getButton(button)?.title }}
          </button>

          <div
            v-if="isButtonExist(button) && getButton(button)?.dataType === 'dropdown'"
            class="stte-dropdown"
          >
            <button
              type="button"
              class="stte-btn"
              @click="toggleMenu(`${button}-${rowIndex}-${buttonIndex}`)"
            >
              {{ getButton(button)?.title }}
            </button>
            <div
              v-if="openMenu === `${button}-${rowIndex}-${buttonIndex}`"
              class="stte-dropdown-menu"
            >
              <button
                v-for="(item, idx) in getDropdownItems(button)"
                :key="idx"
                type="button"
                class="stte-dropdown-item"
                @click="
                  item.onSelect();
                  openMenu = null;
                "
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <div
            v-if="isButtonExist(button) && getButton(button)?.dataType === 'table'"
            class="stte-dropdown"
          >
            <button
              type="button"
              class="stte-btn"
              @click="toggleMenu(`${button}-${rowIndex}-${buttonIndex}`)"
            >
              {{ getButton(button)?.title }}
            </button>
            <div
              v-if="openMenu === `${button}-${rowIndex}-${buttonIndex}`"
              class="stte-dropdown-menu"
            >
              <div class="stte-dropdown-section">
                <div class="stte-menu-title">Insert Table</div>
                <TableMenu
                  @select="(value: any) => insertTable(value.rows, value.cols, value.withHeader)"
                />
              </div>
              <div v-if="hasTable()" class="stte-dropdown-section">
                <div class="stte-menu-title">Table actions</div>
                <button
                  v-for="(tableBtn, idx) in tableMenuItems"
                  :key="idx"
                  type="button"
                  class="stte-dropdown-item"
                  @click="tableBtn.onClick()"
                >
                  {{ tableBtn.label }}
                </button>
              </div>
            </div>
          </div>

          <input
            v-if="isButtonExist(button) && getButton(button)?.dataType === 'number'"
            type="number"
            class="stte-input"
            :placeholder="getButton(button)?.placeholder"
            :step="getButton(button)?.step"
            :min="getButton(button)?.min"
            :value="button === 'fontSize' ? fontSize : lineHeight"
            @input="(getButton(button) as any)?.onChange($event)"
            @keydown.enter.prevent
          />

          <input
            v-if="isButtonExist(button) && getButton(button)?.dataType === 'color'"
            :ref="(el) => (colorInputRefs[`input_${button}`] = el as HTMLInputElement)"
            type="color"
            class="stte-color-input"
            aria-label="Pick color"
            @input="onColorChange"
            @keydown.enter.prevent
          />
        </template>
      </template>
    </div>

    <input
      :ref="(el) => (imageInput = el as HTMLInputElement | null)"
      type="file"
      accept="image/*"
      class="stte-hidden-input"
      @change="$emit('select-image', $event)"
    />
  </div>
</template>

<style scoped>
.stte-toolbar {
  border-bottom: 1px solid #e4e4e7;
  background: #f8fafc;
  position: sticky;
  top: 0;
  z-index: 2;
}

.stte-toolbar-fullscreen {
  background: #f3f4f6;
}

.stte-toolbar-row {
  display: flex;
  gap: 6px;
  padding: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.stte-btn {
  padding: 6px 10px;
  border: 1px solid #d4d4d8;
  background: #ffffff;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.stte-btn:hover {
  background: #f1f5f9;
}

.stte-btn-active {
  background: #e0f2fe;
  border-color: #7dd3fc;
}

.stte-divider {
  width: 1px;
  height: 20px;
  background: #e4e4e7;
  margin: 0 4px;
}

.stte-input {
  width: 72px;
  padding: 4px 6px;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  font-size: 13px;
}

.stte-color-input {
  width: 1px;
  height: 1px;
  border: 1px solid #d4d4d8;
  border-radius: 6px;
  padding: 0;
  cursor: pointer;
  visibility: hidden;
}

.stte-dropdown {
  position: relative;
  display: inline-block;
}

.stte-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  min-width: 200px;
  background: #ffffff;
  border: 1px solid #e4e4e7;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  padding: 8px;
  z-index: 20;
}

.stte-dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 6px 10px;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.stte-dropdown-item:hover {
  background: #f1f5f9;
  border-color: #e4e4e7;
}

.stte-dropdown-section + .stte-dropdown-section {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid #e4e4e7;
}

.stte-menu-title {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stte-hidden-input {
  display: none;
}
</style>
