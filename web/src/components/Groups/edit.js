import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Select, Modal } from 'antd';
import { formItemLayout } from '@/utils/styles';
import styles from '@/global.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ groups, loading }) => ({
  groups,
  loading: loading.effects['groups/get'],
}))
@Form.create()
class GroupsEditModal extends PureComponent {
  uniqueValid = (field, fieldValues, callback) => {
    const { values, dispatch } = this.props;
    if (fieldValues && fieldValues.length > 0) {
      const payload = { itemId: values.itemId };
      payload[field] = fieldValues;
      dispatch({
        type: 'groups/validate',
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
      let type = 'groups/add';
      if (values.itemId) {
        type = 'groups/update';
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
              <FormItem {...formItemLayout} label="itemId">
                {getFieldDecorator('itemId', {
                  initialValue: values.itemId,
                })(<Input placeholder="系统自动生成无需编辑" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="分组类别">
                {getFieldDecorator('type', {
                  initialValue: values.type,
                  validateTrigger: 'onBlur',
                  rules: [{ required: true, message: '分组类别名称不能为空!' }],
                })(
                  <Select>
                    <Option value="laiyuan">客户来源</Option>
                    <Option value="hangye">所属行业</Option>
                    <Option value="level">客户等级</Option>
                    <Option value="followup">客户跟进方式</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="分组编码">
                {getFieldDecorator('itemCode', {
                  initialValue: values.itemCode,
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '分组编码不能为空!' },
                    {
                      validator(rule, fieldValues, callback) {
                        me.uniqueValid('itemCode', fieldValues, callback);
                      },
                    },
                  ],
                })(<Input placeholder="请输入分组编码" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem {...formItemLayout} label="分组名称">
                {getFieldDecorator('itemName', {
                  initialValue: values.itemName,
                  validateTrigger: 'onBlur',
                  rules: [
                    { required: true, message: '分组名称不能为空!' },
                    {
                      validator(rule, fieldValues, callback) {
                        me.uniqueValid('itemName', fieldValues, callback);
                      },
                    },
                  ],
                })(<Input placeholder="请输入分组名称" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default GroupsEditModal;
