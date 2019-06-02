import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Input, Button, Form, Card, Icon, Row, Col } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MemberTable from '@/components/Member';
import MemberEditModal from '@/components/Member/edit';
import { getTableFilter, toggleForm } from '@/utils/xsutils';

import styles from '@/global.less';

const FormItem = Form.Item;

@connect(({ member, loading }) => ({
  member,
  loading: loading.effects['member/fetch'],
}))
@Form.create()
class MemberList extends PureComponent {
  state = {
    selectedRows: [],
    formValues: {},
    tableParams: {},
    addModalVisible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'member/fetch',
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
        type: 'member/fetch',
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
      type: 'member/fetch',
      payload: {current: 1, pageSize},
    });
  };

  handleRefreshTable = () => {
    const { dispatch } = this.props;
    const { tableParams, formValues } = this.state;
    dispatch({
      type: 'member/fetch',
      payload: { ...tableParams, ...formValues },
    });
  };

  handleTableDelete = () => {
    const { dispatch } = this.props;
    const { tableParams, formValues } = this.state;
    const{pageSize} = tableParams;
    dispatch({
      type: 'member/fetch',
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
      type: 'member/fetch',
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
            <FormItem label="员工名称">
              {getFieldDecorator('userName')(
                <Input placeholder="请输入员工名称" />
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

  renderForm() {
    return this.renderSimpleForm();
  }

  render() {
    const { member: { data }, loading } = this.props;
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
            <MemberTable
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
            <MemberEditModal
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
export default MemberList;
