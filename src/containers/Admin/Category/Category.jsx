import React, { Component } from 'react'
import { Card,Button,Table } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'

// import {reqCategoryList} from '@/api'
//同步action
// import {saveCategory} from '@/redux/actions/category'
//异步action
import {saveCategoryAsync} from '@/redux/actions/category'


@connect(
  state =>({categorylist: state.categorylist}), //映射操作状态
  // {saveCategory} //映射操作状态的方法
  {saveCategoryAsync}
)
class Category extends Component {
  componentDidMount(){
    this.props.saveCategoryAsync()
  }
  render() {
    //表格的数据源
    const dataSource = this.props.categorylist
    //表格的列配置(特别重要)
    const columns = [
      {
        title: '分类名',//列名
        dataIndex: 'name',//数据索引项，控制该列展示什么信息。
        key: 'name',//不是一个必要的属性，和该列展示什么信息，没有任何关系，写上效率高
      },
      {
        title: '操作',
        width:'20%',
        align:'center',
        render:() => <Button type="link">修改分类</Button>, //render用于高级渲染，返回值展示到页面
				key: '3',
      }
    ];
    return (
      <div>
      <Card extra={<Button type="primary"><PlusCircleOutlined />添加</Button>}>
        <Table 
          dataSource={dataSource} //配置数据源
          columns={columns} //配置列
          bordered //展示边框
          rowKey="_id" //配置唯一标识
          pagination={{ //分页器
            pageSize:4 //每页展示多少条
          }} 
        />
      </Card>
    </div>
    )
  }
}
export default Category


