import React, { Component } from 'react'
//引入容器组件,通过容器组件做为react-redux库和UI组件纽带,最终完成界面渲染
import Count from './containers/Count'

export default class App extends Component {
  render() {
    return (
      <Count/>
    )
  }
}
