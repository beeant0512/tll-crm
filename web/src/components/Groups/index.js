import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Divider, Popconfirm } from 'antd';
import BasicTable from '@/components/StandardTable';
import GroupsViewModal from './view';
import GroupsEditModal from './edit';

import { width } from '@/utils/styles';

const { action: actionWidth } = width;


@connect(({ groups, loading }) => ({
  groups,
  loading: loading.effects['groups/fetch'],
}))
class GroupsTable extends PureComponent {
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
      type: 'groups/remove',
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
      {"dataIndex": "itemId", "sorter": false, "title": "主键", "type": 0, "width": "100px"},
      {"dataIndex": "itemName", "sorter": false, "title": "分组名称", "type": 0, "width": "100px"},
      {"dataIndex": "itemCode", "sorter": false, "title": "分组编码", "type": 0, "width": "100px"},
    ];
    columns.push(...defaultColumns);

    return (
      <Fragment>
        <BasicTable
          selectedRows={selectedRows}
          loading={loading}
          data={data}
          rowKey="id"
          columns={columns}
          onSelectRow={this.handleSelectRows}
          onChange={onChange}
        />
        {viewModalVisible && (
          <GroupsViewModal
            visible={viewModalVisible}
            values={values}
            onOk={() => this.hideModal('viewModalVisible', true)}
            onCancel={() => this.hideModal('viewModalVisible', false)}
          />
        )}
        {editModalVisible && (
          <GroupsEditModal
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

export default GroupsTable;
