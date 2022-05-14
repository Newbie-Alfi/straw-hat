import { List } from "antd";
import { FC, useEffect, useState } from "react";
import { Typography, Button } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
import { services } from "../../API";
export const Instruments: FC = () => {
  const [trendingData, setTrendingData] = useState();
  const [region, setRegion] = useState<string>();

  const fetchData = async (region: string) => {
    const APIResult = await services.trending.get(region);
    setTrendingData(APIResult.finance.result[0].quotes);
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
      <Typography.Title level={3} style={{ margin: 10 }}>
        Популярные акции
      </Typography.Title>
      {regions.map((region) => (
        <Button
          onClick={() => {
            setRegion(region);
            fetchData(region);
          }}
        >
          {region}
        </Button>
      ))}
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
            </List.Item>
          )}
        />
      </div>
      {/* </InfiniteScroll> */}
    </>
  );
};

{
  /* <List
          dataSource={data}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div> */
}
