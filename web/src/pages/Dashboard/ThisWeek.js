import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import CustomerListView from '@/pages/Customer/list';

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.effects['customer/thisWeek'],
}))
class GongHai extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/thisweek',
      callback: response => this.setState({ data: response.data && response.data.list }),
    });
  }

  showMore = () => {
    router.push('/customer/');
  };

  render() {
    const { data } = this.state;
    return (
      <CustomerListView title="本周待跟进客户" data={data} showMore={this.showMore} />
    );
  }

}

export default GongHai;
