import React, { createContext, useContext } from 'react'
import { useMachine } from '@xstate/react'

import { parentMachine } from '.'
import { apolloClient } from 'src/services/apollo'

const ParentContext = createContext(null as any)

export const MachineProvider: React.FC = ({ children }) => {
  const machine = useMachine(parentMachine, {
    context: {
      apolloClient,
    },
  })
  return (
    <ParentContext.Provider value={machine}>{children}</ParentContext.Provider>
  )
}

export const useParentMachine = () => {
  return useContext(ParentContext)
}
