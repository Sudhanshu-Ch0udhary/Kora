import { Lexer } from "../lexer/index.js"
import { Parser } from "../parser/parser.js"
import { ParseError } from "../parser/parseError.js"

export interface KoraDiagnostic {
  message: string;
  line: number;
  column: number;
}

export function analyze(source: string): KoraDiagnostic[] {
  const diagnostics: KoraDiagnostic[] = [];

  try {
    const lexer = new Lexer(source);
    const tokens = lexer.scanTokens();

    const parser = new Parser(tokens);
    const program = parser.parse();

  } catch (err) {
    if (err instanceof ParseError) {
      const match = err.message.match(/Line (\d+), Column (\d+): (.*)/);

      if (match) {
        diagnostics.push({
          line: Number(match[1]),
          column: Number(match[2]),
          message: match[3]
        });
      }
    } else {
      console.error(err);
    }
  }

  return diagnostics;
}
