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
  let searchRange: "1d";
  let searchInterval: "15m";

  const fetchData = async () => {
    const comparisionsToString = (instruments: string[]) => {
      let str = instruments.splice(1, instruments.length) + "";
      return str.replace(/,/, "%2C%5E");
    };

    try {
      const response = await services.chart.get(
        instruments.comparedInstruments[0],
        {
          comparisons: comparisionsToString(instruments.comparedInstruments),
          range: searchRange,
          region: "US",
          interval: searchInterval,
          lang: "en",
          events: "div%2Csplit",
        }
      );
      // const response = CHART_DATA;
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
  const onRange = ({ label }) => {
    searchRange = label;
  };
  //@ts-ignore
  const onInterval = ({ label }) => {
    searchInterval = label;
  };

  const rangeMenu = (
    <Menu
      //@ts-ignore
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
      //@ts-ignore
      onClick={onInterval}
      items={[
        {
          label: "минута",
          key: "1",
        },
        {
          label: "5 минут",
          key: "2",
        },
        {
          label: "15 минут",
          key: "3",
        },
        {
          label: "день",
          key: "4",
        },
        {
          label: "неделя",
          key: "5",
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
