import { Col, List, Input } from 'antd';
import { FC, useEffect, useState } from 'react';
import { Typography, Button, Row } from 'antd';
// import InfiniteScroll from "react-infinite-scroll-component";
import { services } from '../../API';
import { observer } from 'mobx-react-lite';
import { SHARES } from '../../utils/mock';
import { m as instruments } from '../../store/instruments';
import { REGIONS } from '../../components/constants';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../paths';

export const Instruments: FC = observer(() => {
  const [trendingData, setTrendingData] = useState<any[]>();
  const [region, setRegion] = useState<string>(REGIONS[0]);
  const navigate = useNavigate();
  instruments.num;

  const { Search } = Input;
  // const onSearch = (value: string) => console.log(value);
  const onSearch = (value: string) => {
    instruments.num++;
    instruments.addComparedInstrumet(value);
  };

  const fetchData = async (region: string) => {
    // const APIResult = await services.trending.get(region);
    // setTrendingData(APIResult.finance.result[0].quotes);
    const APIResult = SHARES.finance.result[0].quotes;
    setTrendingData(APIResult);
  };

  useEffect(() => {
    fetchData(region);
  }, [region]);

  return (
    <>
      {/* <InfiniteScroll
        dataLength={120}
        next={() => console.log(1)}
        hasMore={120 < 50}
        // loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
        loader={undefined}
      > */}
      <div style={{ padding: '2rem 0' }}>
        <Row justify="center">
          <Typography.Title level={3} style={{ margin: 10 }}>
            Добавление по тикету
          </Typography.Title>
        </Row>
        <Search
          placeholder="AAPL, BTC-USD, EURUSD=X"
          onSearch={onSearch}
          enterButton="+"
        />
      </div>

      <Row justify="space-around" style={{ margin: '1rem 0' }}>
        <Col span={24}>
          <Row justify="center">
            <Typography.Title level={3} style={{ margin: 10 }}>
              Популярные инструменты и индексы
            </Typography.Title>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center">
            <Typography.Title level={4} style={{ margin: 10 }}>
              Регион
            </Typography.Title>
          </Row>
        </Col>

        {REGIONS.map((region) => (
          <Col>
            <Button
              key={region}
              onClick={() => {
                setRegion(region);
              }}
            >
              {region}
            </Button>
          </Col>
        ))}
      </Row>

      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
        }}
      >
        <List
          dataSource={trendingData}
          renderItem={(item: any) => (
            <List.Item
              key={item.symbol}
              // onClick={() => navigate(item.symbol)}
            >
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                // title={<a href="https://ant.design">{item.name.last}</a>}

                description={item.symbol}
              />
              {instruments.isAlreadyAdded(item.symbol) ? (
                <Button
                  type="primary"
                  danger
                  ghost
                  onClick={() => {
                    instruments.num++;
                    instruments.removeComparedInstrumet(item.symbol);
                  }}
                  disabled={!instruments.isAlreadyAdded(item.symbol)}
                >
                  Удалить
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    instruments.num++;
                    instruments.addComparedInstrumet(item.symbol);
                  }}
                  disabled={instruments.isAlreadyAdded(item.symbol)}
                >
                  Добавить
                </Button>
              )}
            </List.Item>
          )}
        />
      </div>
      {/* </InfiniteScroll> */}
    </>
  );
});
