import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/styles';
import styles from '@/global.less';
import GroupSelect from '@/components/Groups/select';

const FormItem = Form.Item;

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
        callback: (response) => {
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
        callback: (response) => {
          if (response.success) {
            onOk(response.data);
          }
        },
      });
    });
  };

  render() {
    const { form: { getFieldDecorator }, visible, title, values, width } = this.props;
    const me = this;
    return (
      <Modal
        width={width || 800}
        maskClosable={false}
        title={title || `编辑: ${values.customerName}`}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <Row gutter={8}>
            <Col span={24} className={styles.hidden}>
              <FormItem
                {...formItemLayout}
                label="customerId"
              >{getFieldDecorator('customerId', {
                initialValue: values.customerId,
              })(<Input placeholder="系统自动生成无需编辑" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="公司名称"
              >{getFieldDecorator('customerName', {
                initialValue: values.customerName,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '公司名称不能为空!' }, {
                  validator(rule, fieldValues, callback) {
                    me.uniqueValid('customerName', fieldValues, callback);
                  }},

                ],
              })(<Input placeholder="请输入公司名称" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="联系地址"
              >{getFieldDecorator('address', {
                initialValue: values.address,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '联系地址不能为空!' }
                ],
              })(<Input placeholder="请输入联系地址" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="所属行业"
              >{getFieldDecorator('industry', {
                initialValue: values.industry,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '所属行业不能为空!' }
                ],
              })(
                <GroupSelect type="hangye" />
              )}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="联系人职务"
              >{getFieldDecorator('contactDuties', {
                initialValue: values.contactDuties,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '联系人职务不能为空!' }
                ],
              })(<Input placeholder="请输入联系人职务" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="联系人"
              >{getFieldDecorator('contactName', {
                initialValue: values.contactName,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '联系人不能为空!' }
                ],
              })(<Input placeholder="请输入联系人" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="联系人方式"
              >{getFieldDecorator('contactMobile', {
                initialValue: values.contactMobile,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '联系人方式不能为空!' }
                ],
              })(<Input placeholder="请输入联系人方式" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="客户来源"
              >{getFieldDecorator('source', {
                initialValue: values.source,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '客户来源不能为空!' }
                ],
              })(
                <GroupSelect type="laiyuan" />
              )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default CustomerEditModal;
