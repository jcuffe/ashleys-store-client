import React from 'react'
import { useCheckoutService } from 'src/machines/checkout'

const StepSelector: React.FC = () => {
  const [, send] = useCheckoutService()

  return (
    <div className="StepSelector">
      <button onClick={() => send('previous')}>Prev</button>
      <button onClick={() => send('next')}>Next</button>
    </div>
  )
}

export default StepSelector
