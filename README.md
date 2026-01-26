# simple-tiptap-texteditor

A lightweight, preconfigured TipTap text editor Vue 3 component with optional fullscreen and source-edit modes. Ships as a standalone package you can install via `npm`, `pnpm`, or `git clone`.

## Installation

Install directly from GitHub
```bash
npm install arhakim/simple-tiptap-texteditor
```

To install a specific release version:
```bash
npm install arhakim/simple-tiptap-texteditor#v0.1.0
```

or add it manually to `package.json`
```json
"dependencies": {
  "simple-tiptap-texteditor": "github:arhakim/simple-tiptap-texteditor#v0.1.0"
  ...
}
```

## Quick start

```vue
<script setup lang="ts">
import { TextEditor } from 'simple-tiptap-texteditor';
import 'simple-tiptap-texteditor/styles';

const content = ref('');

async function uploadImage(file: File) {
  // Return a public URL for the uploaded file
  const url = await myUploader(file);
  return url;
}

// Optional: customize toolbar buttons
const toolbarButtons = ['bold', 'italic', 'underline', 'separator', 'bulletList', 'orderedList'];

// display toolbar buttons more than one row
// const toolbarButtons = [
//    ['bold', 'italic', 'underline'],
//    ['bulletList', 'orderedList'],
// ];
</script>

<template>
  <TextEditor
    v-model="content"
    label="Body"
    :required="true"
    :upload-image="uploadImage"
    :buttons="toolbarButtons"
  />
</template>
```

## Props

- `modelValue` (`string`) – HTML value for v-model.
- `placeholder` (`string`) – Placeholder for empty paragraphs.
- `label` (`string`) – Optional label shown above the editor.
- `required` (`boolean`) – Adds a required marker next to the label.
- `toolbarPosition` (`'top' | 'bottom'`) – Where to render the toolbar (default `top`).
- `buttons` (`string[] | string[][]`) – Toolbar layout; either a flat list or array of rows. Use `separator` to add dividers.
- `uploadImage` (`(file: File) => Promise<string>`) – Provide a handler to upload images and return a URL. When omitted, image uploads are disabled with a console warning.
- `onError` (`(message: string) => void`) – Optional callback invoked on recoverable errors.

## Available Toolbar Buttons

You can customize the toolbar using any of these button names in the `buttons` prop:

- `undo` – Undo last action
- `redo` – Redo last action
- `typography` – Text case transformations (uppercase, lowercase, capitalize)
- `bold` – Bold text
- `italic` – Italic text
- `underline` – Underline text
- `strike` – Strikethrough text
- `subscript` – Subscript text
- `superscript` – Superscript text
- `link` – Insert/edit links
- `bulletList` – Bullet list
- `orderedList` – Numbered list
- `table` – Insert table
- `column` – Insert columns
- `image` – Upload image
- `youtube` – Embed YouTube video
- `textColor` – Text color picker
- `backgroundColor` – Background color picker
- `lineHeight` – Line height
- `heading` – Heading levels
- `list` – List formatting
- `blockquote` – Block quote
- `textAlign` – Text alignment
- `hardBreak` – Insert hard break
- `fontFamily` – Font family selector
- `fontSize` – Font size selector
- `horizontalRule` – Horizontal rule
- `sourceCode` – View/edit HTML source
- `code` – Inline code
- `fullscreen` – Toggle fullscreen mode
- `separator` – Visual separator between buttons

## Features

- StarterKit plus underline, color, background color, font size/family, line height, tables, columns, images, YouTube, link, typography case helpers, and fullscreen/source modes.
- Table and column bubble controls.
- Simple, dependency-light UI (no design system required). Styles are scoped and bundled with the component.

## Development

```bash
pnpm install
pnpm build
```

This library is built with Vite in library mode and emits ESM, UMD, and type declarations in `dist/`.

## Troubleshooting

### Why do I need to import from `/src`?

If you're importing like this:
```typescript
import { TextEditor } from 'simple-tiptap-texteditor/src'
```

It means the package wasn't built before publishing. The correct import should be:
```typescript
import { TextEditor } from 'simple-tiptap-texteditor'
import 'simple-tiptap-texteditor/styles'
```

**For package maintainers:** Always run `pnpm run build` before publishing. The `prepublishOnly` script will do this automatically.

## Acknowledgments

This component is built on top of [TipTap](https://tiptap.dev/), an amazing headless editor framework. Thank you to the TipTap team for creating such a powerful and flexible text editing solution.

## License

MIT
