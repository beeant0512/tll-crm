import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Modal, Icon, Button } from 'antd';
import { formItemLayout, tailFormItemLayout } from '@/utils/styles';
import styles from '@/global.less';
import GroupSelect from '@/components/Groups/select';
import CustomerContacts from '@/components/CustomerContacts';

const FormItem = Form.Item;
let id = 0;

@connect(({ customer, groups, loading }) => ({
  customer,
  groups,
  loading: loading.effects['customer/get'],
}))
@Form.create()
class CustomerEditModal extends PureComponent {
  uniqueValid = (field, fieldValues, callback) => {
    const { values, dispatch } = this.props;
    if (fieldValues && fieldValues.length > 0) {
      const payload = { customerId: values.customerId };
      payload[field] = fieldValues;
      dispatch({
        type: 'customer/validate',
        payload,
        callback: response => {
          if (!response.success) {
            callback(response.msg);
          } else {
            callback();
          }
        },
      });
    } else {
      callback();
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  handleOk = () => {
    const { onOk, form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let type = 'customer/add';
      if (values.customerId) {
        type = 'customer/update';
      }
      dispatch({
        type,
        payload: values,
        callback: response => {
          if (response.success) {
            onOk(response.data);
          }
        },
      });
    });
  };

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // eslint-disable-next-line
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      visible,
      title,
      values,
      width,
    } = this.props;
    const me = this;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <FormItem
        {...(index === 0 ? formItemLayout : tailFormItemLayout)}
        label={index === 0 ? '联系人信息' : ''}
        key={k}
      >
        {getFieldDecorator(`contacts[${k}]`, {
          initialValue: values.contacts,
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{ required: true, message: '联系人信息不能为空!' }],
        })(<CustomerContacts placeholder="请输入联系人信息" />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            style={{ marginLeft: '5px' }}
            onClick={() => this.remove(k)}
          />
        ) : null}
      </FormItem>
    ));
    return (
      <Modal
        width={width || 1024}
        maskClosable={false}
        title={title || `编辑: ${values.customerName}`}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <Row gutter={8}>
            <Col span={24} className={styles.hidden}>
              <FormItem {...formItemLayout} label="customerId">
                {getFieldDecorator('customerId', {
                  initialValue: values.customerId,
                })(<Input placeholder="系统自动生成无需编辑" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="公司名称">
                {getFieldDecorator('customerName', {
                  initialValue: values.customerName,
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '公司名称不能为空!' },
                    {
                      validator(rule, fieldValues, callback) {
                        me.uniqueValid('customerName', fieldValues, callback);
                      },
                    },
                  ],
                })(<Input placeholder="请输入公司名称" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="联系地址">
                {getFieldDecorator('address', {
                  initialValue: values.address,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '联系地址不能为空!' }],
                })(<Input placeholder="请输入联系地址" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="所属行业">
                {getFieldDecorator('industry', {
                  initialValue: values.industry,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '所属行业不能为空!' }],
                })(<GroupSelect type="hangye" placeholder="请选择所属行业" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              {formItems}
              <FormItem {...tailFormItemLayout}>
                <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                  <Icon type="plus" /> 新增联系人
                </Button>
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="客户来源">
                {getFieldDecorator('source', {
                  initialValue: values.source,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '客户来源不能为空!' }],
                })(<GroupSelect type="laiyuan" placeholder="请选择客户来源" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default CustomerEditModal;
