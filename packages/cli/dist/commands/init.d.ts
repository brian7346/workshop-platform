/**
 * Опции инициализации воркшопа
 */
export interface InitOptions {
    /** Путь для инициализации */
    path?: string;
}
/**
 * Инициализация воркшопа в существующей директории
 * @param options Опции инициализации
 */
export declare function init(options: InitOptions): Promise<void>;
