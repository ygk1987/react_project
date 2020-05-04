import React, { Component } from 'react'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import {reqLogin} from '@/api'
import logo from './images/logo.png'
import './css/login.less'

const {Item} = Form

/*
  axios的请求拦截器:
    1.判断程序员的请求,如果是post请求且参数形式为json,那么转换为urlencoded格式
    2.统一返回真正的数据data,而不是axios包装的那个response对象
  */
 
export default class Login extends Component {
  //表单提交并且验证通过的回调
  onFinish = async values => {
		//此处只处理成功响应的请求数据,失败的已经在拦截器里处理了
	 	let result = await reqLogin(values)
		// console.log(result.data);
		const {status, data, msg} = result;
		if(status === 0){
			message.success('登录成功!', 1)
			console.log(data);
		}else{
			message.error(msg)
		}
  };

  //自定义密码验证器
  pwdValidator = (_, value="")=>{ //不输入Antd底层默认处理的是undefined,为了符合此处逻辑需要给value设置默认值为""
    //定一个空数组,用于存储错误信息,批量返回错误提示
    let errMsgArr = [] 
    //如果为空,后面的就不再判断
    if(!value.trim()) return Promise.reject('密码必须输入！')
    if(value.length < 4) errMsgArr.push('密码必须大于等于4位')
    if(value.length > 12) errMsgArr.push('密码必须小于等于12位')
    if(!(/^\w+$/).test(value)) errMsgArr.push('密码必须是英文、数字、下划线组成！')
    //如果数组的长度不是0,证明有错误
    if(errMsgArr.length !== 0) return Promise.reject(errMsgArr)
    else return Promise.resolve()
  }

  render() {
    return (
      <div className="login">
        <header>
					<img src={logo} alt="logo"/>
					<h1>商品管理系统</h1>
				</header>
        <section>
          <span className="title">用户登录</span>
          {/*
						用户名/密码的的合法性要求
							1). 必须输入
							2). 必须大于等于4位
							3). 必须小于等于12位
							4). 必须是英文、数字、下划线组成
						*/
						}
          <Form
						className="login-form"
						onFinish={this.onFinish} //表单提交的回调
					>
						<Item
							name="username"
							rules={[
								{required:true,message:'用户名必须输入！'}, //必填项
								{min:4,message:'用户名必须大于等于4位！'},
								{max:12,message:'用户名必须小于等于12位！'},
								{pattern:/^\w+$/,message:'用户名必须是英文、数字、下划线组成！'},
							]}
						>
							<Input 
								prefix={<UserOutlined className="site-form-item-icon" />} 
								placeholder="用户名"
							/>
						</Item>
						
            <Item
							name="password"
							rules={[{validator:this.pwdValidator}]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="密码"
							/>
						</Item>
						
            <Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								登录
							</Button>
						</Item>
					</Form>
        </section>
      </div>
    )
  }
}
