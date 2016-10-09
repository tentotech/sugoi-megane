import React from 'react'
import {findDOMNode} from 'react-dom'


const calcPhotoSize = () => {
  const [camHRes, camVRes] = [1280, 720]
  const hRatio = window.innerWidth / camHRes
  const vRatio = window.innerHeight / camVRes
  if (hRatio < vRatio) {
    return [window.innerWidth, camVRes * hRatio]
  } else {
    return [camHRes * vRatio, window.innerHeight]
  }
}


class Camera extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      hasTaken: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.event === nextProps.event) {
      return
    }

    switch (nextProps.event.value.trigger) {
      case 'take':
        const page = findDOMNode(this)
        const canvas = page.getElementsByTagName('canvas')[0]
        const context = canvas.getContext('2d')
        const video = page.getElementsByTagName('video')[0]
        this.setState({
          hasTaken: true
        }, () => {
          const [width, height] = calcPhotoSize()
          context.drawImage(video, (window.innerWidth - width) / 2, (window.innerHeight - height) / 2, width, height)
        })
        return
    }
  }

  render() {
    return (
      <section id='camera'>
        <canvas style={{display: this.state.hasTaken ? 'block' : 'none'}}/>
        <video style={{display: this.state.hasTaken ? 'none' : 'block'}} ref={this.enableCamera.bind(this)} autoPlay/>
      </section>
    )
  }

  enableCamera(video) {
    navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(stream => {
      const frame = findDOMNode(video)
      if (frame) {
        frame.src = URL.createObjectURL(stream)
      }
    })
  }
}

export default Camera
