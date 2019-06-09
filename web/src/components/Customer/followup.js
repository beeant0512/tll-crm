import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Form, Row, Col, Input, Modal, DatePicker } from 'antd';
import { formItemLayout } from '@/utils/styles';
import styles from '@/global.less';
import GroupSelect from '@/components/Groups/select';
import Customerfollowup from '@/components/Customerfollowup';
import { getTableFilter } from '@/utils/xsutils';

const FormItem = Form.Item;

@connect(({ customerFollowUp, loading }) => ({
  customerFollowUp,
  loading: loading.effects['customerFollowUp/get'],
  fetchLoading: loading.effects['customerFollowUp/fetch'],
}))
@Form.create()
class CustomerfollowupEditModal extends Component {
  state = {
    tableParams: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customerFollowUp/fetch',
    });
  }

  handleRefreshTable = () => {
    const { dispatch } = this.props;
    const { tableParams } = this.state;
    dispatch({
      type: 'customerFollowUp/fetch',
      payload: { ...tableParams },
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const params = getTableFilter(pagination, filtersArg, sorter, formValues);
    this.setState({
      tableParams: { ...pagination, ...filtersArg, ...sorter },
    });

    dispatch({
      type: 'customerFollowUp/fetch',
      payload: params,
    });
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  handleOk = () => {
    const { form, dispatch } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      let type = 'customerFollowUp/add';
      if (fieldsValue.id) {
        type = 'customerFollowUp/update';
      }
      const values = {
        ...fieldsValue,
        followUpDate: fieldsValue.followUpDate.format('YYYY-MM-DD'),
        nextTime: fieldsValue.nextTime.format('YYYY-MM-DD'),
        settingTime: fieldsValue.settingTime.format('YYYY-MM-DD'),
      };
      dispatch({
        type,
        payload: values,
        callback: response => {
          if (response.success) {
            form.resetFields();
            this.handleRefreshTable();
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
      customerFollowUp: { data },
      fetchLoading,
    } = this.props;
    return (
      <Modal
        centered
        width={width || 1024}
        maskClosable={false}
        title={title || '编辑'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Row>
          <Col span={12}>
            <Card bordered={false}>
              <Form>
                <Row gutter={8}>
                  <Col span={24} className={styles.hidden}>
                    <FormItem {...formItemLayout} label="id">
                      {getFieldDecorator('id', {
                        initialValue: values.id,
                      })(<Input placeholder="系统自动生成无需编辑" />)}
                    </FormItem>
                  </Col>
                  <Col span={24} className={styles.hidden}>
                    <FormItem {...formItemLayout} label="customerId">
                      {getFieldDecorator('customerId', {
                        initialValue: values.customerId,
                      })(<Input placeholder="系统自动生成无需编辑" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="联系人">
                      {getFieldDecorator('contactName', {
                        validateTrigger: 'onBlur',
                        rules: [{ required: true, message: '联系人不能为空!' }],
                      })(<Input placeholder="请输入联系人" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="联系人方式">
                      {getFieldDecorator('contactMobile', {
                        validateTrigger: 'onBlur',
                        rules: [{ required: true, message: '联系人方式不能为空!' }],
                      })(<Input placeholder="请输入联系人方式" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="跟进时间">
                      {getFieldDecorator('followUpDate', {
                        rules: [{ type: 'object', required: true, message: '跟进时间!' }],
                      })(<DatePicker style={{ width: '100%' }} placeholder="请输入跟进时间" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="跟进方式">
                      {getFieldDecorator('followUpType', {
                        validateTrigger: 'onBlur',
                        rules: [{ required: true, message: '跟进方式不能为空!' }],
                      })(<GroupSelect type="followup" placeholder="请输入选择跟进方式" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="跟进结果">
                      {getFieldDecorator('followUpResult', {
                        validateTrigger: 'onBlur',
                        rules: [{ required: true, message: '跟进结果不能为空!' }],
                      })(<Input placeholder="请输入跟进结果" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="下次跟进时间">
                      {getFieldDecorator('nextTime', {
                        rules: [
                          { type: 'object', required: true, message: '下次跟进时间不能为空!' },
                        ],
                      })(<DatePicker style={{ width: '100%' }} placeholder="请输入下次跟进时间" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="客户等级">
                      {getFieldDecorator('level', {
                        validateTrigger: 'onBlur',
                        rules: [{ required: true, message: '客户等级不能为空!' }],
                      })(<GroupSelect type="level" placeholder="请输入客户等级" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemLayout} label="预计入驻时间">
                      {getFieldDecorator('settingTime', {
                        rules: [
                          { type: 'object', required: true, message: '预计入驻时间不能为空!' },
                        ],
                      })(<DatePicker style={{ width: '100%' }} placeholder="请输入预计入驻时间" />)}
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Customerfollowup
                loading={fetchLoading}
                data={data}
                onChange={this.handleStandardTableChange}
                onDelete={this.handleTableDelete}
              />
            </Card>
          </Col>
        </Row>
      </Modal>
    );
  }
}
export default CustomerfollowupEditModal;
