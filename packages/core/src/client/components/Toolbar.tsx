import React from 'react';

/**
 * Интерфейс свойств компонента Toolbar
 */
interface ToolbarProps {
  /** Текущий вид */
  currentView: 'problem' | 'solution' | 'playground';
  
  /** Обработчик изменения вида */
  onViewChange: (view: 'problem' | 'solution' | 'playground') => void;
}

/**
 * Компонент панели инструментов
 */
export function Toolbar({ currentView, onViewChange }: ToolbarProps) {
  return (
    <div className="toolbar">
      <button 
        className={currentView === 'playground' ? 'active' : ''} 
        onClick={() => onViewChange('playground')}
      >
        Playground
      </button>
      
      <button 
        className={currentView === 'problem' ? 'active' : ''} 
        onClick={() => onViewChange('problem')}
      >
        Problem
      </button>
      
      <button 
        className={currentView === 'solution' ? 'active' : ''} 
        onClick={() => onViewChange('solution')}
      >
        Solution
      </button>
      
      <button>Tests</button>
      <button>Diff</button>
      <button>Chat</button>
    </div>
  );
} 