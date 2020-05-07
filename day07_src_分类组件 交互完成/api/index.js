//该文件用于管理项目的ajax请求,每个请求对应一个请求函数
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
import {CITY, WEATHER_AK} from '@/config'

//请求登录的函数,参数loginObj的格式如：{username:'xx',password:'xx'}
//注意:reqLogin返回的是一个Promise实例对象,所以在Logo.jsx中,需要使用async..await去接
export const reqLogin = loginObj => ajax.post('/login', loginObj)

//请天气信息
export const reqWeatherData = ()=>{
  //定义请求天气信息的url
  const URl = `http://api.map.baidu.com/telematics/v3/weather?location=${CITY}&output=json&ak=${WEATHER_AK}`
  
  //使用Promise处理异步任务
  return new Promise((resolve, reject)=>{
    //使用jsonp库发送请求
    jsonp(URl,{
      timeout:2000
    },(err, data)=>{
      if(!err){
        resolve(data.results[0].weather_data[0]);
      }else{
        message.error('请求天气信息有误,请联系管理员!!!')
      }
    })
  })
}

//请求分类列表
export const reqCategoryList = () => ajax.get('/manage/category/list')