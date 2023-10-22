import { Table as AntdTable, Skeleton, SpinProps, TableProps } from 'antd'
import { getUniqueArray } from 'component/utils/common.utils'
import { SMALL_TABLE_LOADER_SIZE } from 'constants/common'
import { useMemo } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
const Table = <T extends object = any>({ loading, ...rest }: TableProps<T>) => {
    const isLoading = useMemo(
        () => (loading as SpinProps)?.spinning ?? (loading as boolean) ?? false,
        [loading]
    )

    const dataSource = useMemo(
        () => getUniqueArray(SMALL_TABLE_LOADER_SIZE) as T[],
        []
    )

    if (isLoading) {
        const { columns } = { ...rest }
        const column = columns?.map((column) => {
            return {
                ...column,
                render: () => (
                    <Skeleton
                        title
                        active={isLoading}
                        key={column.key}
                        paragraph={false}
                    />
                ),
            }
        })

        return <AntdTable {...rest} columns={column} dataSource={dataSource} />
    }

    return <AntdTable {...rest} />
}

export default Table
