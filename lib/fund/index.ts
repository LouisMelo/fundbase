import axios from 'axios'
import { from, of, Observable } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { fromHtml, today, lastYearToday } from '../utils'
import { FundSchema, FundRaw, Nav } from './types';

export function getFundInfo(code: string): Observable<FundSchema> {
  const url = `http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/FundPageInfoService.tabjjgk?symbol=${code}&format=json`
  const p = axios.get(url)

  return from(p)
    .pipe(map((res: any) => res.data.result.data))
    .pipe(map((f: FundRaw) => ({
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
      manager: fromHtml(f.ManagerName).name,
      administrator: f.glr,
      custodian: f.tgr,
      standard: f.bjjz,
      objective: f.tzmb,
      invest_range: f.tzfw,
      feature: f.fxsytz,
      distribution_principle: f.fpyz
    })))
}

/* code, start, end,... */
export function getNavHistory(code: string): Observable<Nav[]>{
  const start = lastYearToday()
  const end = today()

  return getFundInfo(code).pipe(
    mergeMap((fund) => {
      let isMonetary = false

      if (fund.type.indexOf('债券型') > -1 || fund.type.indexOf('货币型') > -1) {
        isMonetary = true
      }
      return getNavHistoryNum(code, start, end, isMonetary).pipe(
        mergeMap(num => parseNavHistoryData(code, start, end, num, isMonetary))
      )
    })
  )
}

function getNavHistoryNum(code: string, start: string, end: string, isMonetary = false): Observable<number> {
  let requestUrl: string
  if (isMonetary) {
    requestUrl = `http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/CaihuiFundInfoService.getNavcur?symbol=${code}&datefrom=${start}&dateto=${end}`
  } else {
    requestUrl = `http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/CaihuiFundInfoService.getNav?symbol=${code}&datefrom=${start}&dateto=${end}`
  }

  return from(axios.get(requestUrl))
    .pipe(map(res => parseInt(res.data.result.data.total_num)))
}

function parseNavHistoryData(code: string, start: string, end: string, num: number, isMonetary: boolean): Observable<Nav[]> {
  if (num === 0) {
    return of([])
  }

  let requestUrl: string
  if (isMonetary) {
    requestUrl = `http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/CaihuiFundInfoService.getNavcur?symbol=${code}&datefrom=${start}&dateto=${end}&num=${num}`
  } else {
    requestUrl = `http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/CaihuiFundInfoService.getNav?symbol=${code}&datefrom=${start}&dateto=${end}&num=${num}`
  }

  return from(axios.get(requestUrl))
    .pipe(
      map(res => res.data.result.data.data),
      map(rows => rows.map((row: any) => ({
        date: row.fbrq.split(' ')[0],
        value: parseFloat(row.jjjz),
        total: parseFloat(row.ljjz)
      }))),
    )
}
