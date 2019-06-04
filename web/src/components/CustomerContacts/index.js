import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

class CustomerContactsInput extends Component {
  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      contactDuties: value.contactDuties,
      contactName: value.contactName,
      contactMobile: value.contactMobile,
    };
  }

  handleFieldChange = (field, e) => {
    if (!('value' in this.props)) {
      this.setState({ [field]: e.target.value });
    }
    this.triggerChange({ [field]: e.target.value });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { size } = this.props;
    const { contactDuties, contactName, contactMobile } = this.state;
    return (
      <span>
        <Input
          type="text"
          size={size}
          value={contactDuties}
          onChange={e => this.handleFieldChange('contactDuties', e)}
          style={{ width: '30%', marginRight: '1%' }}
          placeholder="职务"
        />
        <Input
          type="text"
          size={size}
          value={contactName}
          onChange={e => this.handleFieldChange('contactName', e)}
          style={{ width: '30%', marginRight: '1%' }}
          placeholder="姓名"
        />
        <Input
          type="text"
          size={size}
          value={contactMobile}
          onChange={e => this.handleFieldChange('contactMobile', e)}
          style={{ width: '30%' }}
          placeholder="联系方式"
        />
      </span>
    );
  }
}

export default CustomerContactsInput;
