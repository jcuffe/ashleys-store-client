import style from './index.module.scss'

import React from 'react'
import { useField } from 'formik'

interface Props {
  name: string
  label: string
}

const VerticalField: React.FC<Props> = (props) => {
  const [field, meta] = useField(props)

  return (
    <div className={style.container}>
      <div className={style.details}>
        <label htmlFor={props.name} className={style.label}>
          {props.label}
        </label>
        {meta.touched && meta.error && (
          <div className={style.error}>{meta.error}</div>
        )}
      </div>
      <input {...field} className={style.input} />
    </div>
  )
}

export default VerticalField
