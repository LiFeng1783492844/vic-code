import React from 'react';
import { connect } from 'dva';
import { Table, Card, Input, Select, Button, Row, Col, Form } from 'antd';
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

// class BrandRecognitionComponent extends React.Component {

//   render() {
//     return (
//       <div className="content">
//         <Card
//           size="small"
//           className="query-criteria-card"
//           title="查询条件"
//           bordered={false}
//         >
//           <Row>
//             <Col span={8}>
//               <span>品牌名称：</span>
//               <Input className="brand-name-input" />
//             </Col>
//             <Col span={8}>
//               <span>状态：</span>
//               {/* <Select defaultValue="请选择" style={{ width: 120 }} onChange={handleChange}> */}
//               <Select defaultValue="init" style={{ width: 150 }}>
//                 <Option value="init">请选择</Option>
//                 <Option value="toBeConfirm">待确定</Option>
//                 <Option value="success">成功</Option>
//                 <Option value="fail">失败</Option>
//                 <Option value="cancel">取消</Option>
//               </Select>
//             </Col>
//             <Col span={8} className="btnArea">
//               <Button type="primary" onClick={clickRefer}>查 询</Button>
//               <Button className="reset-btn">重 置</Button>
//             </Col>
//           </Row>
//         </Card>
//         <Card
//           size="small"
//           className="brand-confirm-card"
//           title="品牌确认"
//           bordered={false}
//         >
//           <Table columns={columns} dataSource={this.props.brandData} />
//         </Card>
//       </div>
//     );
//   }
// }

const BrandRecognitionComponent = props => {
  const { dispatch } = props;
  const [referForm] = Form.useForm();

  // 更新state中的值
  const setState = state => {
    dispatch({ type: 'brandRecognition/setState', payload: { ...state } });
  };

  // 点击查询按钮
  const clickRefer = e => {
    const params = referForm.getFieldsValue();
    console.log('params', params);

    setState(params);
    dispatch({ type: 'brandRecognition/getBrandData' });
  };

  return (
    <div className="content">
      <Card
        size="small"
        className="query-criteria-card"
        title="查询条件"
        bordered={false}
      >
        <Form
          name="referForm"
          form={referForm}
          initialValues={{ brandName: props.brandName, status: props.status }}
        >
          <Row>
            <Col span={8}>
              <Form.Item label="品牌名称" name="brandName">
                <Input className="brand-name-input" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="状态" name="status">
                <Select style={{ width: 150 }}>
                  <Option value={-1}>请选择</Option>
                  <Option value={0}>待确定</Option>
                  <Option value={1}>成功</Option>
                  <Option value={2}>失败</Option>
                  <Option value={3}>取消</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8} className="btnArea">
              <Form.Item>
                <Button type="primary" onClick={clickRefer}>
                  查 询
                </Button>
                <Button className="reset-btn">重 置</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        size="small"
        className="brand-confirm-card"
        title="品牌确认"
        bordered={false}
      >
        <Table columns={columns} dataSource={props.brandData} />
      </Card>
    </div>
  );
};

export default connect(({ brandRecognition }) => brandRecognition)(
  BrandRecognitionComponent,
);
