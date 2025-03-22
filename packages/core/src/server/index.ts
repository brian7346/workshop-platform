import express from 'express';
import path from 'path';
import fs from 'fs';
import { WorkshopConfig } from '../types';

/**
 * WorkshopServer - основной класс для запуска сервера воркшопа
 */
export class WorkshopServer {
  private app: express.Application;
  private config: WorkshopConfig;
  private lessons: any[] = [];

  constructor(config: WorkshopConfig) {
    this.app = express();
    this.config = config;
    this.setupMiddleware();
    this.loadLessons();
    this.setupRoutes();
  }

  /**
   * Настройка промежуточного ПО Express
   */
  private setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static(path.join(__dirname, '../../public')));
  }

  /**
   * Загрузка уроков из директории exercises
   */
  private loadLessons() {
    const exercisesDir = path.join(this.config.cwd, this.config.exercisesDir);
    
    try {
      const lessonDirs = fs.readdirSync(exercisesDir)
        .filter(dir => fs.statSync(path.join(exercisesDir, dir)).isDirectory())
        .sort();

      this.lessons = lessonDirs.map(dir => {
        const lessonPath = path.join(exercisesDir, dir);
        const readmePath = path.join(lessonPath, 'README.md');
        
        let title = dir;
        let description = '';
        
        if (fs.existsSync(readmePath)) {
          const content = fs.readFileSync(readmePath, 'utf-8');
          const titleMatch = content.match(/^#\s+(.+)$/m);
          
          if (titleMatch) {
            title = titleMatch[1];
          }
          
          description = content;
        }
        
        return {
          id: dir,
          title,
          description,
          problems: this.findProblems(lessonPath),
          solutions: this.findSolutions(lessonPath)
        };
      });
    } catch (error) {
      console.error('Error loading lessons:', error);
      this.lessons = [];
    }
  }

  /**
   * Поиск заданий в уроке
   */
  private findProblems(lessonPath: string) {
    try {
      return fs.readdirSync(lessonPath)
        .filter(dir => dir.includes('.problem.'))
        .map(dir => ({
          id: dir,
          path: path.join(lessonPath, dir)
        }));
    } catch (error) {
      return [];
    }
  }

  /**
   * Поиск решений в уроке
   */
  private findSolutions(lessonPath: string) {
    try {
      return fs.readdirSync(lessonPath)
        .filter(dir => dir.includes('.solution.'))
        .map(dir => ({
          id: dir,
          path: path.join(lessonPath, dir)
        }));
    } catch (error) {
      return [];
    }
  }

  /**
   * Настройка маршрутов Express
   */
  private setupRoutes() {
    // API маршрут для получения списка уроков
    this.app.get('/api/lessons', (req, res) => {
      res.json(this.lessons.map(lesson => ({
        id: lesson.id,
        title: lesson.title,
        problems: lesson.problems.map((p: any) => p.id),
        solutions: lesson.solutions.map((s: any) => s.id)
      })));
    });

    // API маршрут для получения конкретного урока
    this.app.get('/api/lessons/:id', (req, res) => {
      const lesson = this.lessons.find(l => l.id === req.params.id);
      
      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      
      res.json(lesson);
    });

    // API маршрут для получения файлов задания
    this.app.get('/api/lessons/:lessonId/problems/:problemId', (req, res) => {
      const { lessonId, problemId } = req.params;
      const lesson = this.lessons.find(l => l.id === lessonId);
      
      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      
      const problem = lesson.problems.find((p: any) => p.id === problemId);
      
      if (!problem) {
        return res.status(404).json({ error: 'Problem not found' });
      }
      
      try {
        const filesDir = problem.path;
        const files = this.getDirectoryFiles(filesDir);
        res.json({ files });
      } catch (error) {
        res.status(500).json({ error: 'Failed to load problem files' });
      }
    });

    // API маршрут для получения файлов решения
    this.app.get('/api/lessons/:lessonId/solutions/:solutionId', (req, res) => {
      const { lessonId, solutionId } = req.params;
      const lesson = this.lessons.find(l => l.id === lessonId);
      
      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' });
      }
      
      const solution = lesson.solutions.find((s: any) => s.id === solutionId);
      
      if (!solution) {
        return res.status(404).json({ error: 'Solution not found' });
      }
      
      try {
        const filesDir = solution.path;
        const files = this.getDirectoryFiles(filesDir);
        res.json({ files });
      } catch (error) {
        res.status(500).json({ error: 'Failed to load solution files' });
      }
    });

    // Маршрут для обслуживания клиентского приложения
    this.app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../../public/index.html'));
    });
  }

  /**
   * Получение всех файлов из директории
   */
  private getDirectoryFiles(dir: string) {
    const files: any[] = [];
    
    function traverseDir(currentPath: string, relativePath: string = '') {
      const items = fs.readdirSync(currentPath);
      
      items.forEach(item => {
        const itemPath = path.join(currentPath, item);
        const itemRelativePath = relativePath ? path.join(relativePath, item) : item;
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          traverseDir(itemPath, itemRelativePath);
        } else {
          files.push({
            path: itemRelativePath,
            content: fs.readFileSync(itemPath, 'utf-8')
          });
        }
      });
    }
    
    traverseDir(dir);
    return files;
  }

  /**
   * Запуск сервера
   */
  public async start(port: number = 3000) {
    return new Promise<void>((resolve, reject) => {
      try {
        this.app.listen(port, () => {
          console.log(`Workshop server running at http://localhost:${port}`);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
} 