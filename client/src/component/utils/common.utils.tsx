import classNames from 'classnames'
import { isUndefined } from 'lodash'
import { Trans } from 'react-i18next'

export const refreshPage = () => history.go(0)

export const getRandomColor = (name: string) => {
    const firstAlphabet = name.charAt(0).toLowerCase()
    const asciiCode = firstAlphabet.charCodeAt(0)
    const colorNum =
        asciiCode.toString() + asciiCode.toString() + asciiCode.toString()

    const num = Math.round(0xffffff * parseInt(colorNum))
    const r = (num >> 16) & 255
    const g = (num >> 8) & 255
    const b = num & 255

    return {
        color: 'rgb(' + r + ', ' + g + ', ' + b + ', 0.6)',
        character: firstAlphabet.toUpperCase(),
    }
}

export const getUniqueArray = (count: number) =>
    [...Array(count)].map((_, index) => ({
        key: `key${index}`,
    }))

export const Transi18next = ({
    i18nKey,
    values,
    renderElement,
    ...otherProps
}: {
    i18nKey: string
    values?: object
    renderElement: React.ReactNode
}): JSX.Element => (
    <Trans i18nKey={i18nKey} values={values} {...otherProps}>
        {renderElement}
    </Trans>
)

export const getCountBadge = (
    count = 0,
    className = '',
    isActive?: boolean
) => {
    const clsBG = isUndefined(isActive)
        ? ''
        : isActive
        ? 'bg-primary text-white no-border'
        : 'ant-tag'

    return (
        <span
            className={classNames(
                'p-x-xss m-x-xss global-border rounded-4 text-center',
                clsBG,
                className
            )}>
            <span
                className="text-xs"
                data-testid="filter-count"
                title={count.toString()}>
                {count}
            </span>
        </span>
    )
}
