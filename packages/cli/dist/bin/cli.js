#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_1 = require("../commands/create");
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const program = new commander_1.Command();
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
        await (0, create_1.create)({ name, ...options });
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
        process.exit(1);
    }
});
program
    .command('start')
    .description('Start the workshop server')
    .option('-p, --port <port>', 'Port to listen on', '3000')
    .action(async (options) => {
    try {
        const corePath = path_1.default.resolve(__dirname, '../../../core/dist/bin/start');
        const coreBin = require(corePath);
        process.env.PORT = options.port;
        await coreBin.start();
    }
    catch (error) {
        console.error(chalk_1.default.red(`Error: ${error instanceof Error ? error.message : String(error)}`));
        process.exit(1);
    }
});
program.parse(process.argv);
//# sourceMappingURL=cli.js.map