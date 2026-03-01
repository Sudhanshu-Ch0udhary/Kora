import { Lexer } from "../lexer/index.js"
import { Parser } from "../parser/parser.js"

export interface KoraDiagnostic {
  message: string;
  line: number;
  column: number;
}

export function analyze(source: string): KoraDiagnostic[] {
  const lexer = new Lexer(source);
  const tokens = lexer.scanTokens();

  const parser = new Parser(tokens);
  parser.parse();

  return parser.errors.map(err => {
    const match = err.message.match(/Line (\d+), Column (\d+): (.*)/)!;
    return {
      line: Number(match[1]),
      column: Number(match[2]),
      message: match[3]
    };
  });
}