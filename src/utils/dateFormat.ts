import * as dayjs from 'dayjs'

export function formatTimestamp (timestamp: number, format: string = 'YYYY-MM-DD') {
  return dayjs.unix(timestamp / 1000).format(format);
}

export function formatDuration (duration: number) {
  const m = parseInt((duration / 60 % 60).toString())
  const mm = m.toString().padStart(2, '0')
  const s = parseInt((duration % 60).toString())
  const ss = s.toString().padStart(2, '0')
  return `${mm}:${ss}`
}