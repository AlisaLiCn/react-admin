import { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CloseOutlined } from '@ant-design/icons'
import style from './batch.module.css'

function TheBatch({ visible, length, options = [], onClose }) {
  const availableOptions = options.filter((i) => !i.disabled)
  const [show, setShow] = useState(false)

  const onClick = (option) => {
    console.log('option', option)
  }

  useEffect(() => {
    setShow(visible)
  }, [visible])

  return (
    <>
      <CSSTransition
        in={show}
        timeout={100}
        classNames={{
          enter: style.fadeEnter,
          enterActive: style.fadeEnterActive,
          enterDone: style.fadeEnterDone,
          exit: style.fadeExit,
          exitActive: style.fadeExitActive,
          exitDone: style.fadeExitDone,
        }}
      >
        <>
          {visible && length && availableOptions.length ? (
            <div className={style.wrap}>
              <div className={style.content}>
                <div>
                  已选中<span className={style.count}> {length} </span>项
                </div>
                {availableOptions.map((item) => {
                  return (
                    <div className={style.button} key={item.type} onClick={() => onClick(item)}>
                      {item.label}
                    </div>
                  )
                })}
              </div>
              <CloseOutlined className={style.button} onClick={onClose} />
            </div>
          ) : (
            <div></div>
          )}
        </>
      </CSSTransition>
    </>
  )
}

export default TheBatch
