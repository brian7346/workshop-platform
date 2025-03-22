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
export declare function Toolbar({ currentView, onViewChange }: ToolbarProps): import("react/jsx-runtime").JSX.Element;
export {};
