import React from 'react'
import {browserHistory} from 'react-router'


// Milkcocoaからのイベントを待ち受け、それに応じて/subtitle, /conan, /camera等にリダイレクトさせるコンポーネント
class Home extends React.Component {
  static onMilkCocoa(res) {
    switch (res.value.trigger) {
      case 'cap':
        browserHistory.push('/subtitle')
        return
      case 'photo':
        browserHistory.push('/camera')
        return
      default:
        console.error('weird event', res)
    }
  }

  render() {
    return <span>アプリが起動されるのを待っています...</span>
  }
}


export default Home
