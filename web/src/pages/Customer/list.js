import React, { PureComponent } from 'react';
import { Button } from 'antd';
import styles from './list.less';

class CustomerListView extends PureComponent {
  render() {
    const { data, title, showMore } = this.props;
    return (
      <div className={styles.salesRank}>
        <h4 className={styles.rankingTitle}>
          {title}
        </h4>
        <Button size="small" style={{ float: 'right', zIndex: 100 }} onClick={() => showMore('')}>更多</Button>
        <ul className={styles.rankingList}>
          {
            data && data.length > 0 &&
            data.map((item, i) => (
              <li key={item.customerId}>
                <span
                  className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                >
                  {i + 1}
                </span>
                <span className={styles.rankingItemTitle} title={item.customerName}>
                  {item.customerName}
                </span>
                <span className={styles.rankingItemValue}>
                  {item.createAt}
                </span>
              </li>
              ))
          }
          {
            data && data.length === 0 && <li key="no">没有数据</li>
          }
        </ul>
      </div>
    );
  }
}

export default CustomerListView;
