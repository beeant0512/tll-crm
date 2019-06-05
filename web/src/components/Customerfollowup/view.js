import React, { PureComponent } from 'react';
import { Card, Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

class CustomerfollowupViewModal extends PureComponent {
  render() {
    const { visible, onOk, onCancel, values, width, title } = this.props;
    return (
      <Modal
        width={width || 800}
        title={title || '详情'}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Card bordered={false}>
          <DescriptionList size="small" col={2}>
            <Description style={{ wordBreak: 'break-word' }} term="ID">
              {values.id || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="客户ID">
              {values.customerId || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="联系人">
              {values.contactName || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="联系人方式">
              {values.contactMobile || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="跟进时间">
              {values.followUpDate || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="跟进方式">
              {values.followUpType || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="跟进结果">
              {values.followUpResult || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="下次跟进时间">
              {values.nextTime || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="客户等级">
              {values.level || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="预计入驻时间">
              {values.settingTime || '-'}
            </Description>
            <Description style={{ wordBreak: 'break-word' }} term="附件ID # 分割">
              {values.attachment || '-'}
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
export default CustomerfollowupViewModal;
