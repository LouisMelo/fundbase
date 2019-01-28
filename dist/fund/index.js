"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var utils_1 = require("../utils");
function getFundInfo(code) {
    var url = "http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/FundPageInfoService.tabjjgk?symbol=" + code + "&format=json";
    var p = axios_1.default.get(url);
    return rxjs_1.from(p)
        .pipe(operators_1.map(function (res) { return res.data.result.data; }))
        .pipe(operators_1.map(function (f) { return ({
        name: f.jjjc,
        full_name: f.jjqc,
        symbol: f.symbol,
        established: f.clrq,
        listed: f.ssrq,
        duration: f.xcr,
        operation_mode: f.Type1Name,
        type: f.Type2Name || '',
        secondary_category: f.Type3Name || '',
        scope: f.jjgm,
        total_share: parseFloat(f.jjfe),
        circulating_share: parseFloat(f.jjltfe),
        share_date: f.jjferq,
        quarter: f.quarter,
        manager: utils_1.fromHtml(f.ManagerName).name,
        administrator: f.glr,
        custodian: f.tgr,
        standard: f.bjjz,
        objective: f.tzmb,
        invest_range: f.tzfw,
        feature: f.fxsytz,
        distribution_principle: f.fpyz
    }); }));
}
exports.getFundInfo = getFundInfo;
