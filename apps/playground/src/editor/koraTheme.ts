import { EditorView } from "@codemirror/view"

export const koraTheme = EditorView.theme(
  {
    "&": {
      backgroundColor: "#0f1117",
      color: "#e6edf3"
    },

    ".cm-content": {
      caretColor: "#00ffff"
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: "#00ffff",
      borderLeftWidth: "2px"
    },

    ".cm-selectionBackground, .cm-content ::selection": {
      backgroundColor: "#264f78"
    },

    ".cm-activeLine": {
      backgroundColor: "#1a1d24"
    },

    ".cm-gutters": {
      backgroundColor: "#0f1117",
      color: "#6e7681",
      border: "none"
    }
  },
  { dark: true }
)