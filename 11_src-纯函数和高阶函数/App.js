import React, { Component } from 'react'
//使用react-redux时,向UI组件传递数据的时候,需要通过容器组件
import Count from './containers/Count'
import Person from './containers/Person'

export default class App extends Component {
  render() {
    return (
      <div>
        <Count/>
        <hr/>
        <Person/>
      </div>
    )
  }
}
