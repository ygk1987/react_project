import React, { Component } from 'react'
import { Card,Button,Table } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons';

export default class Category extends Component {
  render() {
    //表格的数据源
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
      },
    ];
    //表格的列配置(特别重要)
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      },
    ];
    return (
      <div>
      <Card extra={<Button type="primary"><PlusCircleOutlined />添加</Button>}>
        <Table 
          dataSource={dataSource} //配置数据源
          columns={columns} //配置列
          bordered //展示边框
          // rowKey="_id" //配置唯一标识
          pagination={{ //分页器
            pageSize:4 //每页展示多少条
          }} 
        />
      </Card>
    </div>
    )
  }
}
