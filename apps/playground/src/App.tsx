import { useState } from "react"
import { Lexer, Parser, Interpreter, stdlib } from "@sudhanshu_choudhary/kora-core"
import { ChevronLeft } from "lucide-react"
import Header from "./components/Header"
import CodeEditor from "./components/CodeEditor"
import OutputPanel from "./components/OutputPanel"
import LoadingSpinner from "./components/LoadingSpinner"
import ResizableDivider from "./components/ResizableDivider"
import { sampleCode } from "./util/samplecode"

export default function App() {
  const [code, setCode] = useState(sampleCode);
  const [output, setOutput] = useState("");
  const [isError, setIsError] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);
  const [outputWidth, setOutputWidth] = useState(40);

  const handleResize = (deltaX: number) => {
    const containerWidth = window.innerWidth;
    const deltaPercent = (deltaX / containerWidth) * 100;
    setOutputWidth(prev => {
      const newWidth = prev - deltaPercent;
      return Math.max(20, Math.min(60, newWidth));
    });
  };

  const toggleOutputCollapse = () => {
    setIsOutputCollapsed(prev => !prev);
  };

  async function runCode() {
    setIsRunning(true);
    setOutput("");
    setIsError(false);
    
    if (isOutputCollapsed) {
      setIsOutputCollapsed(false);
    }

    await new Promise(resolve => setTimeout(resolve, 800));

    let buffer = "";
    stdlib.print = {
      type: "native-function",
      name: "print",
      call(args: any[]) {
        buffer += args.map(a => a.value ?? a).join(" ") + "\n";
        return { type: "null" };
      }
    };

    try {
      const lexer = new Lexer(code);
      const tokens = lexer.scanTokens();

      const parser = new Parser(tokens);
      const ast = parser.parse();

      const interpreter = new Interpreter();
      interpreter.run(ast);

      
      setOutput(buffer || "(no output)");
      setIsError(false);
    } catch (err: any) {
      setOutput(err.message ?? String(err));
      setIsError(true);
    } finally {
      setIsRunning(false);
    }
  }

  const editorWidth = 100 - outputWidth;

  return (
    <div className="w-full h-full flex flex-col">
      <Header onRun={runCode} isRunning={isRunning} />
      
      <div className="flex-1 flex overflow-hidden">
        <div style={{ width: isOutputCollapsed ? '100%' : `${editorWidth}%` }} className="transition-all duration-300">
          <CodeEditor value={code} onChange={setCode} />
        </div>
        
        {!isOutputCollapsed && (
          <>
            <ResizableDivider onResize={handleResize} />
            <div style={{ width: `${outputWidth}%` }} className="transition-all duration-300">
              <OutputPanel 
                output={output} 
                isError={isError}
                isCollapsed={isOutputCollapsed}
                onToggleCollapse={toggleOutputCollapse}
              />
            </div>
          </>
        )}
        
        {isOutputCollapsed && (
          <button
            onClick={toggleOutputCollapse}
            className="w-12 border-l border-(--color-border) bg-(--color-elevated)
                       hover:bg-(--color-card-bg) transition-colors flex items-center justify-center
                       text-(--color-text-secondary) hover:text-(--color-brand-cyan)"
            title="Expand output"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
      </div>

      {isRunning && <LoadingSpinner />}
    </div>
  );
}
