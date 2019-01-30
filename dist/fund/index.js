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
/* code, start, end,... */
function getNavHistory(code) {
    var start = utils_1.lastYearToday();
    var end = utils_1.today();
    return getFundInfo(code).pipe(operators_1.mergeMap(function (fund) {
        var isMonetary = false;
        if (fund.type.indexOf('债券型') > -1 || fund.type.indexOf('货币型') > -1) {
            isMonetary = true;
        }
        return getNavHistoryNum(code, start, end, isMonetary).pipe(operators_1.mergeMap(function (num) { return parseNavHistoryData(code, start, end, num, isMonetary); }));
    }));
}
exports.getNavHistory = getNavHistory;
function getNavHistoryNum(code, start, end, isMonetary) {
    if (isMonetary === void 0) { isMonetary = false; }
    var requestUrl;
    if (isMonetary) {
        requestUrl = "http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/CaihuiFundInfoService.getNavcur?symbol=" + code + "&datefrom=" + start + "&dateto=" + end;
    }
    else {
        requestUrl = "http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/CaihuiFundInfoService.getNav?symbol=" + code + "&datefrom=" + start + "&dateto=" + end;
    }
    return rxjs_1.from(axios_1.default.get(requestUrl))
        .pipe(operators_1.map(function (res) { return parseInt(res.data.result.data.total_num); }));
}
function parseNavHistoryData(code, start, end, num, isMonetary) {
    if (num === 0) {
        return rxjs_1.of([]);
    }
    var requestUrl;
    if (isMonetary) {
        requestUrl = "http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/CaihuiFundInfoService.getNavcur?symbol=" + code + "&datefrom=" + start + "&dateto=" + end + "&num=" + num;
    }
    else {
        requestUrl = "http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/CaihuiFundInfoService.getNav?symbol=" + code + "&datefrom=" + start + "&dateto=" + end + "&num=" + num;
    }
    return rxjs_1.from(axios_1.default.get(requestUrl))
        .pipe(operators_1.map(function (res) { return res.data.result.data.data; }), operators_1.map(function (rows) { return rows.map(function (row) { return ({
        date: row.fbrq.split(' ')[0],
        value: parseFloat(row.jjjz),
        total: parseFloat(row.ljjz)
    }); }); }));
}
getNavHistory('512880').subscribe(function (res) { return console.table(res); });
