#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const server_1 = require("../server");
/**
 * Загрузка конфигурации воркшопа
 */
function loadConfig() {
    const cwd = process.cwd();
    let configPath = path_1.default.join(cwd, 'workshop.config.js');
    // Проверяем существует ли файл конфигурации
    if (!fs_1.default.existsSync(configPath)) {
        configPath = path_1.default.join(cwd, 'workshop.config.json');
        if (!fs_1.default.existsSync(configPath)) {
            // Если конфигурации нет, используем значения по умолчанию
            return {
                title: 'Workshop',
                cwd,
                exercisesDir: 'exercises',
            };
        }
    }
    try {
        // Пытаемся загрузить конфигурацию
        let config;
        if (configPath.endsWith('.js')) {
            config = require(configPath);
        }
        else {
            config = JSON.parse(fs_1.default.readFileSync(configPath, 'utf-8'));
        }
        return {
            ...config,
            cwd
        };
    }
    catch (error) {
        console.error('Error loading config:', error);
        process.exit(1);
    }
}
/**
 * Запуск сервера воркшопа
 */
async function start() {
    try {
        const config = loadConfig();
        const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
        console.log(`Starting workshop "${config.title}"...`);
        console.log(`Loading exercises from: ${config.exercisesDir}`);
        const server = new server_1.WorkshopServer(config);
        await server.start(port);
        console.log(`Workshop "${config.title}" is running at: http://localhost:${port}`);
    }
    catch (error) {
        console.error('Failed to start workshop server:', error);
        process.exit(1);
    }
}
// Запускаем сервер
start();
//# sourceMappingURL=start.js.map