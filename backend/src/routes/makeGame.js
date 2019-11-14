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
var index_1 = require("../index");
var repoFunctions_1 = require("../services/repoFunctions");
var linter_1 = require("../services/linter");
var makeGameFromLinter_1 = require("../services/makeGameFromLinter");
var compileImages_1 = require("../services/compileImages");
index_1.app.post("/makeWorld", function (_a, res) {
    var body = _a.body;
    return __awaiter(void 0, void 0, void 0, function () {
        var directory, lint, game, data, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!body.repoURL) {
                        res.sendStatus(401);
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, repoFunctions_1.saveRepo(body.repoURL)];
                case 2:
                    directory = _b.sent();
                    console.log(directory);
                    return [4 /*yield*/, linter_1["default"]({ directory: directory })];
                case 3:
                    lint = _b.sent();
                    console.log(lint);
                    return [4 /*yield*/, makeGameFromLinter_1["default"](lint)];
                case 4:
                    game = _b.sent();
                    console.log(game);
                    return [4 /*yield*/, compileImages_1["default"](game)];
                case 5:
                    data = _b.sent();
                    res.setHeader('Content-type', 'application/zip');
                    res.setHeader('Content-disposition', 'attachment; filename=mario_level_language.zip');
                    res.end(data, "binary");
                    res.status(200);
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _b.sent();
                    console.log(err_1);
                    res.status(500).send(err_1);
                    return [3 /*break*/, 7];
                case 7: return [4 /*yield*/, repoFunctions_1.deleteRepo(directory)];
                case 8:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
