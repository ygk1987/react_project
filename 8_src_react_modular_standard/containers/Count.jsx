//1.引入react核心库
import React, { Component } from 'react'
//2.引入connect方法(重点)
import {connect} from 'react-redux'
//3.引入action
import {increment, decrement, incrementAsync} from '../redux/actions/count'

//4.Count的UI组件
class Count extends Component {
  //加
	increment = ()=>{
    //1.获取用户的输入
    const {value} = this.refs.user_selected
    //2.父容器将react-redux库中connect函数第一次调用的参数通过props传递给UI组件
    this.props.increment(value*1)
  }

  //减
	decrement = ()=>{
    //获取用户的输入
    const {value} = this.refs.user_selected
    //2."通知"redux 加 value
    this.props.decrement(value*1)
  }

  //当前的和是奇数再加
	incrementIfOdd = ()=>{
    //获取用户的输入
    const {value} = this.refs.user_selected
    //2.获取现在的和
		const {count} = this.props
    //判断
    if(count % 2 === 1){
      //3.父容器将react-redux库中connect函数第一次调用的参数通过props传递给UI组件
      this.props.increment(value*1)
    } 
  }

  //等500毫秒再加
	incrementAsync = ()=>{
    //1.获取用户的输入
    const {value} = this.refs.user_selected
    this.props.incrementAsync(value*1, 500)
    // setTimeout(() => {
       //2.父容器将react-redux库中connect函数第一次调用的参数通过props传递给UI组件
    //   this.props.increment(value*1)
    // }, 500);
  }

  render() {
    return (
      <div>
				<h1>当前求和为：{this.props.count}</h1>
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

//5.向外暴露Count的容器组件
export default connect(
  state => ({count: state.number}), //映射状态
  //因为connect函数底层有判断，若第二个参数是对象，会加工成一个函数
  //所以可以简写如下:
  {increment, decrement, incrementAsync} //映射操作状态的方法
)(Count)