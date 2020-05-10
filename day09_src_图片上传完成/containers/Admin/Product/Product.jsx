import React, { Component } from 'react'
import { Card,Button,Select,Input,Table,message } from 'antd';
import {PlusCircleOutlined,SearchOutlined} from '@ant-design/icons';
import {reqProductList, reqSerachProduct,reqUpdateProductStatus} from '@/api'
import {PAGE_SIZE} from '@/config'
const { Option } = Select;
export default class Product extends Component {
  state = {
    productList:[], //商品数据
    total:0, //数据总数
    pageNum:0,//当前是第几页
    searchType:'productName',//搜索方式(默认值是按名称搜)
    keyWord:'',//搜索的关键字
    isLoading:false //是否处于加载中
  }

  //控制商品上架、上架
  changStatus = async(_id, currentStatus)=>{
    //更新状态
    if(currentStatus === 1) currentStatus = 2;
    else currentStatus = 1;
    //请求更新
    let result = await reqUpdateProductStatus(_id,currentStatus)
    const {status,msg} = result
    if(status === 0){
      message.success(currentStatus === 1?'上架成功':'下架成功')
      //重新请求数据
      this.getProductList(this.state.pageNum)
    }else{
      message.error(msg)
    }
  }

  getProductList = async (pageNum=1)=>{
    //根据页码请求商品列表
    let result
    this.setState({isLoading:true})
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
      this.setState({productList:list,total,pageNum,isLoading:false})
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
        //dataIndex: 'status',
        key: 'status',
        align:'center',
        render:(productObj)=>{
          const {_id,status} = productObj
          return(
            <div>
              <Button onClick={()=>{this.changStatus(_id,status)}} type={status === 1 ? 'danger' : 'primary'}>
                {status === 1 ? '下架' : '上架'}
              </Button><br/>
              <span>{status === 1 ? '在售' : '售罄'}</span>
            </div>
          )
        }
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'action',
        align:'center',
        render:(id)=>(
          <div>
            <Button 
              onClick={()=>{this.props.history.push(`/admin/prod_about/product/detail/${id}`)}}
              type="link"
            >详情
            </Button><br/>
            <Button 
              onClick={()=>{this.props.history.push(`/admin/prod_about/product/update/${id}`)}}
              type="link"
            >修改
            </Button>
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
            <Button 
            onClick={()=>{this.props.history.push('/admin/prod_about/product/add')}}
              type="primary"
            >
              <PlusCircleOutlined/>添加商品
            </Button>
          }
        >
          <Table 
            loading = {this.state.isLoading}
            dataSource={dataSource} //表格的数据源
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
