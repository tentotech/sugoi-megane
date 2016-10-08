import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import Home from './components/Home'
/* import Subtitle from './components/Subtitle'*/
/* import Conan from './components/Conan'
 * import Camera from './components/Camera'*/


class App extends React.Component {
  constructor() {
    super()
    this.currentRoute = Home
    this.routes = [
      {
        path: '/',
        component: Home,
        onEnter: () => this.currentRoute = Home
      }
    ]
  }

  componentDidMount() {
    const milkcocoa = new MilkCocoa('woodiu1f1mcm.mlkcca.com')
    const ds = milkcocoa.dataStore('test-ds')
    ds.on('send', res => {
      switch(res.value.trigger) {
        case 'home':
          browserHistory.push('/')
          return
        default:
          this.currentRoute.onMilkCocoa(res)
          return
      }
    })
  }

  render() {
    return <Router history={browserHistory} routes={this.routes}/>
  }
}

render(
  <App/>,
  document.getElementsByTagName('main')[0]
)
