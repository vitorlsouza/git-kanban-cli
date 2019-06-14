import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

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
      data: [75, null, 89, 34, 54]
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
      data: [77, 76, null]
    }
  ]
};

class ChartLine extends Component {
  render() {
    return (
      <Container>
        <div>
          <h2>Tarefas semanais</h2>
          <Bar data={data} />
        </div>
      </Container>
    )
  }
}

export default ChartLine;
