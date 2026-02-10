import { Play } from 'lucide-react';

interface HeaderProps {
  onRun: () => void;
  isRunning: boolean;
}

export default function Header({ onRun, isRunning }: HeaderProps) {
  return (
    <header className="h-16 border-b border-(--color-border) bg-card-bg/80 backdrop-blur-glass flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <img src="/kora.png" alt="Kora" className="w-10 h-10" />
        <h1 className="text-xl font-semibold gradient-text">Kora Playground</h1>
      </div>

      <button
        onClick={onRun}
        disabled={isRunning}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm
                   bg-linear-to-r from-(--color-brand-cyan) to-(--color-brand-purple)
                   text-white shadow-lg shadow-(--color-brand-purple)/20
                   hover:shadow-xl hover:shadow-(--color-brand-purple)/30
                   active:scale-95 transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
      >
        <Play className="w-4 h-4" fill="currentColor" />
        Run Code
      </button>
    </header>
  );
}
