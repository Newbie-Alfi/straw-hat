import { List } from 'antd';
import { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
// import InfiniteScroll from "react-infinite-scroll-component";
import { services } from '../../API';
import { observer } from 'mobx-react-lite';
import { store } from '../../store';
import { SHARES } from '../../utils/mock';
import { toJS } from 'mobx';
export const Instruments = observer(() => {
  const [trendingData, setTrendingData] = useState<any[]>();
  const [region, setRegion] = useState<string>();
  const { instruments } = store;
  instruments.num;

  console.log(
    localStorage.getItem('comparedInstruments'),
    toJS(instruments.comparedInstruments)
  );
  const fetchData = async (region: string) => {
    // const APIResult = await services.trending.get(region);
    const APIResult = SHARES.finance.result[0].quotes;
    // setTrendingData(APIResult.finance.result[0].quotes);
    setTrendingData(APIResult);
  };

  const regions = ['US', 'AU', 'CA', 'FR', 'DE', 'HK', 'IT'];
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
          key={region}
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
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
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
              {instruments.isAlreadyAdded(item.symbol) ? (
                <Button
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
