//该函数是为count组件服务的reducer(纯函数),是真正操作状态的“人”
//action是动作对象，形如：{type:'??',data:'???'}
import {INCREMENT, DECREMENT} from '../action_types'

let initState = 0 //定义初始化状态
export default function (preState = initState, action) {
  const {type,data} = action
  let newState
  switch (type) {
    case INCREMENT:
      //如果action动作类型是加
      console.log('加',preState,action);
      newState = preState + data
      return newState
    case DECREMENT:
      //如果action动作类型是减
      console.log('减',preState,action);
      newState = preState - data
      return newState
    default:
      //如果动作类型不是加也不是减，那么就是初始化的时。
      console.log('初始化',preState,action);
      return preState
  }
}