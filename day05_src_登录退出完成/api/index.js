//该文件用于管理项目的ajax请求,每个请求对应一个请求函数
import ajax from './ajax'

//请求登录的函数,参数loginObj的格式如：{username:'xx',password:'xx'}
//注意:reqLogin返回的是一个Promise实例对象,所以在Logo.jsx中,需要使用async..await去接
export const reqLogin = (loginObj)=> ajax.post('/login', loginObj)