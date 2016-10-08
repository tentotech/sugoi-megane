import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
/* import Home from './components/Home'*/
/* import Subtitle from './components/Subtitle'*/
/* import Conan from './components/Conan'
 * import Camera from './components/Camera'*/


class App extends React.Component {
    render() {
      return (
        <Router history={browserHistory}>
          <Route path="/" component={Home}/>
          <Route path="subtitle" component={Subtitle}/>
          <Route path="conan" component={Conan}/>
          <Route path="camera" component={Camera}/>
        </Router>
      )
    }
}

addEventListener('load', () => {
  render(<App/>, document.getElementsByTagName('body')[0])
})
