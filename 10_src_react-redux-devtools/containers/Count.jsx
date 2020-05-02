/*该文件是Count的容器组件
  1.容器组件是真正和redux打交道的，里面可以随意的使用redux的api。
  2.容器组件会传给UI组件：(1).redux中所保存的状态。 (2).用于操作状态的方法。
  3.备注：容器给UI传递：状态、操作状态的方法，均通过props传递。
	特别注意：容器组件，肯定是组件，但是容器组件不是你亲自去定义的，是靠react-redux插件库中的connect方法生成的。
*/
//1引入react核心库
import React, { Component } from 'react'
//2.引入react-redux库中的connect方法(重点)
import {connect} from 'react-redux'
//3.引入action
import {increment, decrement,incrementAsync} from '../redux/actions/count'

//4.引入Count的UI组件
class Count extends Component {
  //加
  increment = ()=>{
    //获取用户的输入
    const {value} = this.refs.user_selected
    //2."通知"redux 加 value
    this.props.increment(value*1)
  }
  //减
  decrement = ()=>{
    //获取用户的输入
    const {value} = this.refs.user_selected
    //2."通知"redux 减 value
    this.props.decrement(value*1)
  }
  //当前的和是奇数再加
  incrementIfOdd = ()=>{
    //获取用户的输入
    const {value} = this.refs.user_selected
    //获取原来的和
    let {count} = this.props //这里取出来的对象,需要解构赋值
    //判断
    if(count%2 === 1){
      //2."通知"redux 加 value
      this.props.increment(value*1)
    }
  }

  //等500毫秒再加
  incrementAsync = ()=>{
    //获取用户的输入
    const {value} = this.refs.user_selected
    this.props.incrementAsync(value*1, 500)
    // setTimeout(() => {
      //2."通知"redux 加 value
    //   this.props.increment(value*1)
    // }, 500);
  }
  render() {
    const {count, personCount} = this.props
    return (
      <div>
        <h1>当前求和为：{count},下方组件的总人数为:{personCount}</h1>
				<select ref="user_selected">
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>&nbsp;
				<button onClick={this.increment}>+</button>&nbsp;
				<button onClick={this.decrement}>-</button>&nbsp;
				<button onClick={this.incrementIfOdd}>increment if odd</button>&nbsp;
				<button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}

//5.暴露Count的容器组件
export default connect(
  state =>({
    count: state.number,
    personCount: state.persons.length
  }), //映射状态数据,state是redux中保存的【总】状态。
  //精简的写法：因为connect函数底层有判断，若第二个参数是对象，会加工成一个函数
  {increment, decrement, incrementAsync}
)(Count)
