import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Divider, Popconfirm } from 'antd';
import BasicTable from '@/components/StandardTable';
import MemberViewModal from './view';
import MemberPasswordModal from './password';
import MemberLiZhiModal from './lizhi';

import { width } from '@/utils/styles';

const { action: actionWidth } = width;


@connect(({ member, loading }) => ({
  member,
  loading: loading.effects['member/fetch'],
}))
class MemberTable extends PureComponent {
  state = {
    values: null,
    viewModalVisible: false,
    editModalVisible: false,
    liZhiModalVisible: false,
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

  onLiZhi = record => {
    this.setState({
      liZhiModalVisible: true,
      values: record,
    });
  };

  onDelete = record => {
    const { onDelete, dispatch } = this.props;
    dispatch({
      type: 'member/remove',
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
    const { viewModalVisible, editModalVisible, liZhiModalVisible, values } = this.state;
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
            <a onClick={() => this.onEdit(record)}>重置密码</a>
            <Divider type="vertical" />
            <a onClick={() => this.onLiZhi(record)}>离职</a>
          </Fragment>
        ),
      });
    }


    const defaultColumns = [
      {"dataIndex": "userName", "sorter": false, "title": "员工名称", "type": 0, "width": "100px"},
      {"dataIndex": "hiredate", "sorter": false, "title": "入职时间", "type": 0, "width": "100px"},
    ];
    columns.push(...defaultColumns);

    return (
      <Fragment>
        <BasicTable
          selectedRows={selectedRows}
          loading={loading}
          data={data}
          rowKey="userId"
          columns={columns}
          onSelectRow={this.handleSelectRows}
          onChange={onChange}
        />
        {viewModalVisible && (
          <MemberViewModal
            visible={viewModalVisible}
            values={values}
            onOk={() => this.hideModal('viewModalVisible', true)}
            onCancel={() => this.hideModal('viewModalVisible', false)}
          />
        )}
        {editModalVisible && (
          <MemberPasswordModal
            visible={editModalVisible}
            values={values}
            onOk={() => this.hideModal('editModalVisible', true)}
            onCancel={() => this.hideModal('editModalVisible', false)}
          />
        )}
        {liZhiModalVisible && (
          <MemberLiZhiModal
            visible={liZhiModalVisible}
            values={values}
            onOk={() => this.hideModal('liZhiModalVisible', true)}
            onCancel={() => this.hideModal('liZhiModalVisible', false)}
          />
        )}
      </Fragment>
    );
  }
}

export default MemberTable;
