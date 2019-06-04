import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/styles';
import styles from '@/global.less';

const FormItem = Form.Item;

@connect(({ customerFollowUp, loading }) => ({
  customerFollowUp,
  loading: loading.effects['customerFollowUp/get'],
}))
@Form.create()
class CustomerfollowupEditModal extends PureComponent {
  uniqueValid = (field, fieldValues, callback) => {
    const { values, dispatch } = this.props;
    if (fieldValues && fieldValues.length > 0) {
      const payload = { id: values.id };
      payload[field] = fieldValues;
      dispatch({
        type: 'customerFollowUp/validate',
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
      let type = 'customerFollowUp/add';
      if (values.id) {
        type = 'customerFollowUp/update';
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
        width={width || 800}
        maskClosable={false}
        title={title || '编辑'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <Row gutter={8}>
            <Col span={24} className={styles.hidden}>
              <FormItem {...formItemLayout} label="id">
                {getFieldDecorator('id', {
                  initialValue: values.id,
                })(<Input placeholder="系统自动生成无需编辑" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="联系人">
                {getFieldDecorator('contactName', {
                  initialValue: values.contactName,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '联系人不能为空!' }],
                })(<Input placeholder="请输入联系人" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="联系人方式">
                {getFieldDecorator('contactMobile', {
                  initialValue: values.contactMobile,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '联系人方式不能为空!' }],
                })(<Input placeholder="请输入联系人方式" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="跟进时间">
                {getFieldDecorator('followUpDate', {
                  initialValue: values.followUpDate,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '跟进时间不能为空!' }],
                })(<Input placeholder="请输入跟进时间" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="跟进方式">
                {getFieldDecorator('followUpType', {
                  initialValue: values.followUpType,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '跟进方式不能为空!' }],
                })(<Input placeholder="请输入跟进方式" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="跟进结果">
                {getFieldDecorator('followUpResult', {
                  initialValue: values.followUpResult,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '跟进结果不能为空!' }],
                })(<Input placeholder="请输入跟进结果" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="下次跟进时间">
                {getFieldDecorator('nextTime', {
                  initialValue: values.nextTime,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '下次跟进时间不能为空!' }],
                })(<Input placeholder="请输入下次跟进时间" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="客户等级">
                {getFieldDecorator('level', {
                  initialValue: values.level,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '客户等级不能为空!' }],
                })(<Input placeholder="请输入客户等级" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="预计入驻时间">
                {getFieldDecorator('settingTime', {
                  initialValue: values.settingTime,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '预计入驻时间不能为空!' }],
                })(<Input placeholder="请输入预计入驻时间" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default CustomerfollowupEditModal;
