import { isEmpty, isNumber } from 'lodash'

export const CellRenderers = {
    VALUE_OR_NA: (value: string | undefined | null) =>
        (isEmpty(value) && !isNumber(value)) || value === '' ? 'N/A' : value,
}
