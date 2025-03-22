"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toolbar = Toolbar;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Компонент панели инструментов
 */
function Toolbar({ currentView, onViewChange }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "toolbar", children: [(0, jsx_runtime_1.jsx)("button", { className: currentView === 'playground' ? 'active' : '', onClick: () => onViewChange('playground'), children: "Playground" }), (0, jsx_runtime_1.jsx)("button", { className: currentView === 'problem' ? 'active' : '', onClick: () => onViewChange('problem'), children: "Problem" }), (0, jsx_runtime_1.jsx)("button", { className: currentView === 'solution' ? 'active' : '', onClick: () => onViewChange('solution'), children: "Solution" }), (0, jsx_runtime_1.jsx)("button", { children: "Tests" }), (0, jsx_runtime_1.jsx)("button", { children: "Diff" }), (0, jsx_runtime_1.jsx)("button", { children: "Chat" })] }));
}
//# sourceMappingURL=Toolbar.js.map