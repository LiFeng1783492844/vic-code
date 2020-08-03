import React from 'react';
import { message, Modal, Form, Select, Row, Input } from 'antd';
import { getDate } from '../../../utils/date';
const { Option } = Select;

const ModalComponent = props => {
  const { record, type, hideModal, submitForm } = props;
  const [form] = Form.useForm();

  const validateMessages = {
    required: '${label} is required!',
  };

  //   点击OK
  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        console.log('values', values);
        record.brandName = values.brandName;
        record.status = parseInt(values.status);
        record.operationTime = getDate();

        submitForm(record, type);
      })
      .catch(err => {
        message.error('验证错误');
      });
  };

  return (
    <Modal
      title={type == 'update' ? '编辑品牌信息' : '添加品牌信息'}
      visible={true}
      onOk={handleOk}
      onCancel={hideModal}
    >
      <Form
        name="form"
        form={form}
        initialValues={record}
        validateMessages={validateMessages}
      >
        <Row>
          <Form.Item
            label="品牌名称"
            name="brandName"
            rules={[{ required: true }]}
          >
            <Input className="brand-name-input" />
          </Form.Item>
        </Row>
        <Row>
          <Form.Item label="状态" name="status" rules={[{ required: true }]}>
            <Select style={{ width: 150 }}>
              <Option value={0}>待确定</Option>
              <Option value={1}>成功</Option>
              <Option value={2}>失败</Option>
              <Option value={3}>取消</Option>
            </Select>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalComponent;
