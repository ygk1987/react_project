/*该文件是Count的UI组件
		1.UI的外补应该包裹一个容器组件，他们是父子关系。
		2.UI组件中不能使用任何redux的api。
		3.会通过props接到容器组件传过来的：状态、操作状态的方法。 
*/

import React, { Component } from 'react'

export default class Count extends Component {
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
