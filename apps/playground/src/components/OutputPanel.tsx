import { ChevronRight, ChevronLeft } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  isError?: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function OutputPanel({ output, isError, isCollapsed, onToggleCollapse }: OutputPanelProps) {
  return (
    <div className="h-full flex flex-col bg-[var(--color-elevated)]">
      <div className="h-12 border-b border-[var(--color-border)] flex items-center justify-between px-6">
        <span className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
          Output
        </span>
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded hover:bg-[var(--color-card-bg)] transition-colors
                     text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          title={isCollapsed ? "Expand output" : "Collapse output"}
        >
          {isCollapsed ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        {output ? (
          <pre className={`code-editor whitespace-pre-wrap break-words ${
            isError ? 'text-[var(--color-error)]' : 'text-[var(--color-text-primary)]'
          }`}>
            {output}
          </pre>
        ) : (
          <div className="text-[var(--color-text-muted)] text-sm italic">
            Run your code to see output here...
          </div>
        )}
      </div>
    </div>
  );
}
