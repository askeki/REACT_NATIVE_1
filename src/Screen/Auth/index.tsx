import React, { Component } from 'react';
import { Text, Button, TextInput, Image, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import styled from 'styled-components/native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import { State } from 'react-native-gesture-handler';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #ddd;
`;

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

const Auth2 = ({navigation}: Props) => {
  let idFlag = false;
  let pwFlag = false;

  const _login = () => {
    if(!idFlag || !pwFlag) {
      ToastAndroid.show('아이디 또는 비밀번호를 입력하세요.', ToastAndroid.SHORT);
      return false;
    }

    let url = 'https://someurl.com';
    let options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            property_one: '',
            property_two: ''
        })
    };
    
    // let response = await fetch(url, options);
    /*
    let responseOK = response && response.ok;
    if (responseOK) {
        let data = await response.json();
        console.log(data)
        // do something with data
    }
    */


    AsyncStorage.setItem('userToken', 'add_token');
    navigation.navigate('MainTab');
  };

  const _idChk = (text) => {
    idFlag = false;

    if(text.trim().length) {
      idFlag = true;
    }
  };

  const _pwdChk = (text) => {
    pwFlag = false; 

    if(text.trim().length) {
      pwFlag = true;
    }
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

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toastFlag: true
    };
  }

  _login = () => {
    console.log(Props)
    ToastAndroid.show('1', ToastAndroid.SHORT);
  }

  render() {
    return ( 
      <Container>
        <Text style={{ padding: 5, fontSize: 24, marginBottom: 25 }}>나라인포</Text>
        <TextInput
            style={{ padding: 5, backgroundColor: '#fff', width: 250, borderRadius: 5, marginBottom: 5 }}
            placeholder="아이디 입력"
          />
        <TextInput
            style={{ padding: 5, backgroundColor: '#fff', width: 250, borderRadius: 5, marginBottom: 25 }}
            placeholder="비밀번호 입력" 
            secureTextEntry={true}
          />
        <Button title="로그인" onPress={() => this._login()} />
      </Container>
    )
  }
}

export default Auth2;
