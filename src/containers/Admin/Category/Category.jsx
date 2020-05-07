import React, { Component } from 'react'
import { Card,Button,Table,Modal,Input,Form } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {saveCategoryAsync} from '@/redux/actions/category'

const {Item} = Form 

@connect(
  state =>({categorylist: state.categorylist}), //映射操作状态
  // {saveCategory} //映射操作状态的方法
  {saveCategoryAsync}
)
class Category extends Component {
  //默认不展示弹窗
  state = { visible: false };
  //展示弹窗
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  //确认的回调
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  //取消的回调
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  //生命周期钩子函数
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
        {/* Card展示组件 */}
        <Card 
          extra={
            <Button type="primary" onClick={this.showModal}>
              <PlusCircleOutlined />添加
            </Button>
          }
        >
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
        {/* Modal弹窗组件 */}
        <Modal
          title="新增分类" //弹窗标题
          visible={this.state.visible} //控制弹窗是否展示
          onOk={this.handleOk} //确认的回调
          onCancel={this.handleCancel} //取消的回调
          okText="确定"
          cancelText="取消"
        >
          <Form>
            <Item
              name="category"
              rules={[
                {required:true, message:'分类名必须输入'}
              ]}
            >
              <Input placeholder="请输入分类名"/>
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Category


