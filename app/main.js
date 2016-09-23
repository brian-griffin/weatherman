import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import '../sass/app.scss'

import Weatherman from './containers/Weatherman'

/**
 * Main view routing
 */
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Weatherman} />
  </Router>
), document.getElementById('main'))
