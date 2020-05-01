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
    const {count,personCount} = this.props
    return (
      <div>
				<h1>当前求和为：{count},下面Person组件的总人数:{personCount}</h1>
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
  state => ({//映射状态,state是redux中保存的【总】状态。
    count: state.number,
    personCount:state.persons.length
  }),
  //因为connect函数底层有判断，若第二个参数是对象，会加工成一个函数
  //所以可以简写如下:
  {increment, decrement, incrementAsync} //映射操作状态的方法
)(Count)

/* 思考：一个普通的组件要和redux“打交道”，流程是什么？
    1.编写该普通组件展示静态页面
    2.创建该组件对应的容器组件
    3.在App组件中引入该组件对应的容器组件
    4.创建该组件对应的Reducer
    5.在Reducers文件夹的index.js中引入该Reducer放入汇总的Reduces容器对象中
        对象的key由程序员自定义,对象的valule由对应的reducer生成。
    6.创建该组件对应的Action
        可以将异步action放在该文件处理,当然也可以直接再该action中对应的UI组件直接处理异步任务
    7.在redux中的action_types.js 定义action对象中type属性的常量,防止后边拼写错误
    8.在容器组中,从总状态中取出所需的状态数据,并在对应的UI组件中渲染
*/