import React, { Component } from 'react'
import {connect} from 'react-redux'
// import {Redirect} from 'react-router-dom'
import Check from '@/containers/Hoc/Check'
import { Layout } from 'antd';
import Header from './Header/Header'
import './css/admin.less'

const {Footer, Sider, Content } = Layout;

@connect(
  state =>({//映射状态
    isLogin: state.userInfo.isLogin
  }), 
  {} //映射操作状态的方法
)
@Check
class Admin extends Component {
  logout = ()=>{
    //通知redux和local均删除之前保存的用户数据
    this.props.deleteUserInfo()
  }
  render() {
    //如果没有登录,直接跳转到登录login组件
    // if(!this.props.isLogin) return <Redirect to="/login"/>
    return (
      <Layout className="admin-container">
        <Sider>Sider</Sider>
        <Layout className="admin-container">
          <Header/>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin

