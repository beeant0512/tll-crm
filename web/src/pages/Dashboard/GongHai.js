import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import CustomerListView from '@/pages/Customer/list';

@connect(({ customer, loading }) => ({
  customer,
  loading: loading.effects['customer/pool'],
}))
class GongHai extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/pool',
      callback: response => this.setState({ data: response.data && response.data.list }),
    });
  }

  showMore = () => {
    router.push('/customer/pool');
  };

  render() {
    const { data } = this.state;
    return (
      <CustomerListView title="公海" data={data} showMore={this.showMore} />
    );
  }

}

export default GongHai;
