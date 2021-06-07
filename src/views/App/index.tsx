import 'src/views/App/index.scss'

import React from 'react'
import Layout from 'src/components/Layout'
import { MachineProvider } from 'src/machines/parent'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import routes from 'src/views/App/routes'

const App: React.FC = () => {
  return (
    <MachineProvider>
      <Router>
        <Layout>
          <Switch>
            {Object.values(routes).map((props) => (
              <Route {...props} />
            ))}
          </Switch>
        </Layout>
      </Router>
    </MachineProvider>
  )
}

export default App
