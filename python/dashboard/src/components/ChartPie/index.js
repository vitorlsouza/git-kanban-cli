import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

import { Container } from './style';

class ChartPie extends Component {

  render() {

    const data = {
      labels: [
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta'
      ],
      datasets: [{
        data: [120, 50, 100, 70, 30],
        backgroundColor: [
        '#E93838',
        '#36A2EB',
        '#FFCE56',
        '#35982C',
        '#9A3DAB'
        ],
        hoverBackgroundColor: [
        '#E93838',
        '#36A2EB',
        '#FFCE56',
        '#35982C',
        '#9A3DAB'
        ]
      }]
    };
    return(
      <Container>
        <div>
          <h2>Tarefas semanais</h2>
          <Doughnut
            data={data}
            width={300}
            height={250}
          />
        </div>
      </Container>
    )
  }
 }

export default ChartPie;
