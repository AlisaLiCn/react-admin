import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  }
}

const items = [
  getItem('文章管理', 'article', <MailOutlined />, [getItem('行业资讯', 'list'), getItem('每日新闻', '2')]),
  getItem('成员管理', 'sub2', <AppstoreOutlined />, [getItem('成员列表', '5'), getItem('操作日志', '6')]),
]

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4']

function Navigation() {
  const [openKeys, setOpenKeys] = useState(['sub1'])

  const navigate = useNavigate()

  const navigateTo = (path) => {
    navigate(path)
  }

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys)
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  const onSelect = (data) => {
    console.log('select data', data)
    navigateTo(`/${data.keyPath.reverse().join('/')}`)
  }

  useEffect(() => {}, [])

  return (
    <Menu
      theme={'dark'}
      mode="inline"
      items={items}
      openKeys={openKeys}
      style={{ width: 256 }}
      onOpenChange={onOpenChange}
      onSelect={onSelect}
    />
  )
}

export default Navigation
