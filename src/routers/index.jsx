// import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/layout'
import Login from '../pages/login'
import List from '../pages/list'

const router = createBrowserRouter([
  {
    path: '/',
    exact: true,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/article',
    Component: Layout,
    children: [
      {
        path: 'list',
        Component: List,
      },
    ],
  },
  {
    path: '*',
    name: 'No Match',
    key: '*',
    element: 'Not Found',
  },
])

export default router
