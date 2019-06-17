import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

import { Container } from './styles';

class ChartBar extends Component {
  render() {
    const { data } = this.props;
    return(
      <Container>
        <div>
          <h2>Collaborators</h2>
          <Bar
            ref={ref => this.chart = ref}
            data={data}
            options={{
              legend: {
                display: false,
              },
              scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                      max: this.props.yAxes,
                      min: 0,
                      stepSize: 1
                    }
                }]
              }
            }}
          />
        </div>
      </Container>
    )
  }
};

export default ChartBar;
