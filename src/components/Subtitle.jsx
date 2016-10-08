import React from 'react'


class Subtitle extends React.Component {
  static onMilkCocoa(res) {
    // there is no event specific to this app
    return
  }

  constructor() {
    super()
    this.state = {
      subtitle: ''
    }
  }

  componentDidMount() {
    this.speech = new webkitSpeechRecognition()
    this.speech.lang = 'en'
    this.speech.interimResults = true
    this.speech.continuous = true
    this.speech.onspeechend = () => {
      console.log('onspeechend')
    }
    this.speech.onsoundend = () => {
      console.log('onsoundend')
    }
    this.speech.onaudioend = () => {
      console.log('onaudioend')
    }
    this.speech.onerror = () => {
      console.log('onerror')
    }
    this.speech.onend = () => {
      console.log('onend')
      setTimeout(() => this.speech.start(), 100)
    }
    this.speech.onresult = event => {
      console.log(event)
      this.setState({
        subtitle: Array.from(event.results).map(result => result[0].transcript).join('')
      })
    }
    this.speech.start()
  }

  componentWillUnmount() {
    this.speech.onend = null
    this.speech.abort()
  }

  render() {
    return <span>{this.state.subtitle}</span>
  }
}

export default Subtitle
