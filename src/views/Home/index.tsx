import React from 'react'
import { Link } from 'react-router-dom'

interface Props {}

const Home: React.FC<Props> = () => {
  return (
    <div className="Home__Container">
      <Link to="/checkout">Checkout</Link>
    </div>
  )
}

export default Home
