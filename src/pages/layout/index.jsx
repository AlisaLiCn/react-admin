import { Outlet } from 'react-router-dom'
import Navigation from './navigation'
import style from './layout.module.css'

function Layout() {
  return (
    <div className={style.wrap}>
      <div className={style.menu}>
        <Navigation></Navigation>
      </div>
      <div className={style.main}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
