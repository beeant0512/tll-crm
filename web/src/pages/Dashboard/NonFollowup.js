import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import CustomerListView from '@/pages/Customer/list';

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.effects['customer/nonFollowup'],
}))
class GongHai extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const { dispatch, month } = this.props;
    dispatch({
      type: 'customer/nonFollowup',
      payload: { month },
      callback: response => this.setState({ data: response.data && response.data.list }),
    });
  }

  showMore = () => {
    router.push('/customer/nonFollowup');
  };

  render() {
    const { data } = this.state;
    const { title, month } = this.props;
    console.log(month);
    return (
      <CustomerListView title={title} data={data} showMore={this.showMore} />
    );
  }

}

export default GongHai;
