import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

import { Container } from './styles';

class ChartBar extends Component {
  componentDidMount() {
    console.log(this.chartReference)
  }
  render() {

    const data = {
      labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
      datasets: [
        {
          label: 'Métricas Semanais',
          backgroundColor: 'rgb(195, 41, 41, 0.2)',
          borderColor: 'rgba(195, 41, 41,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(195, 41, 41,0.4)',
          hoverBorderColor: 'rgba(195, 41, 41,1)',
          data: [65, 59, 80, 81, 56]
        },
        {
          label: 'Métricas Semanais 2',
          backgroundColor: 'rgb(34, 139, 34, 0.2)',
          borderColor: 'rgba(34, 139, 34,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(34, 139, 34,0.4)',
          hoverBorderColor: 'rgba(34, 139, 34,1)',
          data: [32, 43, 12, 44, 77]
        }
      ]
    };

    return(
      <Container>
        <div>
          <h2>Tarefas semanais</h2>
          <Bar
            ref={(reference) => this.chartReference = reference }
            data={data}
            width={500}
            height={300}
            onElementsClick={(element => console.log(element))}
          />
        </div>
      </Container>
    )
  }
};

export default ChartBar;
