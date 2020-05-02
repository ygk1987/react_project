import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
//顶级组件,将容器组件获取的redux状态数据/操作状态的方法,通过props传递给所有UI组件
import {Provider} from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>, 
document.getElementById('root'))
