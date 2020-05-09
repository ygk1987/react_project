import React, { Component } from 'react'
import {Button} from 'antd'

export default class AddUpdate extends Component {
  render() {
    return (
      <div>
        AddUpdate组件,可能用于:{this.props.match.params.id?'修改商品':'添加商品'}
        <Button onClick={()=>{this.props.history.goBack()}}>返回</Button>
      </div>
    )
  }
}
