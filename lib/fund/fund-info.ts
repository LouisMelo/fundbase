import axios from 'axios'

export function getFundInfo(code: string) {
  axios.get(`http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/FundPageInfoService.tabjjgk?symbol=${code}&format=json`)
    .then((res) => {
      return res.data
    })
}