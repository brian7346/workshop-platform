"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonContent = LessonContent;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const marked_1 = require("marked");
/**
 * Компонент содержимого урока
 */
function LessonContent({ lesson, view }) {
    const [content, setContent] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        if (!lesson)
            return;
        const fetchContent = async () => {
            try {
                setLoading(true);
                setError(null);
                if (view === 'problem' && lesson.problems.length > 0) {
                    const problemId = lesson.problems[0].id;
                    const response = await fetch(`/api/lessons/${lesson.id}/problems/${problemId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch problem');
                    }
                    const data = await response.json();
                    setContent(lesson.description);
                }
                else if (view === 'solution' && lesson.solutions.length > 0) {
                    const solutionId = lesson.solutions[0].id;
                    const response = await fetch(`/api/lessons/${lesson.id}/solutions/${solutionId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch solution');
                    }
                    const data = await response.json();
                    setContent(lesson.description);
                }
                else if (view === 'playground') {
                    setContent(lesson.description);
                }
                else {
                    setContent(lesson.description);
                }
                setLoading(false);
            }
            catch (error) {
                console.error('Error fetching content:', error);
                setError('Failed to load content');
                setLoading(false);
            }
        };
        fetchContent();
    }, [lesson, view]);
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "loading", children: "Loading..." });
    }
    if (error) {
        return (0, jsx_runtime_1.jsx)("div", { className: "error", children: error });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "lesson-content", children: [(0, jsx_runtime_1.jsx)("div", { className: "lesson-description", dangerouslySetInnerHTML: { __html: (0, marked_1.marked)(lesson.description) } }), view === 'problem' && lesson.problems.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "problem-content", children: (0, jsx_runtime_1.jsx)("h3", { children: "Problem" }) })), view === 'solution' && lesson.solutions.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "solution-content", children: (0, jsx_runtime_1.jsx)("h3", { children: "Solution" }) })), view === 'playground' && ((0, jsx_runtime_1.jsx)("div", { className: "playground-content", children: (0, jsx_runtime_1.jsx)("h3", { children: "Playground" }) }))] }));
}
//# sourceMappingURL=LessonContent.js.map