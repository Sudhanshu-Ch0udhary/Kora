import { useState } from "react";
import { Lexer, Parser, Interpreter } from "@sudhanshu_choudhary/kora-core";

export default function App() {
  const [code, setCode] = useState(`int x = 10

func add(a, b) {
  return a + b
}

print(add(x, 5))`);

  const [output, setOutput] = useState("");

  function runCode() {
    try {
      const lexer = new Lexer(code);
      const tokens = lexer.scanTokens();

      const parser = new Parser(tokens);
      const ast = parser.parse();

      const interpreter = new Interpreter();
      const result = interpreter.run(ast);

      setOutput(JSON.stringify(result, null, 2));
    } catch (err: any) {
      setOutput(err.message ?? String(err));
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Kora Playground</h2>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: "100%", height: 200 }}
      />

      <br />

      <button onClick={runCode}>Run</button>

      <pre>{output}</pre>
    </div>
  );
}
