# Release v0.1.0 - First Official Release

This is the first official release of **simple-tiptap-texteditor**, a lightweight, preconfigured TipTap text editor Vue 3 component.

## 🎉 What's New

### Core Features
- **Easy Integration**: Simple Vue 3 component that can be installed directly from GitHub
- **Rich Text Editing**: Full-featured WYSIWYG editor powered by TipTap
- **Customizable Toolbar**: Extensive set of toolbar buttons that can be configured as needed
- **Fullscreen Mode**: Toggle fullscreen editing for better focus
- **Source Code Editor**: Switch to HTML source view for direct editing

### Supported Features
- **Text Formatting**: Bold, italic, underline, strikethrough, subscript, superscript
- **Lists**: Bullet lists and ordered lists
- **Tables**: Insert and edit tables with bubble menu controls
- **Media**: Image uploads (with custom handler) and YouTube video embeds
- **Links**: Add and edit hyperlinks
- **Typography**: Text transformations (uppercase, lowercase, capitalize)
- **Styling**: Text color, background color, font family, font size, line height
- **Layout**: Text alignment, horizontal rules, blockquotes
- **Code**: Code blocks and inline code formatting

## 📦 Installation

Install directly from GitHub:
```bash
npm install arhakim/simple-tiptap-texteditor#v0.1.0
```

Or using pnpm:
```bash
pnpm add arhakim/simple-tiptap-texteditor#v0.1.0
```

## 🚀 Quick Start

```vue
<script setup lang="ts">
import { TextEditor } from 'simple-tiptap-texteditor';
import 'simple-tiptap-texteditor/styles';

const content = ref('');
</script>

<template>
  <TextEditor v-model="content" label="Body" />
</template>
```

## 📝 Documentation

See the [README](https://github.com/arhakim/simple-tiptap-texteditor#readme) for complete documentation, including:
- Detailed prop documentation
- Complete list of available toolbar buttons
- Customization examples
- Troubleshooting guide

## 🙏 Acknowledgments

Built on top of [TipTap](https://tiptap.dev/), an amazing headless editor framework.

## 📄 License

MIT License - see [LICENSE](https://github.com/arhakim/simple-tiptap-texteditor/blob/main/LICENSE) for details.
