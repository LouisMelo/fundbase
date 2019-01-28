import axios from 'axios'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { fromHtml } from '../utils'
import { FundSchema, FundRaw } from './types';

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
