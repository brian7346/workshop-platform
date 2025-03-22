"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = start;
/**
 * Запуск сервера воркшопа
 * @param options Опции запуска
 */
async function start(options = {}) {
    const { port = 3000 } = options;
    console.log(`Starting workshop server on port ${port}`);
    // Реальная логика запуска сервера реализована в core/bin/start.js
    console.log(`Workshop server running at http://localhost:${port}`);
}
//# sourceMappingURL=start.js.map