import React from 'react';

import { Container } from './styles';
import ChartBar from '../../components/ChartBar';
import ChartPie from '../../components/ChartPie';
import ChartLine from '../../components/ChartLine';

const Dashboard = () => (
  <Container>
    <ChartBar />
    <ChartLine />
    <ChartPie />
  </Container>
);

export default Dashboard;
