import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/styles';
import styles from '@/global.less';

const FormItem = Form.Item;

@connect(({ member, loading }) => ({
  member,
  loading: loading.effects['member/get'],
}))
@Form.create()
class MemberEditModal extends PureComponent {
  uniqueValid = (field, fieldValues, callback) => {
    const { values, dispatch } = this.props;
    if (fieldValues && fieldValues.length > 0) {
      const payload = { userId: values.userId };
      payload[field] = fieldValues;
      dispatch({
        type: 'member/validate',
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
      let type = 'member/add';
      if (values.userId) {
        type = 'member/update';
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

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      title,
      values,
      width,
    } = this.props;
    const me = this;
    return (
      <Modal
        width={width || 1024}
        maskClosable={false}
        title={title || '编辑'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <Row gutter={8}>
            <Col span={24} className={styles.hidden}>
              <FormItem {...formItemLayout} label="userId">
                {getFieldDecorator('userId', {
                  initialValue: values.userId,
                })(<Input placeholder="系统自动生成无需编辑" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="员工名称">
                {getFieldDecorator('userName', {
                  initialValue: values.userName,
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '员工名称不能为空!' },
                    {
                      validator(rule, fieldValues, callback) {
                        me.uniqueValid('userName', fieldValues, callback);
                      },
                    },
                  ],
                })(<Input placeholder="请输入员工名称" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="密码">
                {getFieldDecorator('pwd', {
                  initialValue: values.pwd,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '密码不能为空!' }],
                })(<Input placeholder="请输入密码" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="联系邮箱">
                {getFieldDecorator('email', {
                  initialValue: values.email,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '联系邮箱不能为空!' }],
                })(<Input placeholder="请输入联系邮箱" />)}
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
              <FormItem {...formItemLayout} label="入职时间">
                {getFieldDecorator('hiredate', {
                  initialValue: values.hiredate,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '入职时间不能为空!' }],
                })(<Input placeholder="请输入入职时间" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default MemberEditModal;
