import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

import { Container } from './styles';

const data = {
  labels: [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta'
  ],
  datasets: [
    {
      label: 'Tarefas semanais',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(195, 41, 41,0.4)',
      borderColor: 'rgba(195, 41, 41,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(195, 41, 41,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(195, 41, 41,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'Tarefas semanais 2',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(34, 139, 34,0.4)',
      borderColor: 'rgba(34, 139, 34,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(34, 139, 34,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(34, 139, 34,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [84, 45, 90, 45, 76, 23, 65]
    }
  ]
};

class ChartLine extends Component {
  render() {
    return (
      <Container>
        <div>
          <h2>Tarefas semanais</h2>
          <Line data={data} />
        </div>
      </Container>
    )
  }
}

export default ChartLine;
