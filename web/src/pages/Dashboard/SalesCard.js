import React, { memo } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { formatMessage } from 'umi-plugin-react/locale';
import numeral from 'numeral';
import styles from './Analysis.less';


const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: formatMessage({ id: 'app.analysis.test' }, { no: i }),
    total: 323234,
  });
}

const showMore = () => {
  console.log('show more');
};

const SalesCard = memo(
  ({ loading }) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
          <div className={styles.salesRank}>
            <h4 className={styles.rankingTitle}>
              公海
            </h4>
            <Button size="small" style={{float: 'right', zIndex: 100}} onClick={() => showMore('')}>更多</Button>
            <ul className={styles.rankingList}>
              {rankingListData.map((item, i) => (
                <li key={item.title}>
                  <span
                    className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                  >
                    {i + 1}
                  </span>
                  <span className={styles.rankingItemTitle} title={item.title}>
                    {item.title}
                  </span>
                  <span className={styles.rankingItemValue}>
                    {numeral(item.total).format('0,0')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Row>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>
                本周待跟进客户
              </h4>
              <Button size="small" style={{float: 'right', zIndex: 100}} onClick={() => showMore('')}>更多</Button>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span className={styles.rankingItemValue}>
                      {numeral(item.total).format('0,0')}
                    </span>
                  </li>
                    ))}
              </ul>
            </div>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>
                一个月未跟进客户
              </h4>
              <Button size="small" style={{float: 'right', zIndex: 100}} onClick={() => showMore('')}>更多</Button>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span className={styles.rankingItemValue}>
                      {numeral(item.total).format('0,0')}
                    </span>
                  </li>
                    ))}
              </ul>
            </div>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>
                两个月未跟进客户
              </h4>
              <Button size="small" style={{float: 'right', zIndex: 100}} onClick={() => showMore('')}>更多</Button>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span className={styles.rankingItemValue}>
                      {numeral(item.total).format('0,0')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <div className={styles.salesRank}>
              <h4 className={styles.rankingTitle}>
                三个月未跟进客户
              </h4>
              <Button size="small" style={{float: 'right', zIndex: 100}} onClick={() => showMore('')}>更多</Button>
              <ul className={styles.rankingList}>
                {rankingListData.map((item, i) => (
                  <li key={item.title}>
                    <span
                      className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}
                    >
                      {i + 1}
                    </span>
                    <span className={styles.rankingItemTitle} title={item.title}>
                      {item.title}
                    </span>
                    <span className={styles.rankingItemValue}>
                      {numeral(item.total).format('0,0')}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  )
);

export default SalesCard;
