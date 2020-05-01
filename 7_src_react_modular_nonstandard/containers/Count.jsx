//1.引入UI组件
import Count from '../components/Count/Count'
//2.引入connect方法(重点)
import {connect} from 'react-redux'
//3.引入action
import {increment, decrement, incrementAsync} from '../redux/actions/count'

export default connect(
  state => ({count: state.number}), //映射状态
  //因为connect函数底层有判断，若第二个参数是对象，会加工成一个函数
  //所以可以简写如下:
  {increment, decrement, incrementAsync}
)(Count)