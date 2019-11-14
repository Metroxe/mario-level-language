"use strict";
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
        while (_) try {
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
exports.__esModule = true;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var axios_1 = require("axios");
var jszip_1 = require("jszip");
// CONSTANTS
var GET_REPO = 'https://api.github.com/repos/';
var regex = /(http(s)?:(\/\/))?(www\.)?github.com(\/.+\/.+)/;
var hostRegex = /(http(s)?:(\/\/))?(www\.)?github.com\//;
var jsRegex = /(\w*)\.js$/;
var regexList = [/.*(eslint(.+).js).*/, /.*(test.js)/];
/**
 * Save the repo to a temporary directory, every repo saved should have its own temporary
 * directory to avoid overlapping repos being analyzed at the same time. At the end, return
 * the path of the directory
 * @param url of the repo
 */
function saveRepo(url) {
    return __awaiter(this, void 0, void 0, function () {
        var request, path, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!regex.test(url)) {
                        throw new Error(url + " is not a valid url");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    request = generatePathAndRequest(url);
                    return [4 /*yield*/, fetchRepo(request)];
                case 2:
                    path = _a.sent();
                    return [2 /*return*/, path_1["default"].join(__dirname, path)];
                case 3:
                    e_1 = _a.sent();
                    throw new Error(e_1);
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.saveRepo = saveRepo;
/**
 * remove the repo from the directory. This function is called in case of errors, so make sure
 * it still works even if there is nothing at the directory
 * @param directory of the repo on the local
 */
function deleteRepo(directory) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Deleting directory: " + directory);
                    return [4 /*yield*/, fs_extra_1["default"].remove(directory)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.deleteRepo = deleteRepo;
/**
 * Return path of directory
 * @param url is the url to fetch the repo
 */
function fetchRepo(url) {
    return __awaiter(this, void 0, void 0, function () {
        var path, res, zip, data, _i, _a, _b, key, value, _c, e_2;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 10, , 11]);
                    console.log("Fetching Repo: " + url);
                    return [4 /*yield*/, axios_1["default"].get(url, { responseType: 'arraybuffer' })];
                case 1:
                    res = _d.sent();
                    console.log('Done Fetching Repo');
                    zip = new jszip_1["default"]();
                    return [4 /*yield*/, zip.loadAsync(res.data)];
                case 2:
                    data = _d.sent();
                    _i = 0, _a = Object.entries(data.files);
                    _d.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                    _b = _a[_i], key = _b[0], value = _b[1];
                    if (!(path)) return [3 /*break*/, 5];
                    return [4 /*yield*/, saveFile(value)];
                case 4:
                    _c = _d.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, saveFile(value)];
                case 6:
                    _c = path = _d.sent();
                    _d.label = 7;
                case 7:
                    _c;
                    _d.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 3];
                case 9: return [2 /*return*/, path];
                case 10:
                    e_2 = _d.sent();
                    throw new Error(e_2);
                case 11: return [2 /*return*/];
            }
        });
    });
}
/**
 * return path of file
 * @param file is the loaded file
 */
function saveFile(file) {
    return __awaiter(this, void 0, void 0, function () {
        var data, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!file.dir) return [3 /*break*/, 2];
                    return [4 /*yield*/, createDirectory(path_1["default"].join(__dirname, file.name))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, file.name];
                case 2:
                    if (!(isJS(file.name) && !isMatch(file.name))) return [3 /*break*/, 7];
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 7]);
                    console.log("Saving file: " + file.name);
                    return [4 /*yield*/, file.async('binarystring')];
                case 4:
                    data = _a.sent();
                    return [4 /*yield*/, fs_extra_1["default"].writeFile(path_1["default"].join(__dirname, file.name), data)];
                case 5:
                    _a.sent();
                    console.log('Done saving file');
                    return [3 /*break*/, 7];
                case 6:
                    e_3 = _a.sent();
                    throw new Error(e_3);
                case 7: return [2 /*return*/, null];
            }
        });
    });
}
/**
 * checks if the file or directory is in disk
 * @param path of file or directory
 */
function exists(path) {
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fs_extra_1["default"].access(path, fs_extra_1["default"].constants.F_OK)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, false];
                case 2:
                    e_4 = _a.sent();
                    // check for better exists?
                    return [2 /*return*/, true];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * Checks if directory is, if not create the directory given the path
 * @param path of directory
 */
function createDirectory(path) {
    return __awaiter(this, void 0, void 0, function () {
        var e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exists(path)];
                case 1:
                    if (!(_a.sent())) {
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, fs_extra_1["default"].mkdir(path)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
                case 4:
                    e_5 = _a.sent();
                    throw new Error(e_5);
                case 5: return [2 /*return*/];
            }
        });
    });
}
function generatePathAndRequest(url) {
    var cleanUrl = url.replace(hostRegex, "");
    return generateRequest(cleanUrl);
}
function generateRequest(path) {
    return "" + GET_REPO + path + "/zipball/master";
}
function isJS(name) {
    return jsRegex.test(name);
}
function isMatch(name) {
    return regexList.some(function (rx) { return rx.test(name); });
}
/**
 * return a list of files given the path
 * @param path
 */
function readFiles(path) {
    return __awaiter(this, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1["default"].readdir(path)];
                case 1:
                    files = _a.sent();
                    return [2 /*return*/, files];
            }
        });
    });
}
exports.readFiles = readFiles;
