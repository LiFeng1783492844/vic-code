import React from 'react';
import { connect } from 'dva';
import { Table, Card, Input, Select, Button } from 'antd';
import '../../../css/BrandRecognition.css';

const { Option } = Select;

// const BrandRecognitionComponent = props => {
//   const columns = [
//     {
//       title: '品牌名称',
//       dataIndex: 'brandName',
//       key: 'brandName',
//     },
//     {
//       title: '状态',
//       dataIndex: 'state',
//       key: 'state',
//     },
//     {
//       title: '操作',
//       dataIndex: 'operation',
//       key: 'operation',
//     },
//     {
//       title: '操作人',
//       dataIndex: 'operator',
//       key: 'operator',
//     },
//     {
//       title: '操作时间',
//       dataIndex: 'operationTime',
//       key: 'operationTime',
//     },
//   ];

//   const data = [];

//   const {testData} = props;

//   return (
//     <div className="content">
//       <Card className="query-criteria-card" title="查询条件" bordered={false}>
//         <div className="brand-name-area">
//           品牌名称：
//           <Input className="brand-name-input" />
//         </div>
//         <div className="brand-state-area">
//           状态：
//           {/* <Select defaultValue="请选择" style={{ width: 120 }} onChange={handleChange}> */}
//           <Select defaultValue="init" style={{ width: 150 }}>
//             <Option value="init">请选择</Option>
//             <Option value="toBeConfirm">待确定</Option>
//             <Option value="success">成功</Option>
//             <Option value="fail">失败</Option>
//             <Option value="cancel">取消</Option>
//           </Select>
//         </div>
//         <div className="btn-area">
//           <Button type="primary">查 询</Button>
//           <Button className="reset-btn">重 置</Button>
//         </div>
//       </Card>
//       <Card className="brand-confirm-card" title="品牌确认" bordered={false}>
//         <Table columns={columns} dataSource={data} />
//       </Card>
//       <div>{testData.toString()}</div>
//     </div>
//   );
// };

const columns = [
  {
    title: '品牌名称',
    dataIndex: 'brandName',
    key: 'brandName',
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
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

const data = [];

class BrandRecognitionComponent extends React.Component {
  render() {
    return (
      <div className="content">
        <Card className="query-criteria-card" title="查询条件" bordered={false}>
          <div className="brand-name-area">
            品牌名称：
            <Input className="brand-name-input" />
          </div>
          <div className="brand-state-area">
            状态：
            {/* <Select defaultValue="请选择" style={{ width: 120 }} onChange={handleChange}> */}
            <Select defaultValue="init" style={{ width: 150 }}>
              <Option value="init">请选择</Option>
              <Option value="toBeConfirm">待确定</Option>
              <Option value="success">成功</Option>
              <Option value="fail">失败</Option>
              <Option value="cancel">取消</Option>
            </Select>
          </div>
          <div className="btn-area">
            <Button type="primary">查 询</Button>
            <Button className="reset-btn">重 置</Button>
          </div>
        </Card>
        <Card className="brand-confirm-card" title="品牌确认" bordered={false}>
          <Table columns={columns} dataSource={data} />
        </Card>
        <div>{this.props.testData.toString()}</div>
      </div>
    );
  }
}

export default connect(({ brandRecognition }) => brandRecognition)(
  BrandRecognitionComponent,
);
