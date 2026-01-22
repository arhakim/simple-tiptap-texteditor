import type { App } from 'vue';
import TextEditor from './components/TextEditor.vue';

export { TextEditor };

export default {
  install(app: App, options?: { componentName?: string }) {
    app.component(options?.componentName ?? 'SimpleTiptapTextEditor', TextEditor);
  },
};
