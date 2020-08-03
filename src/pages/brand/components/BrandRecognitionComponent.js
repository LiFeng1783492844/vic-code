import React from 'react';
import { connect } from 'dva';
import {
  Table,
  Card,
  Input,
  Select,
  Button,
  Row,
  Col,
  Form,
  Pagination,
  Popconfirm,
  message,
  Modal,
} from 'antd';
import '../../../css/BrandRecognition.css';
import ModalComponent from './ModalComponent';

const { Option } = Select;

const BrandRecognitionComponent = props => {
  const { dispatch } = props;
  const [referForm] = Form.useForm();

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
      render: (text, record, index) => (
        <div>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              clickEdit(record);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="你确定删除该条记录吗?"
            onConfirm={() => {
              clickDelete(record.key);
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type="danger" size="small">
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
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

  // 点击查询按钮
  const clickRefer = e => {
    const params = referForm.getFieldsValue();
    dispatch({ type: 'brandRecognition/getBrandData', payload: { ...params } });
  };

  // 点击重置按钮
  const clickReset = () => {
    console.log('clickReset');
    referForm.resetFields();
    dispatch({
      type: 'brandRecognition/getBrandData',
      payload: { brandName: '', status: -1, page: 1 },
    });
  };

  // 点击编辑按钮
  const clickEdit = record => {
    dispatch({
      type: 'brandRecognition/setState',
      payload: { visible: true, record, modalType: 'update' },
    });
  };

  // 点击删除按钮
  const clickDelete = key => {
    console.log('删除', key);
    dispatch({ type: 'brandRecognition/deleteBrand', payload: { key } });
    dispatch({ type: 'brandRecognition/getBrandData', payload: { page: 1 } });
    message.success('删除成功！');
  };

  // 每页记录条数改变时触发
  const onShowSizeChange = (current, pageSize) => {
    dispatch({
      type: 'brandRecognition/getBrandData',
      payload: { size: pageSize, page: 1 },
    });
  };

  // 页码改变时触发
  const onChange = (page, pageSize) => {
    dispatch({ type: 'brandRecognition/getBrandData', payload: { page } });
  };

  // 对话框组件提交数据
  const submitOperateModalForm = (record, type) => {
    dispatch({
      type:
        type == 'update'
          ? 'brandRecognition/updateBrand'
          : 'brandRecognition/addBrand',
      payload: { record },
    });
    hideOperateModalForm();
  };

  // 隐藏对话框
  const hideOperateModalForm = () => {
    dispatch({
      type: 'brandRecognition/setState',
      payload: { visible: false, record: null },
    });
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
          initialValues={{ brandName: '', status: -1 }}
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
                <Button className="reset-btn" onClick={clickReset}>
                  重 置
                </Button>
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
        <Table
          columns={columns}
          dataSource={props.brandData}
          pagination={false}
        />
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          pageSizeOptions={[10, 20, 30]}
          current={props.page}
          onChange={onChange}
          total={props.totalPage}
        />
      </Card>

      {props.visible && (
        <ModalComponent
          record={props.record}
          type={props.modalType}
          hideModal={hideOperateModalForm}
          submitForm={submitOperateModalForm}
        />
      )}
    </div>
  );
};

export default connect(({ brandRecognition }) => brandRecognition)(
  BrandRecognitionComponent,
);
