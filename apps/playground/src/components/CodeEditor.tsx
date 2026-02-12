import { useEffect, useRef } from "react";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { closeBrackets } from "@codemirror/autocomplete";
import { koraLanguage } from '../editor/koraLanguage';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current || viewRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        history(),
        closeBrackets(),
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap
        ]),
        koraLanguage,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.lineWrapping
      ]
    });

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current
    });

    return () => {
      viewRef.current?.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;

    const current = view.state.doc.toString();
    if (value !== current) {
      view.dispatch({
        changes: {
          from: 0,
          to: current.length,
          insert: value
        }
      });
    }
  }, [value]);

  return (
    <div className="h-full flex flex-col bg-(--color-card-bg) border-r border-(--color-border)">
      <div className="h-12 border-b border-(--color-border) flex items-center px-6">
        <span className="text-sm font-medium text-(--color-text-secondary) uppercase tracking-wide">
          Editor
        </span>
      </div>

      <div className="flex-1 overflow-hidden">
        <div
          ref={editorRef}
          className="h-full text-(--color-text-primary)"
        />
      </div>
    </div>
  );
}
