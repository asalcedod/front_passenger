import React from 'react'
import { Route } from 'react-router'
import Login from './components/Login'
import Driver from './components/Driver'
import User from './components/User'
import './custom.css'


const App = () => {
  return (
    <div>
      <Route exact path="/" component={Login} />
      <Route path="/Driver" component={Driver} />
      <Route path="/User" component={User} />
    </div>
  )
}

export default App