import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Divider, Popconfirm } from 'antd';
import StandardTable from '@/components/StandardTable';
import CustomerfollowupViewModal from './view';

import { width } from '@/utils/styles';

const { time, action: actionWidth } = width;

@connect(({ customerFollowUp, loading }) => ({
  customerFollowUp,
  loading: loading.effects['customerFollowUp/fetch'],
}))
class CustomerfollowupTable extends PureComponent {
  state = {
    values: null,
    viewModalVisible: false,
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

  onDelete = record => {
    const { onDelete, dispatch } = this.props;
    dispatch({
      type: 'customerFollowUp/remove',
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
    const { viewModalVisible, values } = this.state;
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
            <Popconfirm title="确认删除吗?" onConfirm={() => this.onDelete(record)}>
              <a href="#">删除</a>
            </Popconfirm>
          </Fragment>
        ),
      });
    }

    const defaultColumns = [
      { dataIndex: 'createAt', sorter: false, title: '跟进时间', width: time },
    ];
    columns.push(...defaultColumns);

    return (
      <Fragment>
        <StandardTable
          selectedRows={selectedRows}
          loading={loading}
          data={data}
          rowKey="id"
          columns={columns}
          onSelectRow={this.handleSelectRows}
          onChange={onChange}
        />
        {viewModalVisible && (
          <CustomerfollowupViewModal
            visible={viewModalVisible}
            values={values}
            onOk={() => this.hideModal('viewModalVisible', true)}
            onCancel={() => this.hideModal('viewModalVisible', false)}
          />
        )}
      </Fragment>
    );
  }
}

export default CustomerfollowupTable;
