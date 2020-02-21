import React, {useEffect} from 'react';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import { Common } from '../../Common';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {}

const AuthLoadingScreen = ({navigation}: Props) => {
  const _bootstrapAsync = async () => {
    AsyncStorage.getItem('member').then((data) => {
      if(data == null) {
        navigation.navigate('Auth');
        return false;
      }

      navigation.navigate('MainTab');
      return false;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      _bootstrapAsync();
    }, 1000);
  }, []);

  return (
    <Container>
      <Text style={{color: '#fff'}}>Loading...</Text>
    </Container>
  );
};

export default AuthLoadingScreen;
