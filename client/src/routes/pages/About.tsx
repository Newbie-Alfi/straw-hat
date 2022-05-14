import { ChartData } from 'chart.js';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { CHART_DATA } from '../../utils/mock';

interface IAboutInsrumentProps {}

type ChartLine = ChartData<'line', (number | null)[], unknown>;

export const AboutInsrument: FC<IAboutInsrumentProps> = ({}) => {
  const { ticket } = useParams();
  const [data, setData] = useState();
  const memorizedTicket = useMemo(() => ticket, [ticket]);

  const fetchData = async () => {
    
  }
  
  useEffect(() => {
    fetchData();
  }, [memorizedTicket]);

  let labels = CHART_DATA.chart.result[0].timestamp.map((ts: number) =>
    new Date(ts).toLocaleDateString('ru-RU')
  );
  let mainCharData = {
    price: CHART_DATA.chart.result[0].indicators.quote[0].close,
    symbol: CHART_DATA.chart.result[0].meta.symbol,
  };
  let dataSets = {
    label: mainCharData.symbol,
    data: mainCharData.price,
    borderColor: `${
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    }`,
    backgroundColor: `${
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
    }`,
  };

  // let charData: ChartLine = {
  //   labels: labels,
  //   datasets: dataSets,
  // };

  return (
    <p>lol</p>
    // <Line
    //   options={{
    //     responsive: true,
    //   }}
    //   data={charData}
    // />
  );
};
