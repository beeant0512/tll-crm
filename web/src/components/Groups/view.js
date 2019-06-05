import React, { PureComponent } from 'react';
import { Card, Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

class GroupsViewModal extends PureComponent {
  render() {
    const { visible, onOk, onCancel, values, width, title } = this.props;
    return (
      <Modal
        width={width || 1024}
        title={title || '详情'}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Card bordered={false}>
          <DescriptionList size="small" col={2}>
            <Description style={{ wordBreak: 'break-word' }} term="主键">
              {values.itemId || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="分组名称">
              {values.itemName || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="分组编码">
              {values.itemCode || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="分组类型">
              {values.type || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="创建时间">
              {values.createAt || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="创建人ID">
              {values.createBy || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="更新时间">
              {values.updateAt || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="更新人ID">
              {values.updateBy || '-'}
            </Description>
          </DescriptionList>
        </Card>
      </Modal>
    );
  }
}
export default GroupsViewModal;
