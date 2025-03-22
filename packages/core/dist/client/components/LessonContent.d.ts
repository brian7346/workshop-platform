import { Lesson } from '../../types';
/**
 * Интерфейс свойств компонента LessonContent
 */
interface LessonContentProps {
    /** Урок */
    lesson: Lesson;
    /** Текущий вид */
    view: 'problem' | 'solution' | 'playground';
}
/**
 * Компонент содержимого урока
 */
export declare function LessonContent({ lesson, view }: LessonContentProps): import("react/jsx-runtime").JSX.Element;
export {};
