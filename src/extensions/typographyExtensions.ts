import { Extension } from '@tiptap/core';
import { snakeCase, capitalCase, kebabCase, camelCase, sentenceCase } from 'change-case';

export const Typography = Extension.create({
  name: 'typography',

  addCommands() {
    return {
      toUppercase:
        () =>
        ({ editor, state, dispatch }: any) => {
          const { from, to } = state.selection;
          if (from === to) return false;

          const text = state.doc.textBetween(from, to);
          const newText = text.toUpperCase();

          if (dispatch) {
            const transaction = state.tr.insertText(newText, from, to);
            dispatch(transaction);
          }
          return true;
        },

      toLowercase:
        () =>
        ({ editor, state, dispatch }: any) => {
          const { from, to } = state.selection;
          if (from === to) return false;

          const text = state.doc.textBetween(from, to);
          const newText = text.toLowerCase();

          if (dispatch) {
            const transaction = state.tr.insertText(newText, from, to);
            dispatch(transaction);
          }
          return true;
        },

      toSnakeCase:
        () =>
        ({ editor, state, dispatch }: any) => {
          const { from, to } = state.selection;
          if (from === to) return false;

          const text = state.doc.textBetween(from, to);
          const newText = snakeCase(text);

          if (dispatch) {
            const transaction = state.tr.insertText(newText, from, to);
            dispatch(transaction);
          }
          return true;
        },

      toKebabCase:
        () =>
        ({ editor, state, dispatch }: any) => {
          const { from, to } = state.selection;
          if (from === to) return false;

          const text = state.doc.textBetween(from, to);
          const newText = kebabCase(text);

          if (dispatch) {
            const transaction = state.tr.insertText(newText, from, to);
            dispatch(transaction);
          }
          return true;
        },

      toCamelCase:
        () =>
        ({ editor, state, dispatch }: any) => {
          const { from, to } = state.selection;
          if (from === to) return false;

          const text = state.doc.textBetween(from, to);
          const newText = camelCase(text);

          if (dispatch) {
            const transaction = state.tr.insertText(newText, from, to);
            dispatch(transaction);
          }
          return true;
        },

      toTitleCase:
        () =>
        ({ editor, state, dispatch }: any) => {
          const { from, to } = state.selection;
          if (from === to) return false;

          const text = state.doc.textBetween(from, to);
          const newText = capitalCase(text);

          if (dispatch) {
            const transaction = state.tr.insertText(newText, from, to);
            dispatch(transaction);
          }
          return true;
        },

      toSentenceCase:
        () =>
        ({ editor, state, dispatch }: any) => {
          const { from, to } = state.selection;
          if (from === to) return false;

          const text = state.doc.textBetween(from, to);
          const newText = sentenceCase(text);

          if (dispatch) {
            const transaction = state.tr.insertText(newText, from, to);
            dispatch(transaction);
          }
          return true;
        },
    } as any;
  },
});
