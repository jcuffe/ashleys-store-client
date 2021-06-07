import style from './index.module.scss'

import React from 'react'
import classnames from 'classnames'
import { useField } from 'formik'

interface Props {
  name: string
  label: string
  className?: string
  textarea?: boolean
}

const FloatLabelField: React.FC<Props> = ({
  label,
  textarea,
  className,
  ...props
}) => {
  const [field, meta] = useField(props)

  const component = textarea ? 'textarea' : 'input'

  const hasValue = !!field.value
  const hasError = meta.touched && meta.error

  if (hasError && hasValue) {
    console.log(field.name, field.value)
  }
  return (
    <label
      className={classnames(style.container, className, {
        [style.floating]: hasValue,
        [style.error]: hasError,
      })}
      htmlFor={field.name}
    >
      {React.createElement(component, field)}
      <span className={style.label}>
        {label}
        {hasError && <span className={style.aside}>{meta.error}</span>}
      </span>
    </label>
  )
}

export default FloatLabelField
