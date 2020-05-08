import React, { Component } from 'react'
import { Card } from 'antd';

export default class Product extends Component {
  render() {
    return (
      <div>
        <Card title="Default size card" extra={<a href="#">More</a>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>
    )
  }
}
