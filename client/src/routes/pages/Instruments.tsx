import { List } from "antd";
import { FC, useEffect, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import { services } from "../../API";
export const Instrumests: FC = () => {
  const [trendingData, setTrendingData] = useState();

  const fetchData = async () => {
    const APIResult = await services.trending.get("US");
    setTrendingData(APIResult.finance.result[0].quotes);
  };

  useEffect(() => {
    fetchData();
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
      <List
        dataSource={trendingData}
        renderItem={(item: any) => (
          <List.Item key={item.symbol}>
            <List.Item.Meta
              // avatar={<Avatar src={item.picture.large} />}
              // title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.symbol}
            />
            <div>Content</div>
          </List.Item>
        )}
      />
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
