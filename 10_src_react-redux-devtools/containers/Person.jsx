//1.引入react核心库
import React, { Component } from 'react'
//2.引入connect方法(重点)
import {connect} from 'react-redux'
//3.引入person的action
import {addPerson} from '../redux/actions/person'
//4.引入uuid生成person的id
import {v4 as uuidv4} from 'uuid'

//5.Person的UI组件
class Person extends Component {
  add = ()=>{
    //1.获取用户输入
    const {nameNode, ageNode} = this.refs
    if(!nameNode.value || !ageNode.value){
      alert('名字和年龄均不能为空')
      return
    }
    //2.加人
    this.props.addPerson({
      id:uuidv4(),
      name:nameNode.value,
      age:ageNode.value
    })
    //3.清空输入
    nameNode.value = ''
    ageNode.value = ''
  }
  render() {
    const {persons,count} = this.props
    return (
      <div>
        <h1>当前总人数为：{persons.length},上方组件求和为：{count}</h1>
				<input ref="nameNode" type="text" placeholder="输入名字"/>&nbsp;
				<input ref="ageNode" type="text" placeholder="输入年龄"/>&nbsp;
        <button onClick={this.add}>添加</button>
        <ul>
          {
            persons.map((personObj)=>{
            return <li key={personObj.id}>姓名:{personObj.name}, 年龄:{personObj.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

//6.暴露Person的容器组件
export default connect(
  state => ({//映射状态,
    persons: state.persons,
    count: state.number
  }),
  {addPerson}//映射间接操作状态的方法
)(Person)
