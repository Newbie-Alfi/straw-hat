import { Col, List } from "antd";
import { FC, useEffect, useState } from "react";
import { Typography, Button, Row } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
import { services } from "../../API";
import { observer } from "mobx-react-lite";
import { store } from "../../store";
import { SHARES } from "../../utils/mock";
export const Instruments: FC = observer(() => {
  const [trendingData, setTrendingData] = useState<any[]>();
  const [region, setRegion] = useState<string>();
  const { instruments } = store;

  const fetchData = async (region: string) => {
    // const APIResult = await services.trending.get(region);
    const APIResult = SHARES.finance.result[0].quotes;
    // setTrendingData(APIResult.finance.result[0].quotes);
    setTrendingData(APIResult);
  };

  const swapRegion = (region: string) => {
    setRegion(region);
  };

  const regions = ["US", "AU", "CA", "FR", "DE", "HK", "IT"];
  useEffect(() => {
    fetchData(regions[0]);
    setRegion(regions[0]);
  }, []);
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

      <Row justify="space-around" style={{ margin: "1rem 0" }}>
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
              Фильтр по региону
            </Typography.Title>
          </Row>
        </Col>

        {regions.map((region) => (
          <Col>
            <Button
              onClick={() => {
                setRegion(region);
                fetchData(region);
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
          overflow: "auto",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <List
          dataSource={trendingData}
          renderItem={(item: any) => (
            <List.Item key={item.symbol}>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                // title={<a href="https://ant.design">{item.name.last}</a>}

                description={item.symbol}
              />
              <Button
                onClick={() => {
                  instruments.addComparedInstrumet(item.symbol);
                }}
                disabled={instruments.comparedInstruments.includes(item.symbol)}
              >
                Добавить на график
              </Button>
            </List.Item>
          )}
        />
      </div>
      {/* </InfiniteScroll> */}
    </>
  );
});
