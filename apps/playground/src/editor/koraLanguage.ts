import { StreamLanguage } from "@codemirror/language";
import type { StreamParser } from "@codemirror/stream-parser";

const keywords = new Set([
  "if",
  "else",
  "while",
  "func",
  "return",
  "stop",
  "true",
  "false"
]);
