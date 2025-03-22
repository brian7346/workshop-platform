import React from 'react';
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
export function LessonList({ lessons, currentLesson, onLessonSelect }: LessonListProps) {
  return (
    <div className="lesson-list">
      <h3>Lessons</h3>
      
      <ul>
        {lessons.map(lesson => (
          <li 
            key={lesson.id} 
            className={currentLesson?.id === lesson.id ? 'active' : ''}
            onClick={() => onLessonSelect(lesson.id)}
          >
            {lesson.title}
          </li>
        ))}
      </ul>
    </div>
  );
} 