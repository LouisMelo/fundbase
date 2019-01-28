import moment from 'moment'

export function lastYearToday(): string {
  const m = moment().subtract(1, 'year')
  return m.format('YYYY-MM-DD')
}

export function today(): string {
  const m = moment()
  return m.format('YYYY-MM-DD')
}
