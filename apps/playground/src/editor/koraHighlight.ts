import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

export const koraHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#ff7b72" },
  { tag: tags.string, color: "#a5d6ff" },
  { tag: tags.comment, color: "#6e7681", fontStyle: "italic" },
  { tag: tags.number, color: "#79c0ff" },
  { tag: tags.operator, color: "#ff7b72" },

  { tag: tags.variableName, color: "#e6edf3" },
  { tag: tags.standard(tags.variableName), color: "#d2a8ff" } 
]);
