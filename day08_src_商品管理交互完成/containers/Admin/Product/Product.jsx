import React, { Component } from 'react'
import { Card,Button,Select,Input,Table,message } from 'antd';
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';
import {reqProductList, reqSerachProduct} from '@/api'
import {PAGE_SIZE} from '@/config'
const { Option } = Select;
export default class Product extends Component {
  state = {
    productList:[], //商品数据
    total:0, //数据总数
    pageNum:0,//当前是第几页
    searchType:'productName',//搜索方式(默认值是按名称搜)
    keyWord:''//搜索的关键字
  }

  getProductList = async (pageNum=1)=>{
    //根据页码请求商品列表
    let result
    if(this.isSearch){
      //如果是搜索
      const {searchType,keyWord} = this.state
      result  = await reqSerachProduct(searchType,keyWord,pageNum,PAGE_SIZE)
    }else{
      //如果是初始化
      result = await reqProductList(pageNum, PAGE_SIZE)
    }
    const {status, data, msg} = result
    if(status === 0){
      const {list,total,pageNum} = data
      this.setState({productList:list,total,pageNum})
    }else{
      message.error(msg)
    }
  }

  componentDidMount(){
    this.getProductList()
  }

  render() {
    //表格的数据源
    const dataSource = this.state.productList
    //表格的列配置
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        render:(price)=>'￥' + price
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align:'center',
        render:(status)=>{
          return(
            <div>
              <Button type={status === 1 ? 'danger' : 'primary'}>
                {status === 1 ? '下架' : '上架'}
              </Button><br/>
              <span>{status === 1 ? '在售' : '售罄'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        //dataIndex: 'action',
        key: 'action',
        align:'center',
        render:()=>(
          <div>
            <Button type="link">详情</Button><br/>
            <Button type="link">修改</Button>
          </div>
        )
      },
    ];
    return (
      <div>
        <Card 
        title={
          <div>
             <Select 
              defaultValue="productName" 
              onChange={value => this.setState({searchType:value})}
             >
              <Option value="productName">按名称搜索</Option>
              <Option value="productDesc">按描述搜索</Option>
            </Select>
            <Input 
              onChange = {(event)=>this.setState({keyWord:event.target.value})}
              style={{width:'20%',margin:'10px'}} 
              allowClear placeholder="请输入关键字"
            />
            <Button 
              onClick={()=>{
                this.isSearch = true //标识当前动作为搜索
                this.getProductList()
              }} 
              type="primary"><SearchOutlined/>搜索
            </Button>
          </div>
        } 
          extra={
            <Button type="primary">
              <PlusCircleOutlined/>添加商品
            </Button>
          }
        >
          <Table 
            dataSource={dataSource} 
            columns={columns} 
            bordered
            rowKey="_id"
            pagination={{
              total:this.state.total,
              pageSize:PAGE_SIZE,
              current:this.state.pageNum,
              onChange:(pageNum)=>{
                this.getProductList(pageNum)
              }
            }}
          />
        </Card>
      </div>
    )
  }
}
