import React from 'react'
import ReactDOM from 'react-dom'

import store from './redux/store'
//react的react-redux插件库需要和redux独立库配合使用,才能完成集中式数据状态管理
import {Provider} from 'react-redux' //Provider是顶级组件对象

import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
document.getElementById('root'))