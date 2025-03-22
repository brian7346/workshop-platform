"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workshop = Workshop;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const LessonList_1 = require("./LessonList");
const LessonContent_1 = require("./LessonContent");
const Toolbar_1 = require("./Toolbar");
/**
 * Основной компонент Workshop
 */
function Workshop({ title }) {
    const [lessons, setLessons] = (0, react_1.useState)([]);
    const [currentLesson, setCurrentLesson] = (0, react_1.useState)(null);
    const [currentView, setCurrentView] = (0, react_1.useState)('problem');
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    // Загрузка уроков при монтировании компонента
    (0, react_1.useEffect)(() => {
        async function fetchLessons() {
            try {
                setLoading(true);
                const response = await fetch('/api/lessons');
                if (!response.ok) {
                    throw new Error('Failed to fetch lessons');
                }
                const data = await response.json();
                setLessons(data);
                // Выбираем первый урок по умолчанию
                if (data.length > 0) {
                    const firstLesson = await fetchLesson(data[0].id);
                    setCurrentLesson(firstLesson);
                }
                setLoading(false);
            }
            catch (error) {
                console.error('Error fetching lessons:', error);
                setError('Failed to load lessons');
                setLoading(false);
            }
        }
        fetchLessons();
    }, []);
    // Загрузка конкретного урока
    async function fetchLesson(id) {
        try {
            const response = await fetch(`/api/lessons/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch lesson');
            }
            return await response.json();
        }
        catch (error) {
            console.error(`Error fetching lesson ${id}:`, error);
            setError('Failed to load lesson');
            return null;
        }
    }
    // Обработчик выбора урока
    async function handleLessonSelect(id) {
        const lesson = await fetchLesson(id);
        setCurrentLesson(lesson);
    }
    // Обработчик изменения вида
    function handleViewChange(view) {
        setCurrentView(view);
    }
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "workshop-loading", children: [(0, jsx_runtime_1.jsx)("div", { className: "spinner" }), (0, jsx_runtime_1.jsx)("p", { children: "Loading workshop..." })] }));
    }
    if (error) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "workshop-error", children: [(0, jsx_runtime_1.jsx)("h2", { children: "Error" }), (0, jsx_runtime_1.jsx)("p", { children: error }), (0, jsx_runtime_1.jsx)("button", { onClick: () => window.location.reload(), children: "Retry" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "workshop-container", children: [(0, jsx_runtime_1.jsx)("header", { className: "workshop-header", children: (0, jsx_runtime_1.jsx)("h1", { children: title }) }), (0, jsx_runtime_1.jsxs)("div", { className: "workshop-layout", children: [(0, jsx_runtime_1.jsx)("aside", { className: "workshop-sidebar", children: (0, jsx_runtime_1.jsx)(LessonList_1.LessonList, { lessons: lessons, currentLesson: currentLesson, onLessonSelect: handleLessonSelect }) }), (0, jsx_runtime_1.jsxs)("main", { className: "workshop-main", children: [(0, jsx_runtime_1.jsx)(Toolbar_1.Toolbar, { currentView: currentView, onViewChange: handleViewChange }), currentLesson && ((0, jsx_runtime_1.jsx)(LessonContent_1.LessonContent, { lesson: currentLesson, view: currentView }))] })] })] }));
}
//# sourceMappingURL=Workshop.js.map