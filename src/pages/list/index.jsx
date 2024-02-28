import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import TheBatch from '../../components/common/theBatch'
import api from '../../services/api'
import style from './list.module.css'

function List() {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  const [data, setData] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState(0)
  const [batchVisible, setBatchVisible] = useState(false)

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '来源',
      dataIndex: 'news_site',
      key: 'news_site',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      const selectedLength = selectedRows.length
      setSelectedRowKeys(selectedRowKeys)
      setBatchVisible(!!selectedLength)
    },
    // getCheckboxProps: (record) => ({
    //   disabled: false,
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  }

  const onPageChange = (page, pageSize) => {
    setPage(page - 1)
    setPageSize(pageSize)
  }

  const pagination = {
    pageSize,
    total,
    onChange: onPageChange,
  }

  const getArtilceList = async () => {
    const params = {
      offset: page * pageSize,
      limit: pageSize,
    }
    const res = await api.getArtilceList(params)
    const list = res.results
    setData(list)
    setTotal(res.count)
    // setTotal(100)
  }

  const batchOptions = [
    {
      label: '删除',
      type: 'delete',
    },
  ]
  const onBatchClose = () => {
    setBatchVisible(false)
    setSelectedRowKeys([])
  }

  useEffect(() => {
    getArtilceList()
  }, [page, pageSize])

  return (
    <div className={style.wrap}>
      <TheBatch
        visible={batchVisible}
        length={selectedRowKeys.length}
        options={batchOptions}
        onClose={onBatchClose}
      ></TheBatch>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={'id'}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        pagination={pagination}
      ></Table>
    </div>
  )
}

export default List
