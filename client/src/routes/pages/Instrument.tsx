import { FC, useLayoutEffect, useState } from "react";
import { Menu, Dropdown, Space, Row } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

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
  ChartDataset,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { services } from "../../API";
import { CHART_DATA } from "../../utils/mock";
import { observer } from "mobx-react-lite";
import { store } from "../../store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartLine = ChartData<"line", (number | null)[], unknown>;

export const Instrument: FC = observer(() => {
  const [chartData, setChartData] = useState<ChartLine>();

  const { instruments } = store;
  const fetchData = async () => {
    const comparisionsToString = (instruments: string[]) => {
      let str = instruments.splice(1, instruments.length) + "";
      return str.replace(/,/, "%2C%5E");
    };
    let searchRange: "1d";
    let searchInterval: "15m";
    let searchRegion: "US";
    try {
      // const response = await services.chart.get(
      //   instruments.comparedInstruments[0],
      //   {
      //     comparisons: comparisionsToString(instruments.comparedInstruments),
      //     range: searchRange,
      //     region: searchRegion,
      //     interval: searchInterval,
      //     lang: 'en',
      //     events: 'div%2Csplit',
      //   }
      // );
      const response = CHART_DATA;
      const result = response.chart.result[0];
      let labels = result.timestamp.map((ts: number) =>
        new Date(ts).toLocaleDateString("ru-RU")
      );
      let mainCharData = {
        price: result.indicators.quote[0].close,
        symbol: result.meta.symbol,
      };
      let comparisonsData = result.comparisons.map((comparison: any) => ({
        price: comparison.open,
        symbol: comparison.symbol,
      }));
      let data = [mainCharData, ...comparisonsData];
      const randColor = () => Math.floor(Math.random() * 16777215).toString(16);
      let dataSets = data.map((chart) => ({
        label: chart.symbol,
        data: chart.price,
        borderColor: `${
          "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
        }`,
        backgroundColor: `${
          "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
        }`,
      }));

      let charData: ChartLine = {
        labels: labels,
        datasets: dataSets,
      };

      setChartData(charData);
    } catch (e) {
    } finally {
    }
  };

  useLayoutEffect(() => {
    fetchData();
  }, []);

  ///top-menu

  //@ts-ignore
  const onRange = ({ key }) => {
    alert(`Click on item ${key}`);
  };
  //@ts-ignore
  const onInterval = ({ key }) => {
    alert(`Click on item ${key}`);
  };

  const rangeMenu = (
    <Menu
      onClick={onRange}
      items={[
        {
          label: "день",
          key: "1",
        },
        {
          label: "5 дней",
          key: "2",
        },
        {
          label: "месяц",
          key: "3",
        },
        {
          label: "3 месяца",
          key: "3",
        },
        {
          label: "6 месяцев",
          key: "4",
        },
      ]}
    />
  );
  const intervalMenu = (
    <Menu
      onClick={onInterval}
      items={[
        {
          label: "1m",
          key: "1",
        },
        {
          label: "5m",
          key: "2",
        },
        {
          label: "15m",
          key: "3",
        },
        {
          label: "1d",
          key: "4",
        },
        {
          label: " 1wk",
          key: "5",
        },
      ]}
    />
  );
  const regionMenu = (
    <Menu
      onClick={onInterval}
      items={[
        {
          label: "US",
          key: "1",
        },
        {
          label: " AU",
          key: "2",
        },
        {
          label: "CA",
          key: "3",
        },
        {
          label: "FR",
          key: "4",
        },
        {
          label: "DE",
          key: "5",
        },
        {
          label: "HK",
          key: "6",
        },
        {
          label: "IT",
          key: "7",
        },
        {
          label: "ES",
          key: "8",
        },
        {
          label: "GB",
          key: "9",
        },
        {
          label: "IN",
          key: "10",
        },
      ]}
    />
  );

  if (chartData) {
    return (
      <>
        <Row style={{ padding: "0 0 1rem 0" }} justify="space-around">
          <Dropdown overlay={rangeMenu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Период
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown overlay={intervalMenu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Интервал
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Dropdown overlay={regionMenu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Регион
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
