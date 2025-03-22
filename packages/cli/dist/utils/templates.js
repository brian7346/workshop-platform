"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTemplate = copyTemplate;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
/**
 * Путь к директории с шаблонами
 */
const TEMPLATES_DIR = path_1.default.join(__dirname, '../../templates');
/**
 * Копирование шаблона в целевую директорию
 * @param template Название шаблона
 * @param destination Целевая директория
 */
async function copyTemplate(template, destination) {
    const templatePath = path_1.default.join(TEMPLATES_DIR, template);
    // Проверяем существует ли шаблон
    if (!fs_extra_1.default.existsSync(templatePath)) {
        throw new Error(`Template "${template}" does not exist`);
    }
    // Копируем шаблон
    await fs_extra_1.default.copy(templatePath, destination, {
        overwrite: false,
        errorOnExist: true,
    });
    // Обрабатываем package.json
    await processPackageJson(destination);
}
/**
 * Обработка package.json в целевой директории
 * @param destination Целевая директория
 */
async function processPackageJson(destination) {
    const packageJsonPath = path_1.default.join(destination, 'package.json');
    if (fs_extra_1.default.existsSync(packageJsonPath)) {
        try {
            const packageJson = await fs_extra_1.default.readJson(packageJsonPath);
            // Устанавливаем имя проекта на основе директории
            packageJson.name = path_1.default.basename(destination);
            // Записываем обновленный package.json
            await fs_extra_1.default.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        }
        catch (error) {
            console.error('Error processing package.json:', error);
        }
    }
}
//# sourceMappingURL=templates.js.map