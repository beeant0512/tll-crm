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
      dispatch({
        type:  'member/changePwd',
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
              <FormItem {...formItemLayout} label="密码">
                {getFieldDecorator('pwd', {
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '密码不能为空!' }],
                })(<Input placeholder="请输入密码" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default MemberEditModal;
