import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select } from 'antd';

const { Option } = Select;

@connect(({ groups, loading }) => ({
  groups,
  loading: loading.effects['groups/query'],
}))
class GroupsSelect extends PureComponent {
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
    this.state = {
      type: props.type,
      defaultValue: props.value,
      data: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { type } = this.state;
    dispatch({
      type: 'groups/fetch',
      payload: { type },
      callback: response =>
        this.setState({
          data: response.data && response.data.list,
        }),
    });
  }

  handleSelectChange = value => {
    this.triggerChange(value);
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  renderOptions = () => {
    const { data } = this.state;
    if (undefined === data) {
      return null;
    }
    const options = data.map(item => (
      <Option key={item.itemId} value={item.itemId}>
        {item.itemName}
      </Option>
    ));
    return options;
  };

  render() {
    const { size } = this.props;
    const { defaultValue } = this.state;
    return (
      <span>
        <Select defaultValue={defaultValue} size={size} onChange={this.handleSelectChange}>
          {this.renderOptions()}
        </Select>
      </span>
    );
  }
}

export default GroupsSelect;
