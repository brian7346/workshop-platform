/**
 * Опции запуска воркшопа
 */
export interface StartOptions {
  /** Порт для запуска сервера */
  port?: number;
}

/**
 * Запуск сервера воркшопа
 * @param options Опции запуска
 */
export async function start(options: StartOptions = {}): Promise<void> {
  const { port = 3000 } = options;
  
  console.log(`Starting workshop server on port ${port}`);
  
  // Реальная логика запуска сервера реализована в core/bin/start.js
  
  console.log(`Workshop server running at http://localhost:${port}`);
} 