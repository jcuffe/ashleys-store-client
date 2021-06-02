import './index.scss'

import React from 'react'
import { useField } from 'formik'

interface Props {
  name: string
  label: string
}

const VerticalField: React.FC<Props> = (props) => {
  const [field, meta] = useField(props)

  return (
    <div className="Form__VerticalField">
      <div className="VerticalField__Details">
        <label htmlFor={props.name} className="VerticalField__Label">
          {props.label}
        </label>
        {meta.touched && meta.error && (
          <div className="VerticalField__Error">{meta.error}</div>
        )}
      </div>
      <input {...field} className="VerticalField__Input" />
    </div>
  )
}

export default VerticalField
