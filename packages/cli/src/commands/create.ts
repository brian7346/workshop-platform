import fs from 'fs';
import path from 'path';
import { copyTemplate } from '../utils/templates.js';

/**
 * Опции команды создания воркшопа
 */
export interface CreateOptions {
  /** Название воркшопа */
  name: string;
  
  /** Путь для создания */
  path?: string;
  
  /** Шаблон */
  template?: string;
}

/**
 * Создание нового воркшопа
 * @param options Опции создания
 */
export async function create(options: CreateOptions): Promise<void> {
  const { name, path: targetPath = '.', template = 'basic' } = options;
  const workshopDir = path.join(targetPath, name);
  
  // Проверяем существует ли директория
  if (fs.existsSync(workshopDir)) {
    throw new Error(`Directory ${workshopDir} already exists`);
  }
  
  // Создаем директорию
  fs.mkdirSync(workshopDir, { recursive: true });
  
  // Копируем шаблон
  await copyTemplate(template, workshopDir);
  
  console.log(`Workshop "${name}" created successfully at ${workshopDir}`);
} 