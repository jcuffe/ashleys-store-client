import style from './index.module.scss'

import React from 'react'

const FixedActions: React.FC = ({ children }) => {
  return <div className={style.container}>{children}</div>
}

export default FixedActions
