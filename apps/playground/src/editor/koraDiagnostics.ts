import { linter, type Diagnostic } from "@codemirror/lint";
import { analyze } from "@sudhanshu_choudhary/kora-core";

export const koraDiagnostics = linter(view => {
  const text = view.state.doc.toString();

  const errors = analyze(text);

  return errors.map(e => {
    const line = view.state.doc.line(e.line);

    return {
      from: line.from + e.column - 1,
      to: line.from + e.column,
      severity: "error",
      message: e.message
    } satisfies Diagnostic;
  });
});