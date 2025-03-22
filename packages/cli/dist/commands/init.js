"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
/**
 * Инициализация воркшопа в существующей директории
 * @param options Опции инициализации
 */
async function init(options) {
    const { path: targetPath = '.' } = options;
    console.log(`Initializing workshop in ${targetPath}`);
    // Здесь будет логика инициализации воркшопа
    console.log('Workshop initialized successfully');
}
//# sourceMappingURL=init.js.map