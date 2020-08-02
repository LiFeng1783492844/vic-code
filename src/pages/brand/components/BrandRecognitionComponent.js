import React from 'react';
import { connect } from 'dva';
import { Table, Card, Input, Select, Button, Row, Col } from 'antd';
import '../../../css/BrandRecognition.css';

const { Option } = Select;

// 如果dataIndex唯一，则可以不需要设置key
const columns = [
  {
    title: '品牌名称',
    dataIndex: 'brandName',
    key: 'brandName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '操作时间',
    dataIndex: 'operationTime',
    key: 'operationTime',
  },
];

class BrandRecognitionComponent extends React.Component {
  render() {
    return (
      <div className="content">
        <Card
          size="small"
          className="query-criteria-card"
          title="查询条件"
          bordered={false}
        >
          <Row>
            <Col span={8}>
              <span>品牌名称：</span>
              <Input className="brand-name-input" />
            </Col>
            <Col span={8}>
              <span>状态：</span>
              {/* <Select defaultValue="请选择" style={{ width: 120 }} onChange={handleChange}> */}
              <Select defaultValue="init" style={{ width: 150 }}>
                <Option value="init">请选择</Option>
                <Option value="toBeConfirm">待确定</Option>
                <Option value="success">成功</Option>
                <Option value="fail">失败</Option>
                <Option value="cancel">取消</Option>
              </Select>
            </Col>
            <Col span={8} className="btnArea">
              <Button type="primary">查 询</Button>
              <Button className="reset-btn">重 置</Button>
            </Col>
          </Row>
        </Card>
        <Card
          size="small"
          className="brand-confirm-card"
          title="品牌确认"
          bordered={false}
        >
          <Table columns={columns} dataSource={this.props.brandData} />
        </Card>
      </div>
    );
  }
}

export default connect(({ brandRecognition }) => brandRecognition)(
  BrandRecognitionComponent,
);
