"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var core_1 = require("@mantine/core");
var Icon_1 = __importDefault(require("./components/Icon"));
var clipboard_1 = __importDefault(require("clipboard"));
var hooks_1 = require("@mantine/hooks");
var iconSubtypes = ["solid", "regular", "light", "thin", "duotone"];
var copier = function (icon) {
    new clipboard_1.default("#copy", {
        text: function () { return icon; },
    });
};
var getIcons = function () { return __awaiter(void 0, void 0, void 0, function () {
    var generic_icons, brand_icons, convertToArray;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./icons/generic_icons.json")); })];
            case 1:
                generic_icons = (_a.sent()).default;
                return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("./icons/brand_icons.json")); })];
            case 2:
                brand_icons = (_a.sent()).default;
                convertToArray = function (icons, type) {
                    return Object.keys(icons).map(function (name) { return ({
                        name: name,
                        type: type,
                        subtypes: [], // Add appropriate subtypes if needed
                    }); });
                };
                return [2 /*return*/, {
                        generic: convertToArray(generic_icons, "generic"), brands: convertToArray(brand_icons, "brands"),
                    }];
        }
    });
}); };
var Index = function (_a) {
    var onClick = _a.onClick;
    var _b = (0, react_1.useState)([]), allIcons = _b[0], setAllIcons = _b[1];
    var _c = (0, react_1.useState)(""), search = _c[0], setSearch = _c[1];
    var debouncedSearch = (0, hooks_1.useDebouncedValue)(search, 500)[0];
    var _d = (0, react_1.useState)(false), popoverOpened = _d[0], setPopoverOpened = _d[1];
    var _e = (0, react_1.useState)(1), currentPage = _e[0], setCurrentPage = _e[1];
    var _f = (0, react_1.useState)(iconSubtypes[0]), selectedSubtype = _f[0], setSelectedSubtype = _f[1];
    var iconsPerPage = 48;
    var filteredIcons = (0, react_1.useMemo)(function () {
        var searchTerm = debouncedSearch.toLowerCase().replace(/[-_\s]/g, "");
        return allIcons.filter(function (_a) {
            var name = _a.name;
            return name.toLowerCase().includes(searchTerm);
        });
    }, [debouncedSearch, allIcons]);
    var groupedIcons = (0, react_1.useMemo)(function () {
        return filteredIcons.reduce(function (acc, icon) {
            icon.subtypes.forEach(function (subtype) {
                if (!acc[subtype]) {
                    acc[subtype] = [];
                }
                acc[subtype].push(icon);
            });
            return acc;
        }, {});
    }, [filteredIcons]);
    var handleIconClick = function (iconName) {
        if (onClick) {
            onClick(iconName);
        }
    };
    var paginate = function (pageNumber) { return setCurrentPage(pageNumber); };
    (0, react_1.useEffect)(function () {
        var fetchIcons = function () { return __awaiter(void 0, void 0, void 0, function () {
            var icons, flattenIcons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getIcons()];
                    case 1:
                        icons = _a.sent();
                        flattenIcons = __spreadArray(__spreadArray([], icons.generic.map(function (icon) { return (__assign(__assign({}, icon), { type: "classic", subtypes: iconSubtypes })); }), true), icons.brands.map(function (icon) { return (__assign(__assign({}, icon), { type: "brands", subtypes: ["brands"] })); }), true);
                        setAllIcons(flattenIcons);
                        return [2 /*return*/];
                }
            });
        }); };
        if (popoverOpened)
            fetchIcons();
    }, [popoverOpened]);
    (0, react_1.useEffect)(function () {
        if (filteredIcons.length < 1)
            return;
        var firstSubtype = filteredIcons[0].subtypes[0];
        if (firstSubtype && firstSubtype !== selectedSubtype)
            setSelectedSubtype(firstSubtype);
    }, [debouncedSearch, allIcons]);
    return (react_1.default.createElement(core_1.Popover, { shadow: "md", width: 500, onOpen: function () {
            if (search !== "")
                setSearch("");
            if (selectedSubtype !== iconSubtypes[0])
                setSelectedSubtype(iconSubtypes[0]);
            setTimeout(function () {
                setPopoverOpened(true);
            }, 300);
        }, onClose: function () { return setPopoverOpened(false); } },
        react_1.default.createElement(core_1.Popover.Target, null,
            react_1.default.createElement(core_1.Button, null, "Select Icon")),
        react_1.default.createElement(core_1.Popover.Dropdown, null,
            react_1.default.createElement(core_1.Input, { placeholder: "Search icons", value: search, onChange: function (e) {
                    setSearch(e.currentTarget.value);
                    setCurrentPage(1);
                } }),
            react_1.default.createElement(core_1.Box, { style: { position: "relative", width: "100%", minHeight: "20vh" } },
                !popoverOpened && (react_1.default.createElement(core_1.Box, { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } },
                    react_1.default.createElement(core_1.Loader, null))),
                Object.keys(groupedIcons).map(function (subtype, index) { return (react_1.default.createElement("div", { key: index }, subtype === selectedSubtype && groupedIcons[subtype].slice((currentPage - 1) * iconsPerPage, currentPage * iconsPerPage).length > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("h3", null, subtype.charAt(0).toUpperCase() + subtype.slice(1)),
                    react_1.default.createElement(core_1.Grid, null, groupedIcons[subtype].slice((currentPage - 1) * iconsPerPage, currentPage * iconsPerPage).map(function (icon, i) { return (react_1.default.createElement(core_1.Grid.Col, { span: 1, key: i },
                        react_1.default.createElement("div", { key: i, onClick: function () { return handleIconClick(icon.name); }, style: { cursor: "pointer", textAlign: "center" } },
                            react_1.default.createElement(Icon_1.default, { name: icon.name, type: icon.type, subtypes: icon.subtypes, currentSubtype: subtype, clipboard: { copier: copier } })))); })))))); }),
                (filteredIcons.length === 0 || allIcons.length === 0) && (react_1.default.createElement(core_1.Box, { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } },
                    react_1.default.createElement("h3", null, "No icons found"))),
                Object.keys(groupedIcons).length > 0 && (react_1.default.createElement(core_1.Grid, { justify: "center", style: { paddingTop: "5%" } },
                    react_1.default.createElement(core_1.Divider, { style: { width: "100%" } }),
                    Object.keys(groupedIcons).map(function (subtype, index) { return (react_1.default.createElement(core_1.Grid.Col, { span: 1, key: index },
                        react_1.default.createElement(core_1.Box, { style: {
                                cursor: "pointer",
                                textAlign: "center",
                                backgroundColor: subtype === selectedSubtype ? "lightgray" : "transparent"
                            }, onClick: function () {
                                setCurrentPage(1);
                                setSelectedSubtype(subtype);
                            } }, subtype === "brands" ?
                            allIcons.filter(function (icon) { return icon.name === "chrome" && icon.subtypes.includes(subtype); })
                                .map(function (icon, i) { return (react_1.default.createElement(Icon_1.default, { key: i, name: icon.name, type: icon.type, subtypes: icon.subtypes, currentSubtype: subtype, clipboard: { copier: copier } })); })
                            :
                                allIcons
                                    .filter(function (icon) { return icon.name === "apartment" && icon.subtypes.includes(subtype); })
                                    .map(function (icon, i) { return (react_1.default.createElement(Icon_1.default, { key: i, name: icon.name, type: icon.type, subtypes: icon.subtypes, currentSubtype: subtype, clipboard: { copier: copier } })); })))); }),
                    react_1.default.createElement(core_1.Divider, { style: { width: "100%" } }))),
                filteredIcons.length > iconsPerPage && (react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-around", paddingTop: "5%" } },
                    react_1.default.createElement(core_1.Button, { onClick: function () { return paginate(currentPage - 1); }, disabled: currentPage === 1 }, allIcons
                        .filter(function (icon) { return icon.name === "arrow-left-to-arc"; })
                        .map(function (icon, i) { return (react_1.default.createElement(Icon_1.default, { key: i, name: icon.name, type: icon.type, subtypes: icon.subtypes, currentSubtype: "solid", clipboard: { copier: copier } })); })),
                    react_1.default.createElement("span", null,
                        "Page ",
                        currentPage,
                        " of ",
                        Math.ceil(filteredIcons.length / iconsPerPage)),
                    react_1.default.createElement(core_1.Button, { onClick: function () { return paginate(currentPage + 1); }, disabled: currentPage * iconsPerPage >= filteredIcons.length }, allIcons
                        .filter(function (icon) { return icon.name === "arrow-right-to-arc"; })
                        .map(function (icon, i) { return (react_1.default.createElement(Icon_1.default, { key: i, name: icon.name, type: icon.type, subtypes: icon.subtypes, currentSubtype: "solid", clipboard: { copier: copier } })); }))))))));
};
exports.default = Index;
