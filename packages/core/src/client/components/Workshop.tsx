import React, { useState, useEffect } from 'react';
import { LessonList } from './LessonList';
import { LessonContent } from './LessonContent';
import { Toolbar } from './Toolbar';
import { Lesson } from '../../types';

/**
 * Интерфейс свойств компонента Workshop
 */
interface WorkshopProps {
  /** Заголовок воркшопа */
  title: string;
}

/**
 * Основной компонент Workshop
 */
export function Workshop({ title }: WorkshopProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentView, setCurrentView] = useState<'problem' | 'solution' | 'playground'>('problem');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка уроков при монтировании компонента
  useEffect(() => {
    async function fetchLessons() {
      try {
        setLoading(true);
        const response = await fetch('/api/lessons');
        
        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }
        
        const data = await response.json();
        setLessons(data);
        
        // Выбираем первый урок по умолчанию
        if (data.length > 0) {
          const firstLesson = await fetchLesson(data[0].id);
          setCurrentLesson(firstLesson);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lessons:', error);
        setError('Failed to load lessons');
        setLoading(false);
      }
    }
    
    fetchLessons();
  }, []);

  // Загрузка конкретного урока
  async function fetchLesson(id: string) {
    try {
      const response = await fetch(`/api/lessons/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch lesson');
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching lesson ${id}:`, error);
      setError('Failed to load lesson');
      return null;
    }
  }

  // Обработчик выбора урока
  async function handleLessonSelect(id: string) {
    const lesson = await fetchLesson(id);
    setCurrentLesson(lesson);
  }

  // Обработчик изменения вида
  function handleViewChange(view: 'problem' | 'solution' | 'playground') {
    setCurrentView(view);
  }

  if (loading) {
    return (
      <div className="workshop-loading">
        <div className="spinner"></div>
        <p>Loading workshop...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="workshop-error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="workshop-container">
      <header className="workshop-header">
        <h1>{title}</h1>
      </header>
      
      <div className="workshop-layout">
        <aside className="workshop-sidebar">
          <LessonList 
            lessons={lessons}
            currentLesson={currentLesson}
            onLessonSelect={handleLessonSelect}
          />
        </aside>
        
        <main className="workshop-main">
          <Toolbar 
            currentView={currentView} 
            onViewChange={handleViewChange}
          />
          
          {currentLesson && (
            <LessonContent 
              lesson={currentLesson} 
              view={currentView}
            />
          )}
        </main>
      </div>
    </div>
  );
} 