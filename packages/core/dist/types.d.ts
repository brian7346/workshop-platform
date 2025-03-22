/**
 * Конфигурация воркшопа
 */
export interface WorkshopConfig {
    /** Название воркшопа */
    title: string;
    /** Текущая рабочая директория */
    cwd: string;
    /** Директория с уроками */
    exercisesDir: string;
    /** Порядок уроков */
    lessonOrder?: string[];
    /** Автор воркшопа */
    author?: {
        name: string;
        email?: string;
        url?: string;
        avatar?: string;
    };
    /** Включенные функции */
    features?: {
        playground?: boolean;
        tests?: boolean;
        chat?: boolean;
        diff?: boolean;
    };
}
/**
 * Урок воркшопа
 */
export interface Lesson {
    /** Уникальный идентификатор */
    id: string;
    /** Название урока */
    title: string;
    /** Описание урока */
    description: string;
    /** Задания урока */
    problems: Problem[];
    /** Решения урока */
    solutions: Solution[];
}
/**
 * Задание урока
 */
export interface Problem {
    /** Уникальный идентификатор */
    id: string;
    /** Путь к директории с заданием */
    path: string;
    /** Файлы задания */
    files?: File[];
}
/**
 * Решение урока
 */
export interface Solution {
    /** Уникальный идентификатор */
    id: string;
    /** Путь к директории с решением */
    path: string;
    /** Файлы решения */
    files?: File[];
}
/**
 * Файл
 */
export interface File {
    /** Путь к файлу */
    path: string;
    /** Содержимое файла */
    content: string;
}
