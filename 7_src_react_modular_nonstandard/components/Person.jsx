import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

export default class Person extends Component {

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
