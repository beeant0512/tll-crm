import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Button, Form, Card, Icon, Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import CustomerTable from '@/components/Customer';
import CustomerEditModal from '@/components/Customer/edit';
import { getTableFilter, toggleForm } from '@/utils/xsutils';

import styles from '@/global.less';

const FormItem = Form.Item;

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.effects['customer/fetch'],
}))
@Form.create()
class CustomerList extends PureComponent {
  state = {
    expandForm: false,
    selectedRows: [],
    formValues: {},
    tableParams: {},
    addModalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/fetch',
    });
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    const { tableParams } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };

      this.setState({
        formValues: values,
      });

      const{ pageSize = 10 } = tableParams;
      dispatch({
        type: 'customer/fetch',
        payload: { pageSize, ...values },
      });
    });
  };

  handleModalVisible = (flag) => {
    this.setState({
      addModalVisible: flag,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    const {
      tableParams: { pageSize = 10 },
    } = this.state;
    form.resetFields();
    this.setState({
      formValues: {current: 1, pageSize},
    });
    dispatch({
      type: 'customer/fetch',
      payload: {current: 1, pageSize},
    });
  };

  handleRefreshTable = () => {
    const { dispatch } = this.props;
    const { tableParams, formValues } = this.state;
    dispatch({
      type: 'customer/fetch',
      payload: { ...tableParams, ...formValues },
    });
  };

  handleTableDelete = () => {
    const { dispatch } = this.props;
    const { tableParams, formValues } = this.state;
    const{pageSize} = tableParams;
    dispatch({
      type: 'customer/fetch',
      payload: { pageSize, ...formValues },
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
      type: 'customer/fetch',
      payload: params,
    });
  };

  handleModalOk = () => {
    this.setState({ addModalVisible: false });
    this.handleFormReset();
  };

  renderSimpleForm() {
    const { form: { getFieldDecorator }} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <FormItem label="公司名称">
              {getFieldDecorator('customerName')(
                <Input placeholder="请输入公司名称" />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <FormItem label="所属行业">
              {getFieldDecorator('industry')(
                <Input placeholder="请输入所属行业" />
              )}
            </FormItem>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={() => toggleForm(this)}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  renderAdvancedForm() {
    const { form: { getFieldDecorator }} = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col xs={24} sm={24} md={8} lg={8}>
            <FormItem label="客户来源">
              {getFieldDecorator('source')(
                <Input placeholder="请输入客户来源" />
              )}
            </FormItem>
          </Col>

        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={() => toggleForm(this)}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    );
  };

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { customer: { data }, loading } = this.props;
    const { selectedRows, addModalVisible } = this.state;

    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>
              {this.renderForm()}
            </div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <CustomerTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              onDelete={this.handleTableDelete}
              refreshTable={this.handleRefreshTable}
            />
          </div>
        </Card>

        {
          addModalVisible &&
            (
            <CustomerEditModal
              title="新增"
              visible={addModalVisible}
              values={{}}
              onOk={this.handleModalOk}
              onCancel={() => this.handleModalVisible(false)}
            />
            )
        }
      </PageHeaderWrapper>
    );
  }

}
export default CustomerList;
