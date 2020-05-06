import React, { Component } from 'react'
import {Button, Modal} from 'antd'
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import screenfull  from 'screenfull'
import {connect} from 'react-redux'
import dayjs from 'dayjs'
import {deleteUserInfo} from '@/redux/actions/login'
import {saveTitle} from '@/redux/actions/title'
import {reqWeatherData} from '@/api'

import './css/Header.less'
// import { wait } from '@testing-library/react';
const { confirm } = Modal;

@connect(
  state => ({//映射状态
    username: state.userInfo.user.username,
    title: state.title
  }), 
  {deleteUserInfo,saveTitle} //映射操作状态的方法
)
class Header extends Component {
  state = {
    isFull: false, //标识是否全屏
    time: dayjs().format('YYYY年MM月DD日 HH:mm:ss'), //时间
    weatherData:{} //天气信息对象
  }

  //退出登录
  logout = ()=>{
    confirm({
      title: '确定退出登录吗?', //弹窗的提示文字
      icon: <ExclamationCircleOutlined />,//弹窗中的图标
      content: '退出后需要重新登录', //副标题
      cancelText:'取消',
			okText:'确认',
      onOk:() => {//确定按钮的回调,坑:注意这里的this指向
        this.props.deleteUserInfo()
        this.props.saveTitle('')
      },
    });
  }

  //全屏/非全屏切换
  fullScreen = ()=>{
    screenfull.toggle(); //切换全屏
  }

  getWeather = async ()=>{
    let result = await reqWeatherData()
    const {dayPictureUrl,weather,temperature} = result
    this.setState({weatherData:{dayPictureUrl,weather,temperature}})
  }

  componentDidMount(){
    //检测屏幕的变化
    screenfull.onchange(()=>{
      const {isFull} = this.state
      this.setState({isFull:!isFull})
    })
    //开启一个定时器计算时间
    this.timer = setInterval(() => {
      this.setState({time:dayjs().format('YYYY年MM月DD日 HH:mm:ss')})
    }, 1000); 
    //请求天气信息
    // this.getWeather() //避免在生命钩子函数前使用async
    // reqWeatherData()
  }

  componentWillUnmount(){
		clearInterval(this.timer)
	}

  render() {
    const {username} = this.props
    const {isFull,time,weatherData} = this.state
    return (
      <div className="header">
        <div className="header-top">
          <Button size="small" onClick={this.fullScreen}>
            {isFull?<FullscreenExitOutlined />:<FullscreenOutlined />}
          </Button>
    <span className="username">欢迎,{username}</span>
          <Button type="link" size="small" onClick={this.logout}>退出登录</Button>
        </div>

        <div className="header-bottom">
          <div className="bottom-left">
            <span>{this.props.title}</span>
          </div>
          <div className="bottom-right">
            {/* <img src={weatherData.dayPictureUrl} alt="天气logo"/> */}
            <img src="http://api.map.baidu.com/images/weather/day/qing.png" alt="天气logo"/>
            <span>{time}</span>&nbsp;
            <span>{weatherData.weather}</span>&nbsp;
            {/* <span>温度：{weatherData.temperature}</span> */}
            <span>温度：1~10℃</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header
