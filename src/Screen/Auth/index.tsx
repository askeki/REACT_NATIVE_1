import React, { Component } from 'react';
import { Text, Button, TextInput, Image, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import { State } from 'react-native-gesture-handler';
import { Common } from '../../Common';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const Auth = ({navigation}: Props) => {
  let idFlag = false;
  let pwFlag = false;

  let USER_ID = '';
  let PASSWORD = '';

  const _login = () => {
    if(!idFlag || !pwFlag) {
      ToastAndroid.show('아이디 또는 비밀번호를 입력하세요.', ToastAndroid.SHORT);
      return false;
    }

    let Com = new Common();

    Com.getLogin(USER_ID, PASSWORD).then(
      data => {
        if(!data.result) {
          ToastAndroid.show('아이디 또는 비밀번호를 입력하세요.', ToastAndroid.SHORT);
          return false;          
        }

        AsyncStorage.setItem('member', JSON.stringify(data.data));
        navigation.navigate('MainTab');

        return false;
      }
    );
  };

  const _idChk = (text) => {
    idFlag = false;

    if(text.trim().length) {
      idFlag = true;
    }

    USER_ID = text.trim();
  };

  const _pwdChk = (text) => {
    pwFlag = false; 

    if(text.trim().length) {
      pwFlag = true;
    }

    PASSWORD = text.trim();
  };

  return (
    <Container>
      <Text style={{ padding: 5, fontSize: 24, marginBottom: 25 }}>나라인포</Text>
      <TextInput
          style={{ padding: 5, backgroundColor: '#fff', width: 250, borderRadius: 5, marginBottom: 5 }}
          placeholder="아이디 입력" 
          onChangeText={_idChk}
        />
      <TextInput
          style={{ padding: 5, backgroundColor: '#fff', width: 250, borderRadius: 5, marginBottom: 25 }}
          placeholder="비밀번호 입력" 
          onChangeText={_pwdChk}
          secureTextEntry={true}
        />
      <Button title="로그인" onPress={_login} />
    </Container>
  );
};

export default Auth;
