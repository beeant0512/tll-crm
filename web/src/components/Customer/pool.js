import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { message, Popconfirm } from 'antd';
import Ellipsis from '@/components/Ellipsis';
import StandardTable from '@/components/StandardTable';
import CustomerViewModal from './view';
import CustomerEditModal from './edit';
import FollowupEditModal from './followup';

import { width } from '@/utils/styles';

const { idWorker, time, action: actionWidth } = width;

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.effects['customer/fetch'],
}))
class CustomerTable extends PureComponent {
  state = {
    values: null,
  };

  onLingQu = record => {
    const { dispatch, refreshTable } = this.props;
    dispatch({
      type: 'customer/lingqu',
      payload: {
        customerId: record.customerId,
      },
      callback: response => {
        if (response.success ) {
          message.info('领取成功');
        } else {
          message.error(response.msg);
        }
        refreshTable();
      },
    });
  };

  render() {
    const { data, loading, action, selectedRows, onChange } = this.props;
    const { viewModalVisible, editModalVisible, followModalVisible, values } = this.state;
    const columns = [];
    if (action) {
      Object.assign(action, { key: 'action' });
      columns.push(action);
    } else {
      columns.push({
        key: 'action',
        title: '操作',
        width: 1 * actionWidth,
        render: (text, record) => (
          <Fragment>
            <Popconfirm title="确认领取吗?" onConfirm={() => this.onLingQu(record)}>
              <a href="#">领取</a>
            </Popconfirm>
          </Fragment>
        ),
      });
    }

    const defaultColumns = [
      { dataIndex: 'customerId', sorter: false, title: '客户编号', type: 0, width: idWorker },
      {
        dataIndex: 'customerName',
        sorter: false,
        title: '公司名称',
        type: 0,
        render: text => (
          <Ellipsis tooltip length={10}>
            {text}
          </Ellipsis>
        ),
      },
      { dataIndex: 'createAt', sorter: false, title: '录入时间', type: 0, width: time },
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
        {followModalVisible && (
          <FollowupEditModal
            visible={followModalVisible}
            values={values}
            onOk={() => this.hideModal('followModalVisible', true)}
            onCancel={() => this.hideModal('followModalVisible', false)}
          />
        )}
      </Fragment>
    );
  }
}

export default CustomerTable;
