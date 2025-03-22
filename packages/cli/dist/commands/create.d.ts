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
export declare function create(options: CreateOptions): Promise<void>;
