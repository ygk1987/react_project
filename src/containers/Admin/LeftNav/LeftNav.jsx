import React, { Component } from 'react'
import logo from '@/assets/images/logo.png'
import './css/left_nav.less'

export default class LeftNav extends Component {
  render() {
    return (
      <div className="left-nav">
        <div className="nav-top">
          <img src={logo} alt=""/>
          <span>商品管理系统</span>
        </div>
        <div className="nav-bottom"></div>
      </div>
    )
  }
}
