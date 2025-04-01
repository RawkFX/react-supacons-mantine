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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var clipboard_1 = __importDefault(require("clipboard"));
var hooks_1 = require("@mantine/hooks");
var DEFAULT_ICON_SUBTYPES = ["solid", "regular", "light", "thin", "duotone"];
var DEFAULT_ICONS_PER_PAGE = 48;
// Move this outside component to avoid recreation on each render
var copier = function (icon) {
    new clipboard_1.default("#copy", {
        text: function () { return icon; },
    });
};
// Cache promise to avoid duplicate requests
var iconsPromise = null;
var getIcons = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (!iconsPromise) {
            iconsPromise = Promise.all([
                Promise.resolve().then(function () { return __importStar(require("./icons/generic_icons.json")); }),
                Promise.resolve().then(function () { return __importStar(require("./icons/brand_icons.json")); })
            ]).then(function (_a) {
                var genericModule = _a[0], brandModule = _a[1];
                var generic_icons = genericModule.default;
                var brand_icons = brandModule.default;
                var convertToArray = function (icons, type) {
                    return Object.keys(icons).map(function (name) { return ({
                        name: name,
                        type: type,
                        subtypes: [],
                    }); });
                };
                return {
                    generic: convertToArray(generic_icons, "generic"),
                    brands: convertToArray(brand_icons, "brands"),
                };
            });
        }
        return [2 /*return*/, iconsPromise];
    });
}); };
var Icon = function (_a) {
    var name = _a.name, type = _a.type, subtypes = _a.subtypes, currentSubtype = _a.currentSubtype, _b = _a.size, size = _b === void 0 ? 18 : _b, _c = _a.color, color = _c === void 0 ? "black" : _c, copier = _a.clipboard.copier;
    var copyIconTag = function (type, subtype, name) {
        copier("".concat(type === "sharp" ? "fa-sharp " : "", "fa-").concat(subtype, " fa-").concat(name));
    };
    return (react_1.default.createElement(core_1.Box, { id: "copy", onClick: function () { return copyIconTag(type, currentSubtype, name); }, title: name },
        react_1.default.createElement("i", { className: "".concat(type === "sharp" ? "fa-sharp " : "", "fa-").concat(currentSubtype, " fa-").concat(name), style: { fontSize: "".concat(size, "px"), color: color } })));
};
var PopoverSearchIcon = function (_a) {
    var _b, _c;
    var onSelect = _a.onSelect, config = _a.config;
    var _d = (0, react_1.useState)([]), allIcons = _d[0], setAllIcons = _d[1];
    var _e = (0, react_1.useState)(""), search = _e[0], setSearch = _e[1];
    var debouncedSearch = (0, hooks_1.useDebouncedValue)(search, 500)[0];
    var _f = (0, react_1.useState)(false), popoverOpened = _f[0], setPopoverOpened = _f[1];
    var _g = (0, react_1.useState)(1), currentPage = _g[0], setCurrentPage = _g[1];
    var _h = (0, react_1.useState)(true), loading = _h[0], setLoading = _h[1];
    var _j = (0, react_1.useState)(null), iconClicked = _j[0], setIconClicked = _j[1];
    var iconSubtypes = (config === null || config === void 0 ? void 0 : config.availableStyles) || DEFAULT_ICON_SUBTYPES;
    var defaultSubtype = iconSubtypes[0] || DEFAULT_ICON_SUBTYPES[0];
    var _k = (0, react_1.useState)(defaultSubtype), selectedSubtype = _k[0], setSelectedSubtype = _k[1];
    var iconsPerPage = (config === null || config === void 0 ? void 0 : config.resultsPerPage) || DEFAULT_ICONS_PER_PAGE;
    // Memoize filtered icons
    var filteredIcons = (0, react_1.useMemo)(function () {
        var searchTerm = debouncedSearch.toLowerCase().replace(/[-_\s]/g, "");
        return allIcons.filter(function (_a) {
            var name = _a.name;
            return name.toLowerCase().includes(searchTerm);
        });
    }, [debouncedSearch, allIcons]);
    // Memoize grouped icons by subtype
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
    // Memoize current page icons
    var currentPageIcons = (0, react_1.useMemo)(function () {
        var _a;
        var start = (currentPage - 1) * iconsPerPage;
        var end = currentPage * iconsPerPage;
        return ((_a = groupedIcons[selectedSubtype]) === null || _a === void 0 ? void 0 : _a.slice(start, end)) || [];
    }, [groupedIcons, selectedSubtype, currentPage, iconsPerPage]);
    // Use useCallback for handlers
    var handleIconClick = (0, react_1.useCallback)(function (iconName) {
        setIconClicked(iconName);
        setTimeout(function () {
            setIconClicked(null);
            onSelect === null || onSelect === void 0 ? void 0 : onSelect(iconName);
            setPopoverOpened(false);
        }, 300); // Adjust the timeout duration as needed
    }, [onSelect]);
    var paginate = (0, react_1.useCallback)(function (pageNumber) {
        setCurrentPage(pageNumber);
    }, []);
    var handleSubtypeChange = (0, react_1.useCallback)(function (subtype) {
        setCurrentPage(1);
        setSelectedSubtype(subtype);
    }, []);
    var handlePopoverOpen = (0, react_1.useCallback)(function () {
        setSearch("");
        setSelectedSubtype(defaultSubtype);
        setTimeout(function () {
            setPopoverOpened(true);
        }, 300);
    }, [defaultSubtype]);
    var handlePopoverClose = (0, react_1.useCallback)(function () {
        setPopoverOpened(false);
    }, []);
    var handleSearchChange = (0, react_1.useCallback)(function (e) {
        setSearch(e.currentTarget.value);
        setCurrentPage(1);
    }, []);
    // Load icons when popover opens
    (0, react_1.useEffect)(function () {
        if (!popoverOpened)
            return;
        setLoading(true);
        var fetchIcons = function () { return __awaiter(void 0, void 0, void 0, function () {
            var icons, flattenIcons, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, getIcons()];
                    case 1:
                        icons = _a.sent();
                        flattenIcons = __spreadArray(__spreadArray([], icons.generic.map(function (icon) { return (__assign(__assign({}, icon), { type: "classic", subtypes: DEFAULT_ICON_SUBTYPES })); }), true), icons.brands.map(function (icon) { return (__assign(__assign({}, icon), { type: "brands", subtypes: ["brands"] })); }), true);
                        setAllIcons(flattenIcons);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Failed to load icons:", error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        fetchIcons();
    }, [popoverOpened]);
    // Update selected subtype when search changes
    (0, react_1.useEffect)(function () {
        if (filteredIcons.length < 1)
            return;
        var availableSubtypes = Object.keys(groupedIcons);
        if (availableSubtypes.length > 0 && !availableSubtypes.includes(selectedSubtype)) {
            setSelectedSubtype(availableSubtypes[0]);
        }
    }, [debouncedSearch, groupedIcons, selectedSubtype, filteredIcons.length]);
    // Memoize the button content
    var buttonContent = (0, react_1.useMemo)(function () {
        if ((config === null || config === void 0 ? void 0 : config.showBothIconAndText) && (config === null || config === void 0 ? void 0 : config.buttonIconName)) {
            return (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(Icon, { name: config.buttonIconName, size: config.buttonIconSize, color: config.buttonIconColor, type: "solid", subtypes: [], currentSubtype: "solid", clipboard: { copier: copier } }),
                react_1.default.createElement("span", { style: { marginLeft: "10px" } }, (config === null || config === void 0 ? void 0 : config.buttonLabel) || "Select Icon")));
        }
        else if (!(config === null || config === void 0 ? void 0 : config.showBothIconAndText) && (config === null || config === void 0 ? void 0 : config.buttonIconName)) {
            return (react_1.default.createElement(Icon, { name: config.buttonIconName, size: config.buttonIconSize, color: config.buttonIconColor, type: "solid", subtypes: [], currentSubtype: "solid", clipboard: { copier: copier } }));
        }
        return (config === null || config === void 0 ? void 0 : config.buttonLabel) || "Select Icon";
    }, [config]);
    // Fixed icons for navigation and subtype indicators
    var subtypeIndicatorIcons = (0, react_1.useMemo)(function () {
        var indicators = {
            brands: "chrome",
            default: "apartment"
        };
        return Object.keys(groupedIcons).map(function (subtype) { return ({
            subtype: subtype,
            iconName: subtype === "brands" ? indicators.brands : indicators.default
        }); });
    }, [groupedIcons]);
    return (react_1.default.createElement(core_1.Popover, { shadow: "md", width: 500, onOpen: handlePopoverOpen, onClose: handlePopoverClose, position: "bottom-start" },
        react_1.default.createElement(core_1.Popover.Target, null,
            react_1.default.createElement(core_1.Button, { style: { backgroundColor: config === null || config === void 0 ? void 0 : config.buttonColor } }, buttonContent)),
        react_1.default.createElement(core_1.Popover.Dropdown, null,
            react_1.default.createElement(core_1.Input, { placeholder: (config === null || config === void 0 ? void 0 : config.searchLabel) || "Search icons", value: search, onChange: handleSearchChange }),
            react_1.default.createElement(core_1.Box, { style: { position: "relative", width: "100%", minHeight: "20vh" } },
                loading && (react_1.default.createElement(core_1.Box, { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } },
                    react_1.default.createElement(core_1.Loader, null))),
                !loading && Object.keys(groupedIcons).length > 0 && ((_b = groupedIcons[selectedSubtype]) === null || _b === void 0 ? void 0 : _b.length) > 0 && (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("h3", null, selectedSubtype.charAt(0).toUpperCase() + selectedSubtype.slice(1)),
                    react_1.default.createElement(core_1.Grid, null, currentPageIcons.map(function (icon, i) { return (react_1.default.createElement(core_1.Grid.Col, { span: "auto", key: i },
                        react_1.default.createElement(core_1.Box, { onClick: function () { return handleIconClick(icon.name); }, style: {
                                cursor: "pointer",
                                textAlign: "center",
                                transition: "transform 0.2s",
                                transform: iconClicked === icon.name ? "scale(0.9)" : "scale(1)"
                            } },
                            react_1.default.createElement(Icon, { name: icon.name, type: icon.type, size: config === null || config === void 0 ? void 0 : config.contentSize, color: config === null || config === void 0 ? void 0 : config.contentColor, subtypes: icon.subtypes, currentSubtype: selectedSubtype, clipboard: { copier: copier } })))); })))),
                !loading && (filteredIcons.length === 0 || allIcons.length === 0) && (react_1.default.createElement(core_1.Box, { style: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" } },
                    react_1.default.createElement("h3", null, (config === null || config === void 0 ? void 0 : config.noIconsFoundText) || "No icons found"))),
                !loading && Object.keys(groupedIcons).length > 0 && (react_1.default.createElement(core_1.Grid, { justify: "center", style: { paddingTop: "5%" } },
                    react_1.default.createElement(core_1.Divider, { style: { width: "100%" } }),
                    subtypeIndicatorIcons.map(function (_a) {
                        var subtype = _a.subtype, iconName = _a.iconName;
                        return (react_1.default.createElement(core_1.Grid.Col, { span: 1, key: subtype },
                            react_1.default.createElement(core_1.Box, { style: {
                                    cursor: "pointer",
                                    textAlign: "center",
                                    backgroundColor: subtype === selectedSubtype ? "lightgray" : "transparent"
                                }, onClick: function () { return handleSubtypeChange(subtype); } }, allIcons
                                .filter(function (icon) { return icon.name === iconName && icon.subtypes.includes(subtype); })
                                .map(function (icon, i) { return (react_1.default.createElement(Icon, { key: i, name: icon.name, type: icon.type, size: config === null || config === void 0 ? void 0 : config.contentSize, color: config === null || config === void 0 ? void 0 : config.contentColor, subtypes: icon.subtypes, currentSubtype: subtype, clipboard: { copier: copier } })); }))));
                    }),
                    react_1.default.createElement(core_1.Divider, { style: { width: "100%" } }))),
                !loading && filteredIcons.length > iconsPerPage && (react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-around", paddingTop: "5%" } },
                    react_1.default.createElement(core_1.Button, { style: { backgroundColor: config === null || config === void 0 ? void 0 : config.buttonColor }, onClick: function () { return paginate(currentPage - 1); }, disabled: currentPage === 1 }, allIcons
                        .filter(function (icon) { return icon.name === "arrow-left-to-arc"; })
                        .map(function (icon, i) { return (react_1.default.createElement(Icon, { key: i, name: icon.name, type: icon.type, size: config === null || config === void 0 ? void 0 : config.contentSize, color: config === null || config === void 0 ? void 0 : config.buttonIconColor, subtypes: icon.subtypes, currentSubtype: "solid", clipboard: { copier: copier } })); })),
                    react_1.default.createElement("span", null, ((_c = config === null || config === void 0 ? void 0 : config.paginationLabel) === null || _c === void 0 ? void 0 : _c.replace("%d", currentPage.toString()).replace("%s", Math.ceil(filteredIcons.length / iconsPerPage).toString())) || "Page ".concat(currentPage, " of ").concat(Math.ceil(filteredIcons.length / iconsPerPage))),
                    react_1.default.createElement(core_1.Button, { style: { backgroundColor: config === null || config === void 0 ? void 0 : config.buttonColor }, onClick: function () { return paginate(currentPage + 1); }, disabled: currentPage * iconsPerPage >= filteredIcons.length }, allIcons
                        .filter(function (icon) { return icon.name === "arrow-right-to-arc"; })
                        .map(function (icon, i) { return (react_1.default.createElement(Icon, { key: i, name: icon.name, type: icon.type, size: config === null || config === void 0 ? void 0 : config.contentSize, color: config === null || config === void 0 ? void 0 : config.buttonIconColor, subtypes: icon.subtypes, currentSubtype: "solid", clipboard: { copier: copier } })); }))))))));
};
exports.default = PopoverSearchIcon;
