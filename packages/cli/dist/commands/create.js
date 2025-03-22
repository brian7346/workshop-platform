"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = create;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const templates_1 = require("../utils/templates");
/**
 * Создание нового воркшопа
 * @param options Опции создания
 */
async function create(options) {
    const { name, path: targetPath = '.', template = 'basic' } = options;
    const workshopDir = path_1.default.join(targetPath, name);
    // Проверяем существует ли директория
    if (fs_1.default.existsSync(workshopDir)) {
        throw new Error(`Directory ${workshopDir} already exists`);
    }
    // Создаем директорию
    fs_1.default.mkdirSync(workshopDir, { recursive: true });
    // Копируем шаблон
    await (0, templates_1.copyTemplate)(template, workshopDir);
    console.log(`Workshop "${name}" created successfully at ${workshopDir}`);
}
//# sourceMappingURL=create.js.map