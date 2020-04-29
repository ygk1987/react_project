import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'

import App from './App'

//这句话不能不写,如果没有写在状态发生变化情况下就无法渲染
ReactDOM.render(<App/>, document.getElementById('root'))

//如果redux中保存的状态发生变化,那么就调用store.subscribe所指定的回调。
store.subscribe(()=>{
  ReactDOM.render(<App/>, document.getElementById('root'))
})