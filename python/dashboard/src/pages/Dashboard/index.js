import React, { Component } from 'react';

import { Container, Charts } from './styles';
import Collaborators from '../../components/Collaborators';
import Categories from '../../components/Categories';

class Dashboard extends Component {
  state = {
    json: {
      "collaborators": [
          {
              "name": "Euclécio",
              "pair_count": 2,
              "tasks_count": 5
          },
          {
              "name": "Harold",
              "pair_count": 2,
              "tasks_count": 4
          },
          {
              "name": "Vitor",
              "pair_count": 2,
              "tasks_count": 6
          },
          {
              "name": "Filipe",
              "pair_count": 2,
              "tasks_count": 2
          },
          {
              "name": "Ismael (Compufour)",
              "pair_count": 0,
              "tasks_count": 2
          },
          {
              "name": "Anderson (Coderockr)",
              "pair_count": 0,
              "tasks_count": 0
          },
          {
              "name": "Felipe F. (Coderockr)",
              "pair_count": 0,
              "tasks_count": 0
          }
      ],
      "labels": [
          {
              "label": "Category: Backend",
              "tasks_count": 5
          },
          {
              "label": "Category: DevOps",
              "tasks_count": 4
          },
          {
              "label": "Category: Frontend",
              "tasks_count": 7
          },
          {
              "label": "Category: Mobile",
              "tasks_count": 0
          },
          {
              "label": "Category: UX",
              "tasks_count": 0
          },
          {
              "label": "Reseller Demand",
              "tasks_count": 2
          },
          {
              "label": "Type: Bug",
              "tasks_count": 4
          },
          {
              "label": "Type: Improvement",
              "tasks_count": 5
          },
          {
              "label": "Type: Maintenance",
              "tasks_count": 3
          },
          {
              "label": "Type: New feature",
              "tasks_count": 3
          }
      ],
      "total_tasks": 15
    },
    data: {},
    data2: {},
    totalTasks: '',
    colors: [
      '195, 41, 41',
      '32, 123, 32',
      '229, 99, 51',
      '244, 210, 29',
      '139, 69, 19',
      '131, 150, 99',
      '142, 95, 86',
      '0, 0, 205',
      '153, 50, 204',
      '225, 198, 53'
      ]
  }

  componentDidMount() {
    this.updateChart();
  }

  updateChart = async () => {
    const data = await this.state.json['collaborators'].map((collaborator, index) => {
      let arrayValues = [0,0,0,0,0,0,0];
      arrayValues[index] = collaborator.tasks_count;
      return {
        label: `${collaborator.name} - tasks` ,
        backgroundColor: 'rgb(58, 61, 186, 0.4)',
        borderColor: 'rgba(58, 61, 186,1)',
        hoverBackgroundColor: 'rgba(58, 61, 186,0.6)',
        hoverBorderColor: 'rgba(58, 61, 186,1)',
        data: arrayValues,
        stack: 1
      }
    })
    const data1 = await this.state.json['collaborators'].map((collaborator,index) => {
      let arrayValues = [0,0,0,0,0,0,0];
      arrayValues[index] = collaborator.pair_count;
      return {
        label: `${collaborator.name} - pair`,
        backgroundColor: 'rgb(32, 123, 32, 0.4)',
        borderColor: 'rgba(32, 123, 32,1)',
        hoverBackgroundColor: 'rgba(32, 123, 32,0.6)',
        hoverBorderColor: 'rgba(32, 123, 32,1)',
        data: arrayValues,
        stack: 2
      }
    })

    const newArray = this.arrayInterpolation(data, data1)

    const dataResult = {
      labels: ['Euclecio', 'Harold', 'Vitor', 'Filipe', 'Ismael', 'Anderson', 'Felipe F.'],
      datasets: newArray,
    }

    this.setState({ data: dataResult })

    const { colors } = this.state;
    const data2 = await this.state.json['labels'].map((label, index) => {
      return {
        label: label.label,
        backgroundColor: `rgb(${colors[index]}, 0.4)`,
        borderColor: `rgb(${colors[index]})`,
        hoverBackgroundColor: `rgb(${colors[index]}, 0.6)`,
        hoverBorderColor: `rgb(${colors[index]})`,
        data: [label.tasks_count]
      }
    }).filter(element => {
      return element.data[0] > 0
    })

    const dataResult2 = {
      labels: ['Categories'],
      datasets: data2,
    }
    this.setState({ data2: dataResult2})
    this.setState({ totalTasks: this.state.json['total_tasks'] })
  }

  arrayInterpolation = (data, data1) => {
    var limit = data.length < data1.length ? data1.length : data.length;
    var newArray = [];

    for(var i = 0; i < limit; i++) {
      if(data.length > 0) newArray.push(data.shift());
      if(data1.length > 0) newArray.push(data1.shift());
    }

    return newArray;
  }

  render() {
    const {data, data2, totalTasks } = this.state;
    return (
      <Container>
        <h1>Total tasks: {totalTasks}</h1>
        <Charts>
          <Collaborators data={data}/>
          <Categories data={data2}/>
        </Charts>
      </Container>
    )
  }
}

export default Dashboard;


