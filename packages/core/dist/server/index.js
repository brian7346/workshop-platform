"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopServer = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
/**
 * WorkshopServer - основной класс для запуска сервера воркшопа
 */
class WorkshopServer {
    constructor(config) {
        this.lessons = [];
        this.app = (0, express_1.default)();
        this.config = config;
        this.setupMiddleware();
        this.loadLessons();
        this.setupRoutes();
    }
    /**
     * Настройка промежуточного ПО Express
     */
    setupMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../public')));
    }
    /**
     * Загрузка уроков из директории exercises
     */
    loadLessons() {
        const exercisesDir = path_1.default.join(this.config.cwd, this.config.exercisesDir);
        try {
            const lessonDirs = fs_1.default.readdirSync(exercisesDir)
                .filter(dir => fs_1.default.statSync(path_1.default.join(exercisesDir, dir)).isDirectory())
                .sort();
            this.lessons = lessonDirs.map(dir => {
                const lessonPath = path_1.default.join(exercisesDir, dir);
                const readmePath = path_1.default.join(lessonPath, 'README.md');
                let title = dir;
                let description = '';
                if (fs_1.default.existsSync(readmePath)) {
                    const content = fs_1.default.readFileSync(readmePath, 'utf-8');
                    const titleMatch = content.match(/^#\s+(.+)$/m);
                    if (titleMatch) {
                        title = titleMatch[1];
                    }
                    description = content;
                }
                return {
                    id: dir,
                    title,
                    description,
                    problems: this.findProblems(lessonPath),
                    solutions: this.findSolutions(lessonPath)
                };
            });
        }
        catch (error) {
            console.error('Error loading lessons:', error);
            this.lessons = [];
        }
    }
    /**
     * Поиск заданий в уроке
     */
    findProblems(lessonPath) {
        try {
            return fs_1.default.readdirSync(lessonPath)
                .filter(dir => dir.includes('.problem.'))
                .map(dir => ({
                id: dir,
                path: path_1.default.join(lessonPath, dir)
            }));
        }
        catch (error) {
            return [];
        }
    }
    /**
     * Поиск решений в уроке
     */
    findSolutions(lessonPath) {
        try {
            return fs_1.default.readdirSync(lessonPath)
                .filter(dir => dir.includes('.solution.'))
                .map(dir => ({
                id: dir,
                path: path_1.default.join(lessonPath, dir)
            }));
        }
        catch (error) {
            return [];
        }
    }
    /**
     * Настройка маршрутов Express
     */
    setupRoutes() {
        // API маршрут для получения списка уроков
        this.app.get('/api/lessons', (req, res) => {
            res.json(this.lessons.map(lesson => ({
                id: lesson.id,
                title: lesson.title,
                problems: lesson.problems.map((p) => p.id),
                solutions: lesson.solutions.map((s) => s.id)
            })));
        });
        // API маршрут для получения конкретного урока
        this.app.get('/api/lessons/:id', (req, res) => {
            const lesson = this.lessons.find(l => l.id === req.params.id);
            if (!lesson) {
                return res.status(404).json({ error: 'Lesson not found' });
            }
            res.json(lesson);
        });
        // API маршрут для получения файлов задания
        this.app.get('/api/lessons/:lessonId/problems/:problemId', (req, res) => {
            const { lessonId, problemId } = req.params;
            const lesson = this.lessons.find(l => l.id === lessonId);
            if (!lesson) {
                return res.status(404).json({ error: 'Lesson not found' });
            }
            const problem = lesson.problems.find((p) => p.id === problemId);
            if (!problem) {
                return res.status(404).json({ error: 'Problem not found' });
            }
            try {
                const filesDir = problem.path;
                const files = this.getDirectoryFiles(filesDir);
                res.json({ files });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to load problem files' });
            }
        });
        // API маршрут для получения файлов решения
        this.app.get('/api/lessons/:lessonId/solutions/:solutionId', (req, res) => {
            const { lessonId, solutionId } = req.params;
            const lesson = this.lessons.find(l => l.id === lessonId);
            if (!lesson) {
                return res.status(404).json({ error: 'Lesson not found' });
            }
            const solution = lesson.solutions.find((s) => s.id === solutionId);
            if (!solution) {
                return res.status(404).json({ error: 'Solution not found' });
            }
            try {
                const filesDir = solution.path;
                const files = this.getDirectoryFiles(filesDir);
                res.json({ files });
            }
            catch (error) {
                res.status(500).json({ error: 'Failed to load solution files' });
            }
        });
        // Маршрут для обслуживания клиентского приложения
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../../public/index.html'));
        });
    }
    /**
     * Получение всех файлов из директории
     */
    getDirectoryFiles(dir) {
        const files = [];
        function traverseDir(currentPath, relativePath = '') {
            const items = fs_1.default.readdirSync(currentPath);
            items.forEach(item => {
                const itemPath = path_1.default.join(currentPath, item);
                const itemRelativePath = relativePath ? path_1.default.join(relativePath, item) : item;
                const stats = fs_1.default.statSync(itemPath);
                if (stats.isDirectory()) {
                    traverseDir(itemPath, itemRelativePath);
                }
                else {
                    files.push({
                        path: itemRelativePath,
                        content: fs_1.default.readFileSync(itemPath, 'utf-8')
                    });
                }
            });
        }
        traverseDir(dir);
        return files;
    }
    /**
     * Запуск сервера
     */
    async start(port = 3000) {
        return new Promise((resolve, reject) => {
            try {
                this.app.listen(port, () => {
                    console.log(`Workshop server running at http://localhost:${port}`);
                    resolve();
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
exports.WorkshopServer = WorkshopServer;
//# sourceMappingURL=index.js.map