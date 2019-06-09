import React, { memo } from 'react';
import { Row, Col, Card } from 'antd';
import styles from './Analysis.less';
import GongHai from './GongHai';
import NonFollowup from './NonFollowup';
import ThisWeek from './ThisWeek';

const SalesCard = memo(
  ({ loading }) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Row gutter={16}>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <Card>
              <GongHai />
            </Card>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <Card>
              <ThisWeek />
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <Card>
              <NonFollowup month={1} title="一个月未跟进客户" />
            </Card>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <Card>
              <NonFollowup month={2} title="二个月未跟进客户" />
            </Card>
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            <Card>
              <NonFollowup month={3} title="三个月未跟进客户" />
            </Card>
          </Col>
        </Row>
      </div>
    </Card>
  )
);

export default SalesCard;
