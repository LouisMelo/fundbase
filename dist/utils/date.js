"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
function lastYearToday() {
    var m = moment_1.default().subtract(1, 'year');
    return m.format('YYYY-MM-DD');
}
exports.lastYearToday = lastYearToday;
function today() {
    var m = moment_1.default();
    return m.format('YYYY-MM-DD');
}
exports.today = today;
