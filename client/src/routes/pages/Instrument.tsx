import { FC, useEffect, useState } from "react";
import { Row, Select, Col } from "antd";

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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { services } from "../../API";
import { CHART_DATA } from "../../utils/mock";
import { observer } from "mobx-react-lite";
import { INTERVAL, RANGE } from "../../components/constants";
import { m as instruments } from "../../store/instruments";
import moment from "moment";

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
  const [range, setRange] = useState("1d");
  const [interval, setInterval] = useState("15m");

  const fetchData = async () => {
    const comparisionsToString = (instruments: string[]) => {
      let clone = Object.assign([], instruments);
      let str = clone.splice(1, instruments.length) + "";
      // return str.replace(/,/, '%2C%5E');
      return str.replace(/,/, "%2C");
    };

    try {
      const response = await services.chart.get(
        instruments.comparedInstruments[0],
        comparisionsToString(instruments.comparedInstruments) === ""
          ? {
              range: range,
              region: "US",
              interval: interval,
              lang: "en",
              events: "div%2Csplit",
            }
          : {
              comparisons: comparisionsToString(
                instruments.comparedInstruments
              ),
              range: range,
              region: "US",
              interval: interval,
              lang: "en",
              events: "div%2Csplit",
            }
      );
      // const response = CHART_DATA;
      //
      if (!response.chart.result) return { labels: "", datasets: [] } as any;
      const result = response.chart.result[0];
      let labels = result.timestamp?.map((ts: number) => {
        return moment.unix(ts).format("H:mm MM-DD-YY");
      });
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
      let dataSets = data?.map((chart) => ({
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
  }, [instruments.comparedInstruments, instruments.num, interval, range]);

  if (chartData) {
    return (
      <>
        <Row style={{ padding: "0 0 1rem 0" }} justify="space-around">
          <Col>
            <span style={{ padding: "0 0.5rem" }}>Интервал</span>
            <Select defaultValue={INTERVAL[0].value} onSelect={setInterval}>
              {INTERVAL.map((interval) => (
                <Select.Option key={interval.value} value={interval.value}>
                  {interval.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
          <Col>
            <span style={{ padding: "0 0.5rem" }}>Период</span>
            <Select defaultValue={RANGE[0].value} onSelect={setRange}>
              {RANGE.map((interval) => (
                <Select.Option key={interval.value} value={interval.value}>
                  {interval.label}
                </Select.Option>
              ))}
            </Select>
          </Col>
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
