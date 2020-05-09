import React, { Component } from 'react'
import {Button} from 'antd'

export default class Detail extends Component {
  render() {
    return (
      <div>
        Detail组件,商品详情组件
        <Button onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}
