import * as dayjs from 'dayjs'

export function formatTimestamp (timestamp: number, format: string = 'YYYY-MM-DD' ) {
  return dayjs.unix(timestamp / 1000).format(format);
}