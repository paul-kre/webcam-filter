import React, { Component } from "react"
import { connect } from "react-redux"
import Canvas from "./Canvas"
import { mainActions } from "../_actions"

class ColorMap extends Component {
  constructor(props) {
    super(props)

    this.setCanvasRef = el => {
      this.canvas = el
      this.ctx = el.getContext("2d")
    }

    this.state = { size: 64 }
  }

  componentDidMount() {
    this.props.dispatch(
      mainActions.registerMap("gradient", "Color Gradient", this.canvas)
    )
    this.draw()
  }

  render() {
    return <Canvas size={this.state.size} innerRef={this.setCanvasRef} />
  }

  componentDidUpdate() {
    this.draw()
  }

  draw() {
    const { ctx } = this
    const { size } = this.state
    const gradient = ctx.createLinearGradient(0, 0, size, size)
    gradient.addColorStop(0, "#ff00ff")
    gradient.addColorStop(1, "#00ffff")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
  }
}

export default connect()(ColorMap)
