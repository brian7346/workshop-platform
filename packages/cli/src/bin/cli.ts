#!/usr/bin/env node

import path from 'path';
import chalk from 'chalk';
import { Command } from 'commander';
import { create } from '../commands/create.js';

const program = new Command();

program
  .name('my-workshop')
  .description('CLI for My Workshop Platform')
  .version('1.0.0');

program
  .command('create')
  .description('Create a new workshop')
  .argument('<n>', 'Name of the workshop')
  .option('-p, --path <path>', 'Path where to create the workshop', '.')
  .option('-t, --template <template>', 'Template to use', 'basic')
  .action(async (name, options) => {
    try {
      await create({ name, ...options });
    } catch (error) {
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
      process.exit(1);
    }
  });

program
  .command('start')
  .description('Start the workshop server')
  .option('-p, --port <port>', 'Port to listen on', '3000')
  .action(async (options) => {
    try {
      const corePath = path.resolve(__dirname, '../../../core/dist/bin/start.js');
      const coreBin = await import(corePath);
      process.env.PORT = options.port;
      await coreBin.start();
    } catch (error) {
      console.error(chalk.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
      process.exit(1);
    }
  });

program.parse(process.argv); 