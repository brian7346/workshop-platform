import { Lesson } from '../../types';
/**
 * Интерфейс свойств компонента LessonList
 */
interface LessonListProps {
    /** Список уроков */
    lessons: Lesson[];
    /** Текущий урок */
    currentLesson: Lesson | null;
    /** Обработчик выбора урока */
    onLessonSelect: (id: string) => void;
}
/**
 * Компонент списка уроков
 */
export declare function LessonList({ lessons, currentLesson, onLessonSelect }: LessonListProps): import("react/jsx-runtime").JSX.Element;
export {};
