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
//need some fix for the error below, will tackle it later
export const koraLanguage = StreamLanguage.define({
  startState() {
    return {};
  },

  token(stream) {
    // comments
    if (stream.match("//")) {
      stream.skipToEnd();
      return "comment";
    }

    // strings
    if (stream.match('"')) {
      while (!stream.eol()) {
        if (stream.next() === '"') break;
      }
      return "string";
    }

    // numbers
    if (stream.match(/^\d+(\.\d+)?/)) {
      return "number";
    }

    // identifiers / keywords
    if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)) {
      if (keywords.has(stream.current())) {
        return "keyword";
      }
      return "variableName";
    }

    // operators
    if (stream.match(/^[+\-*/=<>!&|]+/)) {
      return "operator";
    }

    stream.next();
    return null;
  }
} as StreamParser<unknown>);
