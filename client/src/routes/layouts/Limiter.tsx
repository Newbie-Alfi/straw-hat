import { Col, Layout, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { FC } from 'react';

export const Limiter: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={18} xl={14}>
        <Layout style={{ minHeight: '100vh' }}>
          <Content>{children}</Content>
        </Layout>
      </Col>
    </Row>
  );
};
