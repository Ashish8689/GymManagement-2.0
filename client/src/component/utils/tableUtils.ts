import { NO_DATA_PLACEHOLDER } from 'constants/common.constant'
import { isNull, isUndefined } from 'lodash'

export const CellRenderers = {
    VALUE_OR_NA: (value: string | undefined | null) =>
        isUndefined(value) || isNull(value) || value === ''
            ? NO_DATA_PLACEHOLDER
            : value,
}
