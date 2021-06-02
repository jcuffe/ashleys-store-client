import style from './index.module.scss'

import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={style.container}>
      <Header />
      <div className={style.body}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
