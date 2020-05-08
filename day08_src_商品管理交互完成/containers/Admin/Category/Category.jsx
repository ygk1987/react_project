import React, { Component } from 'react'
import { Card,Button,Table,Modal,Input,Form,message } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';
import {connect} from 'react-redux'
import {saveCategoryAsync} from '@/redux/actions/category'
import {PAGE_SIZE, MESSAGE_TIME} from '@/config'
import {reqAddCategory, reqUpdateCategory} from '@/api'

const {Item} = Form 

@connect(
  state =>({categorylist: state.categorylist}), //映射操作状态
  // {saveCategory} //映射操作状态的方法
  {saveCategoryAsync}
)
class Category extends Component {
  //默认不展示弹窗
  state = { visible: false };

  //复用展示弹窗(新增和修改共用一个，要区分好到底是新增，还是修改)
  showModal = (categoryObj) => {
    //获取Form实例对象
    const {categoryForm} = this.refs
    this._id = '' //重置_id
    this.name = '' //重置name
    this.isUpdate = false //重置标识
    //获取当前分类的id和name
    const {_id, name} = categoryObj
    if(_id && name){
      //若是修改,则要存下:_id,name(注意,这里的数据没有放在自身的状态里,而是挂在了组件的实例对象上)
      this._id = _id //存下_id,一会发请求用.
      this.name = name //存下name，一会做数据回显用。
      this.isUpdate = true //标识是否为修改
    }
    //弹窗非第一次展示,设置表单默认值(第一次靠initialValues,后边就失效了)
    if(categoryForm) categoryForm.setFieldsValue({category: this.name})
    //展示弹窗
    this.setState({visible: true});
  };

  //复用确认的回调(新增的确认、修改的确认都走这个回调) 
  handleOk = async () => {
    //1.获取表单数据
    const {categoryForm} = this.refs
    //2.校验数据
    const {category} = categoryForm.getFieldsValue()
    if(!category || !category.trim()){//若输不合法
      message.error('分类名不能为空', MESSAGE_TIME);
    }else{//若输入合法
      //3.发送请求添加或修改一个分类
      let result
      if(this.isUpdate){
        //如果是修改，则发起修改请求，携带:id,category
        result = await reqUpdateCategory(this._id,category)
      }else{
        //如果是新增，则发起新增请求，携带:category
        result = await reqAddCategory(category)
      }
      //从reslut中获取本次操作结果
      const {status, msg} = result
      if(status === 0){
        message.success(this.isUpdate ? '修改分类成功':'新增分类成功',MESSAGE_TIME)
        //再次发送请求保存数据
        this.props.saveCategoryAsync()
        //4.隐藏弹窗
        this.setState({visible: false});
        //5.重置表单
        categoryForm.resetFields()
      }else{
        message.error(msg,MESSAGE_TIME)
      }
    }
  };

  //取消的回调
  handleCancel = () => {
    const {categoryForm} = this.refs
    this.setState({visible: false});
    categoryForm.resetFields()
  };

  //生命周期钩子函数
  componentDidMount(){
    //保存分类数据到redux
    this.props.saveCategoryAsync()
  }

  render() {
    //表格的数据源
    const dataSource = this.props.categorylist;

    //表格的列配置(特别重要)
    const columns = [
      {
        title: '分类名',//列名
        dataIndex: 'name',//数据索引项，控制该列展示什么信息。
        key: 'name',//不是一个必要的属性，和该列展示什么信息，没有任何关系，写上效率高
      },
      {
        title: '操作',
        //dataIndex: 'name',
        width:'20%',
        align:'center',
        render:(categoryObj) => 
              <Button
                onClick = {()=>{this.showModal(categoryObj)}} 
                type="link"
              >修改分类
              </Button>, //render用于高级渲染，返回值展示到页面
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
              pageSize:PAGE_SIZE //每页展示多少条
            }} 
          />
      </Card>
        {/* Modal弹窗组件 */}
        <Modal
          title={this.isUpdate?'修改分类':'新增分类'} //弹窗标题
          visible={this.state.visible} //控制弹窗是否展示
          onOk={this.handleOk} //确认的回调
          onCancel={this.handleCancel} //取消的回调
          okText="确定"
          cancelText="取消"
        >
          <Form ref="categoryForm" initialValues={{category: this.name}}>
            <Item
              name="category"
              rules={[
                {required:true, message:'分类名必须输入'}
              ]}
            >
              <Input  placeholder="请输入分类名"/>
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
export default Category


