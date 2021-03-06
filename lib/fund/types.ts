export type FundSchema = {
  // 基金简称
  name: string,
  // 基金全称
  full_name: string,
  // 基金代码
  symbol: string,
  // 成立日期
  established: string,
  // 上市日期
  listed: string,
  // 存续期限
  duration: string,
  // 运作方式
  operation_mode: string,
  // 基金类型 (指数型/股票型/债券型/ETF...)
  type: string,
  // 二级分类
  secondary_category: string,
  // 基金规模(亿元)
  scope: number,
  // 基金总份额(亿份)
  total_share: number,
  // 上市流通份额(亿份)
  circulating_share: number,
  // 基金份额日期
  share_date: string,
  // 上市季度
  quarter: number,
  // 基金经理
  manager: string,
  // 基金管理人
  administrator: string,
  // 基金托管人
  custodian: string,
  // 比较基准(跟踪何种指数)
  standard: string,
  // 投资目标
  objective: string,
  // 投资范围
  invest_range: string,
  // 风险收益特征
  feature: string,
  // 收益分配原则
  distribution_principle: string
}

export type FundRaw = {
  jjqc: string,
  jjjc: string,
  symbol: string,
  clrq: string,
  ssrq: string,
  xcr: string,
  ssdd: string,
  Type1Name: string,
  Type2Name?: string,
  Type3Name?: string,
  jjgm: number,
  jjfe: string,
  jjltfe: string,
  jjferq: string,
  SGXX?: string,
  quarter: number,
  ManagerName: string,
  glr: string,
  glrurl: string,
  tgr: string,
  bjjz: string,
  tzmb: string,
  tzfw: string,
  fxsytz: string,
  fpyz: string
}

export type Nav = {
  // 日期
  date: string,
  // 基金净值
  value: number,
  // 累计净值
  total: number,
  // 净值增长率
  change?: number,
}
