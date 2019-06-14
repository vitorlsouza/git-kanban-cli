import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

import { Container } from './styles';

class Categories extends Component {

  render() {
    const { data } = this.props;

    return(
      <Container>
        <div>
          <h2>Categories</h2>
          <Bar
            data={data}
            options={{
              scales: {
                yAxes: [{
                  ticks: {
                     max: this.props.yAxes,
                     min: 0,
                     stepSize: 1
                   }
                 }]
                },
            }}
          />
        </div>
      </Container>
    )
  }
 }

export default Categories;
