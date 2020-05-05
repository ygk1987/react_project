import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Switch, Route, Redirect} from 'react-router-dom'
import Check from '@/containers/Hoc/Check'
import { Layout } from 'antd';
import Header from './Header/Header'
import LeftNav from './LeftNav/LeftNav'
import Home from './Home/Home'
import User from './User/User'
import Role from './Role/Role'
import Product from './Product/Product'
import Category from './Category/Category'
import Bar from './Bar/Bar'
import Line from './Line/Line'
import Pie from './Pie/Pie'
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
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout className="admin-container">
          <Header/>
          <Content>
            <Switch>
              <Route path="/admin/home" component={Home}/>
              <Route path="/admin/prod_about/category" component={Category}/>
              <Route path="/admin/prod_about/product" component={Product}/>
              <Route path="/admin/user" component={User}/>
              <Route path="/admin/role" component={Role}/>
              <Route path="/admin/charts/bar" component={Bar}/>
              <Route path="/admin/charts/line" component={Line}/>
              <Route path="/admin/charts/pie" component={Pie}/>
              <Redirect to="/admin/home"/>
            </Switch>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Admin

