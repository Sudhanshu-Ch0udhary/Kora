import { StreamLanguage, type StreamParser } from "@codemirror/language";

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

const builtins = new Set([
  "print"
]);

//fixed
export const koraLanguage = StreamLanguage.define({
  startState() {
    return {};
  },

  token(stream) {
    if (stream.match("//")) {
      stream.skipToEnd();
      return "comment";
    }

    if (stream.match('"')) {
      while (!stream.eol()) {
        if (stream.next() === '"') break;
      }
      return "string";
    }

    if (stream.match(/^\d+(\.\d+)?/)) {
      return "number";
    }

    if (stream.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)) {
      if (keywords.has(stream.current())) {
        return "keyword";
      }
      if(builtins.has(stream.current())){
        return "builtin";
      }
      return "variableName";
    }

    if (stream.match(/^[+\-*/=<>!&|]+/)) {
      return "operator";
    }

    stream.next();
    return null;
  }
} as StreamParser<unknown>);
