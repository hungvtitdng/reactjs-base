import React, { useState } from 'react'
import { Table as TableAnt } from 'antd'
import { setIndexTableRow } from '../../utils/helpers'

const Table = ({ data, idWidth, onPageChange, hasPage = true, scrollY, ...props }) => {
  const [page, setPage] = useState(1)

  const columns = [
    {
      title: '#',
      width: idWidth ?? 50,
      className: 'text-center',
      fixed: 'left',
      render: (value, row, index) => (data?.paginations ? setIndexTableRow(index, page) : (index + 1)),
    },
    ...props.columns,
  ]

  return (
    <TableAnt
      {...props}
      scroll={{ x: 'max-content' }}
      rowKey={props.rowKey ?? 'id'}
      columns={columns}
      className={`min-w-full overflow-x-auto ${props.className}`}
      dataSource={props.dataSource ?? data?.items}
      pagination={
        (hasPage && data?.pagination) ? {
          pageSize: data?.pagination?.per_page,
          total: data?.pagination?.total,
          current: data?.pagination?.current_page,
          showSizeChanger: false,
          position: ['bottomLeft'],
          onChange: (p) => {
            setPage(p)
            onPageChange(p)
          },
        } : false
      }
    />
  )
}

export default Table
