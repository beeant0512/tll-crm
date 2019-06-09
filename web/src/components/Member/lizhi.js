import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Modal, DatePicker } from 'antd';
import { formItemLayout } from '@/utils/styles';
import styles from '@/global.less';

const FormItem = Form.Item;

@connect(({ member, loading }) => ({
  member,
  loading: loading.effects['member/get'],
}))
@Form.create()
class MemberEditModal extends Component {
  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  handleOk = () => {
    const { onOk, form, dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        leaving: fieldsValue.leaving.format('YYYY-MM-DD'),
      };
      dispatch({
        type: 'member/lizhi',
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
    return (
      <Modal
        width={width || 1024}
        maskClosable={false}
        title={title || '编辑'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Row gutter={8}>
          <Form>
            <Col span={24} className={styles.hidden}>
              <FormItem {...formItemLayout} label="userId">
                {getFieldDecorator('userId', {
                    initialValue: values.userId,
                  })(<Input placeholder="系统自动生成无需编辑" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="离职时间">
                {getFieldDecorator('leaving', {
                    rules: [{ type: 'object', required: true, message: '离职时间不能为空!' }],
                  })(<DatePicker style={{ width: '100%' }} placeholder="请输入离职时间" />)}
              </FormItem>
            </Col>
          </Form>
        </Row>
      </Modal>
    );
  }
}
export default MemberEditModal;
