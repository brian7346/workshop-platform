"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonList = LessonList;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Компонент списка уроков
 */
function LessonList({ lessons, currentLesson, onLessonSelect }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "lesson-list", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Lessons" }), (0, jsx_runtime_1.jsx)("ul", { children: lessons.map(lesson => ((0, jsx_runtime_1.jsx)("li", { className: currentLesson?.id === lesson.id ? 'active' : '', onClick: () => onLessonSelect(lesson.id), children: lesson.title }, lesson.id))) })] }));
}
//# sourceMappingURL=LessonList.js.map