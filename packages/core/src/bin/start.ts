#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { WorkshopServer } from '../server';
import { WorkshopConfig } from '../types';

/**
 * Загрузка конфигурации воркшопа
 */
function loadConfig(): WorkshopConfig {
  const cwd = process.cwd();
  let configPath = path.join(cwd, 'workshop.config.js');
  
  // Проверяем существует ли файл конфигурации
  if (!fs.existsSync(configPath)) {
    configPath = path.join(cwd, 'workshop.config.json');
    
    if (!fs.existsSync(configPath)) {
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
    } else {
      config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }
    
    return {
      ...config,
      cwd
    };
  } catch (error) {
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
    
    const server = new WorkshopServer(config);
    await server.start(port);
    
    console.log(`Workshop "${config.title}" is running at: http://localhost:${port}`);
  } catch (error) {
    console.error('Failed to start workshop server:', error);
    process.exit(1);
  }
}

// Запускаем сервер
start(); 