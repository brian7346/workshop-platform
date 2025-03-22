import fs from 'fs-extra';
import path from 'path';

/**
 * Путь к директории с шаблонами
 */
const TEMPLATES_DIR = path.join(__dirname, '../../templates');

/**
 * Копирование шаблона в целевую директорию
 * @param template Название шаблона
 * @param destination Целевая директория
 */
export async function copyTemplate(template: string, destination: string): Promise<void> {
  const templatePath = path.join(TEMPLATES_DIR, template);
  
  // Проверяем существует ли шаблон
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template "${template}" does not exist`);
  }
  
  // Копируем шаблон
  await fs.copy(templatePath, destination, {
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
async function processPackageJson(destination: string): Promise<void> {
  const packageJsonPath = path.join(destination, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    try {
      const packageJson = await fs.readJson(packageJsonPath);
      
      // Устанавливаем имя проекта на основе директории
      packageJson.name = path.basename(destination);
      
      // Записываем обновленный package.json
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    } catch (error) {
      console.error('Error processing package.json:', error);
    }
  }
} 