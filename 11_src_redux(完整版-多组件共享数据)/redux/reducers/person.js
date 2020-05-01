//该函数是为person组件服务的reducer，是真正操作状态的“人”
//action是动作对象，形如：{type:'??',data:'???'}
import {ADD_PERSON} from '../action_types'

let initState = [ //定义初始化状态
  {id:'001', name:'瑶瑶,萌娃', age:3},
  {id:'002', name:'果果,呆萌', age:1}
]

export default function (preState=initState, action) {
  const {type, data} = action
  let newState
  switch (type) {
    case ADD_PERSON:
      //如果动作类型为加
      newState = [data, ...preState]
      //注意:不要用下面的方法,因为这样写reducer就不是纯函数了
      /* preState.unshift(data)
      newState =[...preState]
      console.log(newState); */
      return newState
    default:
      //如果动作类型不是加也不是减，那么就是初始化的时。
			return preState
  }
}