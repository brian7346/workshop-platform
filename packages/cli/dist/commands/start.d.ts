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
export declare function start(options?: StartOptions): Promise<void>;
