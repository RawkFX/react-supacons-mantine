"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var core_1 = require("@mantine/core");
var Icon = function (_a) {
    var name = _a.name, type = _a.type, subtypes = _a.subtypes, currentSubtype = _a.currentSubtype, copier = _a.clipboard.copier;
    var copyIconTag = function (type, subtype, name) {
        copier("".concat(type === "sharp" ? "fa-sharp " : "", "fa-").concat(subtype, " fa-").concat(name));
    };
    return (react_1.default.createElement(core_1.Box, { id: "copy", onClick: function () { return copyIconTag(type, currentSubtype, name); }, title: name },
        react_1.default.createElement("i", { className: "".concat(type === "sharp" ? "fa-sharp " : "", "fa-").concat(currentSubtype, " fa-").concat(name) })));
};
exports.default = Icon;
