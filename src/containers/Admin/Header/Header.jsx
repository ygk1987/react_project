import React, { Component } from 'react'
import {Button} from 'antd'
import {
	FullscreenExitOutlined,
} from '@ant-design/icons';
import demo from './demo.jpg'
import './css/Header.less'
export default class Heard extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small">
            <FullscreenExitOutlined />
          </Button>
          <span className="username">欢迎,佩奇</span>
          <Button type="link" size="small">退出登录</Button>
        </div>

        <div className="header-bottom">
          <div className="bottom-left">
            <span>首页</span>
          </div>
          <div className="bottom-right">
            <img src={demo} alt=""/>
            <span>2020年5月4日 00:00:00</span>
            <span>温度：0~15℃</span>
          </div>
        </div>
      </div>
    )
  }
}
