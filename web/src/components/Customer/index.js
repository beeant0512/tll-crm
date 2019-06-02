import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Divider, Popconfirm } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import StandardTable from '@/components/StandardTable';
import CustomerViewModal from './view';
import CustomerEditModal from './edit';

import { width } from '@/utils/styles';

const { idWorker, time, action: actionWidth } = width;


@connect(({ customer, loading }) => ({
  customer,
  loading: loading.effects['customer/fetch'],
}))
class CustomerTable extends PureComponent {
  state = {
    values: null,
    viewModalVisible: false,
    editModalVisible: false,
  };

  onView = record => {
    const { onView } = this.props;
    if (onView) {
      onView(record, this);
    } else {
      this.setState({
        viewModalVisible: true,
        values: record,
      });
    }
  };

  onEdit = record => {
    const { onEdit } = this.props;
    if (onEdit) {
      onEdit(record, this);
    } else {
      this.setState({
        editModalVisible: true,
        values: record,
      });
    }
  };

  onDelete = record => {
    const { onDelete, dispatch } = this.props;
    dispatch({
      type: 'customer/remove',
      payload: {
        id: record.id,
      },
      callback: response => {
        if (response.success && onDelete) {
          onDelete(record);
        }
      },
    });
  };

  hideModal = (key, refresh = false) => {
    const { refreshTable } = this.props;
    const state = {};
    state[key] = false;
    this.setState(state);
    if (refreshTable && refresh) {
      refreshTable();
    }
  };

  render() {
    const { data, loading, action, selectedRows, onChange } = this.props;
    const { viewModalVisible, editModalVisible, values } = this.state;
    const columns = [];
    if (action) {
      Object.assign(action, { key: 'action' });
      columns.push(action);
    } else {
      columns.push({
        key: 'action',
        title: '操作',
        width: 3 * actionWidth,
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.onView(record)}>详情</a>
            <Divider type="vertical" />
            <a onClick={() => this.onEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确认删除吗?" onConfirm={() => this.onDelete(record)}>
              <a href="#">删除</a>
            </Popconfirm>
          </Fragment>
        ),
      });
    }


    const defaultColumns = [
      { 'dataIndex': 'customerId', 'sorter': false, 'title': '客户编号', 'type': 0, 'width': idWorker },
      {
        'dataIndex': 'customerName',
        'sorter': false,
        'title': '公司名称',
        'type': 0,
        render: text => <Ellipsis tooltip length={10}>{text}</Ellipsis>,
      },
      { 'dataIndex': 'createAt', 'sorter': false, 'title': '录入时间', 'type': 0, 'width': time },
    ];
    columns.push(...defaultColumns);

    return (
      <Fragment>
        <StandardTable
          selectedRows={selectedRows}
          loading={loading}
          data={data}
          rowKey="customerId"
          columns={columns}
          onSelectRow={this.handleSelectRows}
          onChange={onChange}
        />
        {viewModalVisible && (
          <CustomerViewModal
            visible={viewModalVisible}
            values={values}
            onOk={() => this.hideModal('viewModalVisible', true)}
            onCancel={() => this.hideModal('viewModalVisible', false)}
          />
        )}
        {editModalVisible && (
          <CustomerEditModal
            visible={editModalVisible}
            values={values}
            onOk={() => this.hideModal('editModalVisible', true)}
            onCancel={() => this.hideModal('editModalVisible', false)}
          />
        )}
      </Fragment>
    );
  }
}

export default CustomerTable;
