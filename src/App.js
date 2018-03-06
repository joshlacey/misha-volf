import React from 'react'
import { Router } from 'react-static'
import { Link as ReactRouterLink } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Nav from './containers/Nav'
import Footer from './containers/Footer'
//
import Routes from 'react-static-routes'

import './app.css'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      menuClosed: null,
    }
  }

  handleClickOutsideNav = e => {
    const isNavigation = !!e.target.dataset.nav
    this.setState({ menuClosed: !isNavigation })
  }

  render () {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <div onClick={this.handleClickOutsideNav} className="wrapper">
            <Nav menuClosed={this.state.menuClosed} />
            <div className="content">
              <Routes />
            </div>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default hot(module)(App)
