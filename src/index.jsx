import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import Home from './components/Home'
/* import Subtitle from './components/Subtitle'*/
/* import Conan from './components/Conan'
 * import Camera from './components/Camera'*/


const routing = [
  {
    path: '/',
    component: Home
  }
]

render(
  <Router history={browserHistory} routes={routing}/>,
  document.getElementsByTagName('main')[0]
)
