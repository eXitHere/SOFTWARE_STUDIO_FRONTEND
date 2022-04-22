import moment from 'moment'
import { formatRelative } from 'date-fns'
import { th } from 'date-fns/locale'

export const dateRelative = (dateString: string) => {
  return formatRelative(new Date(moment(dateString).format()), new Date(), { locale: th })
}
