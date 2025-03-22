import React, { useState, useEffect } from 'react';
import { Lesson } from '../../types';
import { marked } from 'marked';

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
export function LessonContent({ lesson, view }: LessonContentProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!lesson) return;
    
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (view === 'problem' && lesson.problems.length > 0) {
          const problemId = lesson.problems[0].id;
          const response = await fetch(`/api/lessons/${lesson.id}/problems/${problemId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch problem');
          }
          
          const data = await response.json();
          setContent(lesson.description);
        } else if (view === 'solution' && lesson.solutions.length > 0) {
          const solutionId = lesson.solutions[0].id;
          const response = await fetch(`/api/lessons/${lesson.id}/solutions/${solutionId}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch solution');
          }
          
          const data = await response.json();
          setContent(lesson.description);
        } else if (view === 'playground') {
          setContent(lesson.description);
        } else {
          setContent(lesson.description);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Failed to load content');
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [lesson, view]);
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  return (
    <div className="lesson-content">
      <div className="lesson-description" dangerouslySetInnerHTML={{ __html: marked(lesson.description) }} />
      
      {view === 'problem' && lesson.problems.length > 0 && (
        <div className="problem-content">
          <h3>Problem</h3>
          {/* Здесь будет содержимое задания */}
        </div>
      )}
      
      {view === 'solution' && lesson.solutions.length > 0 && (
        <div className="solution-content">
          <h3>Solution</h3>
          {/* Здесь будет содержимое решения */}
        </div>
      )}
      
      {view === 'playground' && (
        <div className="playground-content">
          <h3>Playground</h3>
          {/* Здесь будет интерактивный playground */}
        </div>
      )}
    </div>
  );
} 