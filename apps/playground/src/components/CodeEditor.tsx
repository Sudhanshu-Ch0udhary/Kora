import { useEffect, useRef } from 'react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize textarea
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[var(--color-card-bg)] border-r border-[var(--color-border)]">
      <div className="h-12 border-b border-[var(--color-border)] flex items-center px-6">
        <span className="text-sm font-medium text-[var(--color-text-secondary)] uppercase tracking-wide">
          Editor
        </span>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="relative">
          {/* Line numbers */}
          <div className="absolute left-0 top-0 select-none text-[var(--color-text-muted)] text-right pr-4 code-editor">
            {value.split('\n').map((_, i) => (
              <div key={i} className="leading-[1.6]">
                {i + 1}
              </div>
            ))}
          </div>
          
          {/* Code input */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full min-h-full pl-12 bg-transparent text-[var(--color-text-primary)] 
                       code-editor resize-none outline-none border-none scrollbar-hidden"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      </div>
    </div>
  );
}
