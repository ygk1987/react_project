/*该文件是Count的容器组件
  1.容器组件是真正和redux打交道的，里面可以随意的使用redux的api。
  2.容器组件会传给UI组件：(1).redux中所保存的状态。 (2).用于操作状态的方法。
  3.备注：容器给UI传递：状态、操作状态的方法，均通过props传递。
	特别注意：容器组件，肯定是组件，但是容器组件不是你亲自去定义的，是靠react-redux插件库中的connect方法生成的。
*/
//1引入UI组件
import Count from '../components/Count/Count'
//2.引入react-redux库中的connect方法(重点)
import {connect} from 'react-redux'
//3.引入action
import {increment, decrement,incrementAsync} from '../redux/actions/count'

export default connect(
  state =>({
    count: state.number,
    personCount: state.persons.length
  }), //映射状态数据,state是redux中保存的【总】状态。
  //精简的写法：因为connect函数底层有判断，若第二个参数是对象，会加工成一个函数
  {increment, decrement, incrementAsync}
)(Count)

