import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import type { AnyExtension } from '@tiptap/core';

export type TableOptions = {
  className?: string;
  resizable?: boolean;
};

export function tableExtensions(options?: TableOptions): AnyExtension[] {
  const { className = 'stte-table', resizable = true } = options ?? {};

  return [
    Table.configure({
      resizable,
      HTMLAttributes: { class: className, border: 1 },
    }) as AnyExtension,
    TableRow as AnyExtension,
    TableCell as AnyExtension,
    TableHeader as AnyExtension,
  ];
}
