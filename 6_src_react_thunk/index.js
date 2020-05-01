import React from 'react'
import ReactDOM from 'react-dom'

import store from './redux/store'
//react的react-redux插件库需要和redux独立库配合使用,才能完成集中式数据状态管理
import {Provider} from 'react-redux' //Provider是顶级组件对象

import App from './App'

//这句话不能不写,如果没有写在未状态发生变化情况下就无法渲染
/* ReactDOM.render(<App/>, document.getElementById('root'))
//如果redux中保存的状态发生变化,那么就调用store.subscribe所指定的回调。
store.subscribe(()=>{
  ReactDOM.render(<App/>, document.getElementById('root'))
}) */

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
document.getElementById('root'))