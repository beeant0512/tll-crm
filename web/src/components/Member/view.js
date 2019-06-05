import React, { PureComponent } from 'react';
import { Card, Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

class MemberViewModal extends PureComponent {
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
            <Description style={{ wordBreak: 'break-word' }} term="员工ID">
              {values.userId || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="员工名称">
              {values.userName || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="密码">
              {values.pwd || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="联系邮箱">
              {values.email || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="联系地址">
              {values.address || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="入职时间">
              {values.hiredate || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="是否管理员 0 否 1 是">
              {values.isAdmin || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="录入时间">
              {values.createAt || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="录入人ID">
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
export default MemberViewModal;
