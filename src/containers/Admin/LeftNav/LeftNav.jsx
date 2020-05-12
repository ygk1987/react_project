import React, { Component } from 'react'
import { Menu } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {saveTitle} from '@/redux/actions/title'
import logo from '@/assets/images/logo.png'
import menus from '@/config/menu_config'

import './css/left_nav.less'

const { SubMenu,Item } = Menu;
@connect(
  (state)=>({//映射状态
    userMenus:state.userInfo.user.role.menus,
    username:state.userInfo.user.username
  }), 
  {saveTitle} //映射操作状态的方法
)
@withRouter
class LeftNav extends Component {
  saveTitle = (title)=>{
    // console.log(title);
    this.props.saveTitle(title)
  }

  //专门用于判断当前菜单是否有权限展示。
	//注意：一个菜单没有权限，但是他下的子菜单可能是有权限的。
  hasAuth = (menuObj)=>{ //menuObj是菜单配置文件中的每一个菜单项
    const {userMenus, username} = this.props; //用户应该看到的菜单key组成数组
    if(username === 'admin') return true
    if(!menuObj.children){
      return userMenus.find((item)=> item === menuObj.key)
    }else{
      return menuObj.children.some((childItem)=>userMenus.indexOf(childItem.key) !== -1)
    }
  }

  //自动生成导航菜单
  createMenu = (menuArr)=>{
    return menuArr.map((menuObj)=>{
      //判断菜单是否有权限
      if(this.hasAuth(menuObj)){
        if(!menuObj.children){
          return(
            <Item key={menuObj.key} onClick={()=>{this.saveTitle(menuObj.title)}}>
              <Link to={menuObj.path} style={{color:'white'}}>
                <menuObj.icon />
                {menuObj.title}
              </Link>
            </Item>
          )
        }else{
          return(
            <SubMenu 
              style={{color:'white'}}
              key={menuObj.key} 
              icon={<menuObj.icon />} 
              title={menuObj.title}
            >
              {/* 递归调用完成子菜单遍历 */}
              {this.createMenu(menuObj.children)}
            </SubMenu>
          )
        }
      }
    })
  }

  //计算title的方法
  calculateTitle = ()=>{
    //1.从路径中获取菜单的key
    const {pathname} = this.props.location //路径字符串
    let currentKey = pathname.split('/').slice(-1)[0] //当前的key
    //解决第一次登录title计算不出来
    if(currentKey === 'admin') currentKey = 'home'
    if(pathname.indexOf('product') !== -1) currentKey = 'product'
    //2.拿着key去menu-config中查找其所对应的菜单名字
    let title =''
    menus.forEach((menuObj)=>{
      if(menuObj.children instanceof Array){
        //如果有子菜单，就去子菜单中查找
        let result = menuObj.children.find((childObj)=>{
          return childObj.key === currentKey
        })
        if(result) title = result.title
      }else{
        //如果没有子菜单就在自身查找
        if(menuObj.key === currentKey) title = menuObj.title
      }
    })
    //直接保存到redux中
    this.props.saveTitle(title)
  }

  componentDidMount(){
    //根据路劲计算出菜单标题
    this.calculateTitle()
  }

  render() {
    //获取路径，无论是展开还是选中，都是从路径中获取的。
    const {pathname} = this.props.location
    const openedKey = pathname.split('/') //要展开的菜单
    let checkedKey = openedKey.slice(-1) //要选中的菜单
    if(openedKey.indexOf('product') !== -1) checkedKey = ['product']
    return (
      <div className="left-nav">
        <div className="nav-top">
          <img src={logo} alt=""/>
          <span>商品管理系统</span>
        </div>
          {/* antd的Menu组件 */}
          <Menu
            selectedKeys={checkedKey} //默认选中哪个菜单
            defaultOpenKeys={openedKey} //默认展开哪个菜单
            mode="inline" //菜单的模式
            theme="dark" //主题颜色
          >
          {this.createMenu(menus)}
        </Menu>
      </div>
    )
  }
}
export default LeftNav
