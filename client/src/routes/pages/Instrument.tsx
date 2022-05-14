import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { Menu, Dropdown, Space, Row, Button } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { services } from '../../API';
import { CHART_DATA } from '../../utils/mock';
import { observer } from 'mobx-react-lite';
import { INTERVAL, RANGE } from '../../components/constants';
import { m as instruments } from '../../store/instruments';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartLine = ChartData<'line', (number | null)[], unknown>;

export const Instrument: FC = observer(() => {
  const [chartData, setChartData] = useState<ChartLine>();

  let searchRange = '1d';
  let searchInterval = '15m';

  const fetchData = async () => {
    const comparisionsToString = (instruments: string[]) => {
      let clone = Object.assign([], instruments);
      let str = clone.splice(1, instruments.length) + '';
      // return str.replace(/,/, '%2C%5E');
      return str.replace(/,/, '%2C');
    };

    console.log(true);

    try {
      const response = await services.chart.get(
        instruments.comparedInstruments[0],
        comparisionsToString(instruments.comparedInstruments) === ''
          ? {
              range: searchRange,
              region: 'US',
              interval: searchInterval,
              lang: 'en',
              events: 'div%2Csplit',
            }
          : {
              comparisons: comparisionsToString(
                instruments.comparedInstruments
              ),
              range: searchRange,
              region: 'US',
              interval: searchInterval,
              lang: 'en',
              events: 'div%2Csplit',
            }
      );
      // const response = CHART_DATA;
      const result = response.chart.result[0];
      let labels = result.timestamp.map((ts: number) =>
        new Date(ts).toLocaleDateString('ru-RU')
      );
      let mainCharData = {
        price: result.indicators.quote[0].close,
        symbol: result.meta.symbol,
      };
      let comparisonsData =
        result.comparisons?.map((comparison: any) => ({
          price: comparison.open,
          symbol: comparison.symbol,
        })) || [];

      let data = [mainCharData, ...comparisonsData];
      let dataSets = data.map((chart) => ({
        label: chart.symbol,
        data: chart.price,
        borderColor: `${
          '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
        }`,
        backgroundColor: `${
          '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
        }`,
      }));

      let charData: ChartLine = {
        labels: labels,
        datasets: dataSets,
      };

      return charData;
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  useEffect(() => {
    fetchData().then((data) => {
      setChartData(data);
    });
  }, [instruments.comparedInstruments, instruments.num]);

  const onRange = ({ label }: { label: string }) => {
    searchRange = label;
  };

  const onInterval = ({ label }: { label: string }) => {
    searchInterval = label;
  };

  if (chartData) {
    return (
      <>
        <Row style={{ padding: '0 0 1rem 0' }} justify="space-around">
          <Dropdown
            overlay={
              // @ts-ignore
              <Menu onClick={onRange} items={RANGE} />
            }
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Период
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

          <Dropdown
            overlay={
              // @ts-ignore
              <Menu onClick={onInterval} items={INTERVAL} />
            }
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Интервал
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Row>

        <Line
          options={{
            responsive: true,
          }}
          data={chartData}
        />
      </>
    );
  } else {
    return <p>loading...</p>;
  }
});
