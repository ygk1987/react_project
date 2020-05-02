//该函数是为person组件服务的reducer，是真正操作状态的“人”
//action是动作对象，形如：{type:'??',data:'???'}
import {ADD_PERSON} from '../action_types'

//初始化状态数据
let initState = [//定义初始状态
  {id:'001', name:'wagool',age:34},
  {id:'002', name:'monther',age:70}
]

export default function (preState=initState,action) {
  const {type, data} = action
  let newState
  switch (type) {
    case ADD_PERSON:
      //如果动作类型为加
      newState = [data, ...preState]
      return newState
    default:
      //如果动作类型不是加也不是减，那么就是初始化的时。
			return preState
  }
}