import { ChartData } from 'chart.js';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate, useParams } from 'react-router-dom';
import { CHART_DATA } from '../../utils/mock';
import { services } from "../../API";
import { Button, Col, Row, Select } from 'antd';
import { INTERVAL, RANGE } from '../../components/constants';
import moment from 'moment';

interface IAboutInsrumentProps {}

type ChartLine = ChartData<'line', (number | null)[], unknown>;

export const AboutInsrument: FC<IAboutInsrumentProps> = ({}) => {
  const { ticket } = useParams();
  // const [data, setData] = useState();
  const memorizedTicket = useMemo(() => ticket, [ticket]);
  const [range, setRange] = useState("1d");
  const [interval, setInterval] = useState("15m");
  const [chartData, setChartData] = useState<ChartLine>();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await services.chart.get(ticket, {
        range: range,
        region: "US",
        interval: interval,
        lang: "en",
        events: "div%2Csplit",
      });
      if (!response.chart.result) return { labels: "", datasets: [] } as any;
      const result = response.chart.result[0];
      let labels = result.timestamp.map((ts: number) => {
        return moment.unix(ts).format("H:mm MM-DD-YY");
      });
      let mainCharData = {
        price: result.indicators.quote[0].close,
        symbol: result.meta.symbol,
      }; 
      let data = [mainCharData];
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

      return charData;
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetchData().then((data) => {
      setChartData(data);
    });
  }, [memorizedTicket, range, interval]);


  // let charData: ChartLine = {
  //   labels: labels,
  //   datasets: dataSets,
  // };

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

        <Button 
          onClick={()=> navigate('')}
          type='primary'
        >
          Назад
        </Button>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
};
