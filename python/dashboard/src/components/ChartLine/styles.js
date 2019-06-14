import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  height: 300px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  margin: 20px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 350px;
  }
`;
