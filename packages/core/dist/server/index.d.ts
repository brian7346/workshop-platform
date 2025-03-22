import { WorkshopConfig } from '../types';
/**
 * WorkshopServer - основной класс для запуска сервера воркшопа
 */
export declare class WorkshopServer {
    private app;
    private config;
    private lessons;
    constructor(config: WorkshopConfig);
    /**
     * Настройка промежуточного ПО Express
     */
    private setupMiddleware;
    /**
     * Загрузка уроков из директории exercises
     */
    private loadLessons;
    /**
     * Поиск заданий в уроке
     */
    private findProblems;
    /**
     * Поиск решений в уроке
     */
    private findSolutions;
    /**
     * Настройка маршрутов Express
     */
    private setupRoutes;
    /**
     * Получение всех файлов из директории
     */
    private getDirectoryFiles;
    /**
     * Запуск сервера
     */
    start(port?: number): Promise<void>;
}
