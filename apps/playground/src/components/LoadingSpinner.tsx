export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-glass animate-in fade-in duration-200">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Spinning gradient ring */}
          <div className="w-20 h-20 rounded-full border-4 border-transparent bg-gradient-to-r from-[var(--color-brand-cyan)] to-[var(--color-brand-purple)] animate-spin" 
               style={{ 
                 maskImage: 'radial-gradient(circle, transparent 50%, black 50%)',
                 WebkitMaskImage: 'radial-gradient(circle, transparent 50%, black 50%)'
               }} 
          />
          {/* Center dot */}
          <div className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[var(--color-dark-bg)]" />
        </div>
        <div className="text-[var(--color-text-secondary)] text-sm font-medium tracking-wide">
          Executing...
        </div>
      </div>
    </div>
  );
}
