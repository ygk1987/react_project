/* 
	该文件是对axios这个库的二次封装，完成：
		1.配置请求的基础路径
		2.配置超时时间
		3.统一处理post请求json编码问题（转为urlencoded）
		4.统一返回真正的数据data，而不是response对象
		5.统一处理响应请求错误
*/
import axios from 'axios'
import {message as msg} from 'antd'
import qs from 'querystring' //将对象转换为urlencoded格式

//配置请求的基础路径,React脚手架中可以为空,请求时自动看服务器当前所在的url地址
axios.defaults.baseURL = '/api'
//配置超时时间
axios.defaults.timeout = 2000

//请求拦截器
axios.interceptors.request.use((config)=>{
  const {method, data} = config
  //统一处理post请求json编码问题(转换为urlencoded)
  if(method.toLowerCase() === 'post' && data instanceof Object){
    config.data = qs.stringify(data)
  }
  return config
})

//响应拦截器
axios.interceptors.response.use(
  //成功的回调:返回的http状态码是2开头的
  response => {
    return response.data
  },
  //失败的回调:1.返回的http状态码不是2开头,2.达到了超时时间,3.网络不通
  err => {
    //注意,要给默认值,统一响应已知错误类型外的错误提示
    let errmsg = '未知错误,请联系管理员'
    const {message} = err
    if(message.indexOf('401') !== -1) errmsg = '未登录或身份过期，请重新登录！'
    else if(message.indexOf('Network Error') !== -1) errmsg = '网络不通，请检查网络连接！'
    else if(message.indexOf('timeout')) errmsg = '网络不稳定，连接超时！';
    msg.error(errmsg, 1) //参数:errmsg错误哦信息,1表示1后提示框消失
    return new Promise(()=>{}) //中断Promise链
  }
)

export default axios