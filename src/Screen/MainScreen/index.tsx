import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

interface Props {}

const MainScreen = ({}: Props) => {
  return (
    <Container>
      <Text>MainScreen</Text>
    </Container>
  );
};

export default MainScreen;
