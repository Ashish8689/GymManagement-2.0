import { addMonths, format } from 'date-fns'

// Return current date in DD/MM/YYYY format
export const getCurrentDate = (): string => format(new Date(), 'dd/MM/yyyy')

// Return date with future added month in DD/MM/YYYY format
export const getFutureMonthDate = (month: number): string =>
    format(addMonths(new Date(), month), 'dd/MM/yyyy')

// Return date in DD/MM/YYYY format
export const getFormattedDate = (date: string): string =>
    format(new Date(date), 'dd/MM/yyyy')
