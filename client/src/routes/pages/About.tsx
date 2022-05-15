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
interface IInfo {
  name: string;
  description: string;
  startDate: string;
}

export const AboutInsrument: FC<IAboutInsrumentProps> = ({}) => {
  const { ticket } = useParams();
  // const [data, setData] = useState();
  const memorizedTicket = useMemo(() => ticket, [ticket]);
  const [range, setRange] = useState("1d");
  const [interval, setInterval] = useState("15m");
  const [chartData, setChartData] = useState<ChartLine>();
  const [info, setInfo] = useState<IInfo>({} as IInfo);
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

  const fetchMoreInfo = async () => {
    try {
      const moreInfo = await services.summary.get(ticket!);
      setInfo({
        description: moreInfo.quoteSummary.result[0].assetProfile.description,
        name: moreInfo.quoteSummary.result[0].assetProfile.name,
        startDate: moreInfo.quoteSummary.result[0].assetProfile.startDate
      });
      console.log(moreInfo); 
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetchMoreInfo();
  }, [])

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
        <Button  onClick={()=> navigate('/')} type='primary'>
          Назад
        </Button>
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
        <div>
          <h1>Название</h1>
          <p>{info.name}</p>
        </div>
        <div>
          <h1>Дата начала</h1>
          <p>{info.startDate}</p>
        </div>
        <div>
          <h1>Описание</h1>
          <p>{info.description}</p>
        </div>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
};
