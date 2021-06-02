import React from 'react'
import { useField } from 'formik'

interface Props {
  name: string
}

const Error: React.FC<Props> = (props) => {
  const [, meta] = useField(props)

  if (!meta.touched || !meta.error) {
    return null
  }

  return <div className="Form__Error">{meta.error}</div>
}

export default Error
