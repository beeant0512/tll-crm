import React, { PureComponent } from 'react';
import { Card, Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

class CustomerViewModal extends PureComponent {
  render() {
    const { visible, onOk, onCancel, values, width, title } = this.props;
    return (
      <Modal
        width={width || 800}
        title={title || "详情"}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Card bordered={false}>
          <DescriptionList size="small" col={2}>
            <Description style={{ wordBreak: 'break-word' }} term="客户编号">{values.customerId || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="公司名称">{values.customerName || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="联系地址">{values.address || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="所属行业">{values.industry || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="联系人职务">{values.contactDuties || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="联系人">{values.contactName || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="联系人方式">{values.contactMobile || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="客户来源">{values.source || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="录入时间">{values.createAt || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="录入人ID">{values.createBy || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="更新时间">{values.updateAt || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="更新人ID">{values.updateBy || '-'}</Description>
          </DescriptionList>
        </Card>
      </Modal>
    );
  }
}
export default CustomerViewModal;