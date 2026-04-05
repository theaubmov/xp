import { DateTime } from 'luxon'

export default function useFormatTime() {
  function fromMillisToDAteTimeString(v: number): string {
    return DateTime.fromMillis(v).toFormat('D T')
  }

  return {
    fromMillisToDAteTimeString
  }
}
