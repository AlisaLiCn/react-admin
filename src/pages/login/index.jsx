import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message, Space } from 'antd'
import style from './login.module.css'
import api from '../../services/api'

function Login() {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const [hasSendCode, setHasSendCode] = useState(false)
  const [countDown, setCountDown] = useState(null)
  const navigate = useNavigate()

  const navigateTo = (path) => {
    navigate(path)
  }

  const warning = (msg) => {
    messageApi.open({
      type: 'warning',
      content: msg,
    })
  }

  // 发送验证码
  const sendCode = async () => {
    const phone = form.getFieldValue('phone')
    if (!phone) {
      warning('请输入手机号')
      return
    }
    if (phone.length <= 11 && !/^1[3456789]\d{9}$/.test(phone)) {
      warning('请输入正确的手机号')
      return
    }
    const params = { phone }
    const res = await api.getLoginCode(params)
    if (res.code === 0) {
      messageApi.open({
        type: 'success',
        content: '验证码发送成功',
      })
      setHasSendCode(true)
      setCountDown(60)
    }
  }

  useEffect(() => {
    if (countDown === null || countDown < 0) return
    let timer = setInterval(() => {
      setCountDown(countDown - 1)
      if (countDown === 0) {
        setHasSendCode(false)
        clearInterval(timer)
      }
    }, 1000)

    // 当组件卸载时, 清除定时器
    return () => clearInterval(timer)
  }, [countDown])

  const onFinish = async (values) => {
    console.log('login params', values)
    navigateTo('/')
    // const params = { phone: values.phone, code: values.code }
    // const res = await api.login(params)
    // if (res.code === 0) {
    //   navigateTo('/')
    // } else {
    //   messageApi.open({
    //     type: 'error',
    //     content: res.msg,
    //   })
    // }
  }

  return (
    <>
      {contextHolder}
      <div className={style.wrap}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            label=""
            name="phone"
            rules={[{ required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }]}
          >
            <Input placeholder="请输入手机号"></Input>
          </Form.Item>
          <Form.Item label="" name="code" rules={[{ required: true, message: '请输入验证码' }]}>
            <Space.Compact
              style={{
                width: '100%',
              }}
            >
              <Input placeholder="请输入验证码" />
              {hasSendCode ? (
                <Button>重新发送{countDown}</Button>
              ) : (
                <Button type="primary" onClick={sendCode}>
                  获取验证码
                </Button>
              )}
            </Space.Compact>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 14,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Login
