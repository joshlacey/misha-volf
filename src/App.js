import React from 'react'
import { Router } from 'react-static'
import { Link as ReactRouterLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Nav from './containers/Nav'
import Footer from './containers/Footer'
//
import Routes from 'react-static-routes'

import './app.css'

const App = () => (
  <Router>
      <div style={{height: '100%'}}>
        <div className="wrapper">
          <Nav />
          <div className="content">
            <Routes />
          </div>
        </div>
        <Footer />
      </div>
  </Router>
)

export default hot(module)(App)
