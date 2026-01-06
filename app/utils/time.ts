import { format as formatDate, fromUnixTime, getUnixTime, isValid } from 'date-fns'

export interface TimestampConversion {
  timestamp: number
  date: Date
  formattedDate: string
  timezone: string
}

export class UnixTimestampService {
  timestampToDate(timestamp: number, formatStr: string = 'yyyy-MM-dd HH:mm:ss'): TimestampConversion {
    let date: Date
    let isMs = false

    // Auto-detect seconds vs milliseconds
    // 10 digits is seconds (up to year 2286)
    // 13 digits is milliseconds
    if (Math.abs(timestamp).toString().length >= 13) {
      date = new Date(timestamp)
      isMs = true
    } else {
      date = fromUnixTime(timestamp)
    }

    if (!isValid(date)) {
      throw new Error('Invalid timestamp')
    }

    let formattedString = ''
    if (formatStr === 'ISO') {
      formattedString = date.toISOString()
    } else {
      formattedString = formatDate(date, formatStr)
    }

    return {
      timestamp: isMs ? Math.floor(timestamp / 1000) : timestamp,
      date,
      formattedDate: formattedString,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  }

  dateToTimestamp(date: Date): number {
    return getUnixTime(date)
  }

  getCurrentTimestamp(): number {
    return getUnixTime(new Date())
  }

  getSupportedFormats(): string[] {
    return [
      'yyyy-MM-dd HH:mm:ss',
      'yyyy-MM-dd',
      'MM/dd/yyyy',
      'dd/MM/yyyy',
      'ISO'
    ]
  }
}
