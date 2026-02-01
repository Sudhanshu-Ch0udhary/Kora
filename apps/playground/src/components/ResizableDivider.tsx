import { GripVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ResizableDividerProps {
  onResize: (deltaX: number) => void;
}

export default function ResizableDivider({ onResize }: ResizableDividerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - startXRef.current;
        startXRef.current = e.clientX;
        onResize(deltaX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onResize]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`w-1 bg-[var(--color-border)] hover:bg-[var(--color-brand-cyan)] 
                  transition-colors cursor-col-resize flex items-center justify-center
                  relative group ${isDragging ? 'bg-[var(--color-brand-cyan)]' : ''}`}
    >
      <div className="absolute inset-y-0 -left-1 -right-1" />
      <div className="absolute top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] 
                      group-hover:text-[var(--color-brand-cyan)] transition-colors">
        <GripVertical className="w-3 h-3" />
      </div>
    </div>
  );
}
