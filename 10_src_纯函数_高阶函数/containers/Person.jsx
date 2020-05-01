//1.引入react核心库
import React, { Component } from 'react'
//2.引入connect方法(重点)
import {connect} from 'react-redux'
//3.引入Person的action
import {addPerson} from '../redux/actions/person'
//4.引入生成id的uuidjs库
import { v4 as uuidv4 } from 'uuid';

//5.Person的UI组件
class Person extends Component {
	add = ()=>{
		//获取用户输入
		const {nameNode, ageNode} = this.refs
		if(!nameNode.value || !ageNode.value){
			alert('名字和年龄不能为空')
			return
		}
		//添加人
		this.props.addPerson({
			id: uuidv4(),
			name: nameNode.value,
			age: ageNode.value
		})
		//清空输入
		nameNode.value = ''
		ageNode.value = ''
	}

  render() {
		const {persons} = this.props
    return (
      <div>
        <h1>当前总人数为：{persons.length}</h1>
				<input ref="nameNode" type="text" placeholder="输入名字"/>&nbsp;
				<input ref="ageNode" type="text" placeholder="输入年龄"/>&nbsp;
				<button onClick={this.add}>添加</button>
				<ul>
					{
						persons.map((personObj)=>{
						return <li key={personObj.id}>姓名:{personObj.name},年龄:{personObj.age}</li>
						})
					}
				</ul>
      </div>
    )
  }
}

//6.向外暴露person的容器组件
export default connect(
  state => ({persons:state.persons}),//映射状态,state是redux中保存的【总】状态。
  {addPerson} //映射间接操作状态的方法
)(Person)
/*高阶函数:
	1)理解:一类特别的函数
			a.情况1: 参数是函数
			b.情况2: 返回是函数
			c.备注：情况1和情况2满足一个即可
	2)常见的高阶函数: 
			a.定时器设置函数
			b.数组的forEach()/map()/filter()/reduce()/find()
			c.函数对象的bind()
			d.Promise() / then()
			e.antd中的Form.create()()
			f.react-router-dom中的withRouter
			g.react-redux中的connect()
	3)作用: 
			a.能实现更加动态, 更加可扩展的功能
*/