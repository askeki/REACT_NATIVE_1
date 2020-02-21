/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, 
  ActivityIndicator, 
  Button 
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

let YEAR  = '2020';
let MONTH = '02';
let url = 'https://narainfo.com/api/account2.php?key=bd9b05bcbcf8802aa3c7a87ab30a46d7&table=g5_write_account&userId=narainfo&date=' + YEAR + '-' + MONTH;
// object를 키 이름으로 정렬하여 반환

function sortObject(o) {
    var sorted = {},
    key, a = [];

    // 키이름을 추출하여 배열에 집어넣음
    for (key in o) {
        if (o.hasOwnProperty(key)) a.push(key);
    }

    // 키이름 배열을 정렬
    a.sort();

    // 정렬된 키이름 배열을 이용하여 object 재구성
    for (key=0; key<a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }

    return sorted;
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={ isLoading: true, dataSource: [] }
  }

  componentDidMount(){
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var datas = [];
        var datas_tmp = [];

        if(responseJson.account != null) {
          datas = responseJson.account.data;
        }

        var total = 0;

        for(var i in datas) {
          datas_tmp[i.toString()]  = [];

          for(var j in datas[i]) {
            datas_tmp[i.toString()].push(datas[i][j])
          }

          total++;
        }

        let todayMonth  = [];
        let sDat = new Date(YEAR, MONTH, 1).getDate();
        let lDat = new Date(YEAR, MONTH, 0).getDate();

        for(var i=sDat; i<lDat; i++) {
          if(i < 10) {
            i = '0' + i;
          }

          todayMonth.push(i.toString());
        }

        this.setState({
          isLoading: false,
          dataSource: datas_tmp, 
          todayMonth: todayMonth
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {
    if(this.state.isLoading){
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={styles.header}>
          <Text style={styles.header_title}>{YEAR}년 {MONTH}월</Text>
        </View>
        <View style={{width: "100%", height: 500 }}>
          <View style={styles.container}>
            <ScrollView>
              {this.state.todayMonth.map((data, index) => (
                <MyData data={data} id={index} key={index} dataSource={this.state.dataSource} />
              ))}
            </ScrollView>
          </View>
      </View>
  </View>
    );
  }
};

class MyData extends Component {
  render() {
    const { data, id, dataSource } = this.props;

    if(dataSource[data] == undefined) {
      dataSource[data]  = [];
      dataSource[data].push({ 
        'wr_subject': '지출 내역이 없습니다.', 
        'wr_5' : 0
     })
    }

    return (
      <View style={styles.wrap}>
        <Text style={styles.content_top}>{MONTH}월 {data}일</Text>
        {dataSource[data].map((data, index) => (          
          <View style={styles.item} key={index}>
            <Text style={styles.category}>{data.ca_name}</Text>
            <Text style={styles.content}>{data.wr_subject}</Text>
            <Text style={{ 'color': data.wr_5_color, 'width': 100, 'textAlign': 'right' }}>{data.wr_5}원</Text>
            <Text style={styles.info}>{data.info}</Text>
            <Text style={styles.type}>{data.wr_1} {data.wr_2}</Text>
            <Text style={styles.date}>{data.wr_8}</Text>
          </View>
        ))}
     </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%', 
    backgroundColor: 'powderblue'
  }, 
  header_title: {
    height: 50, 
    lineHeight: 50, 
    textAlign: 'center'
  }, 
  footer: {
    width: '100%', 
    height: 50, 
    backgroundColor: 'powderblue', 
    position: 'absolute', 
    bottom: 0
  }, 
  container: {
   flex: 1,
   padding: 10, 
    marginBottom: 25
  }, 
  content_top: {
    backgroundColor: '#eee', 
    padding: 5, 
  }, 
  wrap: {
    width: '100%'
  }, 
  item: {
    padding: 10,
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  category: {
    width: 100, 
  }, 
  info: {
    width: 100, 
    fontSize: 10, 
    color: '#bbb', 
  }, 
  content: {
    width: 150, 
  }, 
  date: {
    width: 100, 
    textAlign: 'right'
  }, 
  modify: {
    width: 50,
  }, 
  type: {
    width: 150, 
    fontSize: 10, 
    color: '#bbb'
  }, 
  red: {
    color: 'red'
  }
})
