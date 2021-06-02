import React from 'react'
import { Link } from 'react-router-dom'

interface Props {}

const Checkout: React.FC<Props> = () => {
  return (
    <div className="About__Container">
      <Link to="/">Home</Link>
    </div>
  )
}

export default Checkout
