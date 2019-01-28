"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
function getFundInfo(code) {
    axios_1.default.get("http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/FundPageInfoService.tabjjgk?symbol=" + code + "&format=json")
        .then(function (res) {
        return res.data;
    });
}
exports.getFundInfo = getFundInfo;
