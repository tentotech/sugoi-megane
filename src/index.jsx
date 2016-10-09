import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import Home from './components/Home'
import Subtitle from './components/Subtitle'
import Camera from './components/Camera'
import './style'
import 'normalize.css'
/* import Conan from './components/Conan'*/


const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/subtitle',
    component: Subtitle
  },
  {
    path: '/camera',
    component: Camera
  }
]


class App extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      event: null
    }
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
          this.setState({event: res})
          return
      }
    })
  }

  render() {
    return <Router history={browserHistory} routes={routes} createElement={this.milkCocoaWrapper.bind(this)}/>
  }

  milkCocoaWrapper(Component, props) {
    return <Component {...props} {...this.state}/>
  }
}

render(
  <App/>,
  document.getElementsByTagName('main')[0]
)
