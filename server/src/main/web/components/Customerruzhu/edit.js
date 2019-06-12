import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Row, Col, Input, Modal } from 'antd';
import { formItemLayout } from '@/utils/styles';
import styles from '@/global.less';

const FormItem = Form.Item;

@connect(({ customerRuzhu, loading }) => ({
  customerRuzhu,
  loading: loading.effects['customerRuzhu/get'],
}))
@Form.create()
class CustomerruzhuEditModal extends PureComponent {
  uniqueValid = (field, fieldValues, callback) => {
    const { values, dispatch } = this.props;
    if (fieldValues && fieldValues.length > 0) {
      const payload = { ruzhuId: values.ruzhuId };
      payload[field] = fieldValues;
      dispatch({
        type: 'customerRuzhu/validate',
        payload,
        callback: (response) => {
          if (!response.success) {
            callback(response.msg);
          } else {
            callback();
          }
        },
      });
    } else {
      callback();
    }
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  handleOk = () => {
    const { onOk, form, dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let type = 'customerRuzhu/add';
      if (values.ruzhuId) {
        type = 'customerRuzhu/update';
      }
      dispatch({
        type,
        payload: values,
        callback: (response) => {
          if (response.success) {
            onOk(response.data);
          }
        },
      });
    });
  };

  render() {
    const { form: { getFieldDecorator }, visible, title, values, width } = this.props;
    const me = this;
    return (
      <Modal
        width={width || 800}
        maskClosable={false}
        title={title || '编辑'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form>
          <Row gutter={8}>
            <Col span={24} className={styles.hidden}>
              <FormItem
                {...formItemLayout}
                label="ruzhuId"
              >{getFieldDecorator('ruzhuId', {
                initialValue: values.ruzhuId,
              })(<Input placeholder="系统自动生成无需编辑" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="客户ID"
              >{getFieldDecorator('customerId', {
                initialValue: values.customerId,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '客户ID不能为空!' }
                ],
              })(<Input placeholder="请输入客户ID" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="入驻园区"
              >{getFieldDecorator('yuanqu', {
                initialValue: values.yuanqu,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '入驻园区不能为空!' }
                ],
              })(<Input placeholder="请输入入驻园区" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="入驻企业名称"
              >{getFieldDecorator('companyName', {
                initialValue: values.companyName,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '入驻企业名称不能为空!' }, {
                  validator(rule, fieldValues, callback) {
                    me.uniqueValid('companyName', fieldValues, callback);
                  }},

                ],
              })(<Input placeholder="请输入入驻企业名称" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="母公司"
              >{getFieldDecorator('mainCompany', {
                initialValue: values.mainCompany,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '母公司不能为空!' }
                ],
              })(<Input placeholder="请输入母公司" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="招商人员"
              >{getFieldDecorator('zhaoShang', {
                initialValue: values.zhaoShang,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '招商人员不能为空!' }
                ],
              })(<Input placeholder="请输入招商人员" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="法人姓名"
              >{getFieldDecorator('faRen', {
                initialValue: values.faRen,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '法人姓名不能为空!' }
                ],
              })(<Input placeholder="请输入法人姓名" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="法人身份证号码"
              >{getFieldDecorator('faRenIdcard', {
                initialValue: values.faRenIdcard,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '法人身份证号码不能为空!' }
                ],
              })(<Input placeholder="请输入法人身份证号码" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="法人电话"
              >{getFieldDecorator('faRenMobile', {
                initialValue: values.faRenMobile,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '法人电话不能为空!' }
                ],
              })(<Input placeholder="请输入法人电话" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="注册资金（万元）"
              >{getFieldDecorator('registeredCapital', {
                initialValue: values.registeredCapital,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '注册资金（万元）不能为空!' }
                ],
              })(<Input placeholder="请输入注册资金（万元）" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="投资比例（如比例不为100%，请完善其他投资者信息）"
              >{getFieldDecorator('investment', {
                initialValue: values.investment,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '投资比例（如比例不为100%，请完善其他投资者信息）不能为空!' }
                ],
              })(<Input placeholder="请输入投资比例（如比例不为100%，请完善其他投资者信息）" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="对接人姓名"
              >{getFieldDecorator('duiJieRen', {
                initialValue: values.duiJieRen,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '对接人姓名不能为空!' }
                ],
              })(<Input placeholder="请输入对接人姓名" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="对接人电话"
              >{getFieldDecorator('duiJieRenMobile', {
                initialValue: values.duiJieRenMobile,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '对接人电话不能为空!' }
                ],
              })(<Input placeholder="请输入对接人电话" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="代账或财务姓名"
              >{getFieldDecorator('financialName', {
                initialValue: values.financialName,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '代账或财务姓名不能为空!' }
                ],
              })(<Input placeholder="请输入代账或财务姓名" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="代账或财务电话"
              >{getFieldDecorator('financialMobile', {
                initialValue: values.financialMobile,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '代账或财务电话不能为空!' }
                ],
              })(<Input placeholder="请输入代账或财务电话" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="网上税务局账号"
              >{getFieldDecorator('suiwuAccount', {
                initialValue: values.suiwuAccount,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '网上税务局账号不能为空!' }
                ],
              })(<Input placeholder="请输入网上税务局账号" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="网上税务局密码"
              >{getFieldDecorator('suiwuPassword', {
                initialValue: values.suiwuPassword,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '网上税务局密码不能为空!' }
                ],
              })(<Input placeholder="请输入网上税务局密码" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="个人所得税APP账号"
              >{getFieldDecorator('appAccount', {
                initialValue: values.appAccount,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '个人所得税APP账号不能为空!' }
                ],
              })(<Input placeholder="请输入个人所得税APP账号" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="个人所得税APP密码"
              >{getFieldDecorator('appPassword', {
                initialValue: values.appPassword,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '个人所得税APP密码不能为空!' }
                ],
              })(<Input placeholder="请输入个人所得税APP密码" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="开票品目（主行业）"
              >{getFieldDecorator('kaipiaoType', {
                initialValue: values.kaipiaoType,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '开票品目（主行业）不能为空!' }
                ],
              })(<Input placeholder="请输入开票品目（主行业）" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="开户行"
              >{getFieldDecorator('kaiHuHang', {
                initialValue: values.kaiHuHang,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '开户行不能为空!' }
                ],
              })(<Input placeholder="请输入开户行" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="银行账号"
              >{getFieldDecorator('bankNumber', {
                initialValue: values.bankNumber,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '银行账号不能为空!' }
                ],
              })(<Input placeholder="请输入银行账号" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="是否已签订入驻协议"
              >{getFieldDecorator('agreement', {
                initialValue: values.agreement,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '是否已签订入驻协议不能为空!' }
                ],
              })(<Input placeholder="请输入是否已签订入驻协议" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="是否需要买盘"
              >{getFieldDecorator('maiPan', {
                initialValue: values.maiPan,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '是否需要买盘不能为空!' }
                ],
              })(<Input placeholder="请输入是否需要买盘" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="开具专票还是普票"
              >{getFieldDecorator('tickType', {
                initialValue: values.tickType,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '开具专票还是普票不能为空!' }
                ],
              })(<Input placeholder="请输入开具专票还是普票" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="目前进度"
              >{getFieldDecorator('status', {
                initialValue: values.status,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '目前进度不能为空!' }
                ],
              })(<Input placeholder="请输入目前进度" />)}
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label="附件"
              >{getFieldDecorator('attachment', {
                initialValue: values.attachment,
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '附件不能为空!' }
                ],
              })(<Input placeholder="请输入附件" />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}
export default CustomerruzhuEditModal;