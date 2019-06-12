import React, { PureComponent } from 'react';
import { Card, Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

class CustomerruzhuViewModal extends PureComponent {
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
            <Description style={{ wordBreak: 'break-word' }} term="ID">{values.ruzhuId || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="客户ID">{values.customerId || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="入驻园区">{values.yuanqu || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="入驻企业名称">{values.companyName || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="母公司">{values.mainCompany || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="招商人员">{values.zhaoShang || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="法人姓名">{values.faRen || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="法人身份证号码">{values.faRenIdcard || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="法人电话">{values.faRenMobile || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="注册资金（万元）">{values.registeredCapital || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="投资比例（如比例不为100%，请完善其他投资者信息）">{values.investment || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="对接人姓名">{values.duiJieRen || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="对接人电话">{values.duiJieRenMobile || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="代账或财务姓名">{values.financialName || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="代账或财务电话">{values.financialMobile || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="网上税务局账号">{values.suiwuAccount || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="网上税务局密码">{values.suiwuPassword || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="个人所得税APP账号">{values.appAccount || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="个人所得税APP密码">{values.appPassword || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="开票品目（主行业）">{values.kaipiaoType || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="开户行">{values.kaiHuHang || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="银行账号">{values.bankNumber || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="是否已签订入驻协议">{values.agreement || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="是否需要买盘">{values.maiPan || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="开具专票还是普票">{values.tickType || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="目前进度">{values.status || '-'}</Description>
            <Description style={{ wordBreak: 'break-word' }} term="附件">{values.attachment || '-'}</Description>
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
export default CustomerruzhuViewModal;