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
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

let url = 'https://narainfo.com/api/account.php?key=bd9b05bcbcf8802aa3c7a87ab30a46d7&table=g5_write_account&userId=narainfo&date=2020-02';
// let url = 'https://facebook.github.io/react-native/movies.json';

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

        if(responseJson.account != null) {
          datas = responseJson.account.data;
        }

        this.setState({
          isLoading: false,
          dataSource: datas,
        }, function(){
        });

        console.log(this.state);
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
      <View style={{width: "100%", height: 50, backgroundColor: 'powderblue'}}>
      </View>
      <View style={{width: "100%", height: 550 }}>
        <View style={styles.container}>
          <ScrollView>
            {this.state.dataSource.map((item, index) => (
              <MyData data={item} key={index}/>
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
    const { data } = this.props;
    return(
      <View style={styles.item}>
        <Text style={styles.category}>{data.category}</Text>
        <Text style={styles.content}>{data.title}</Text>
        <Text>{data.wr_7}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 10, 
  },
  item: {
    padding: 10,
    flexWrap: 'wrap', 
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  category: {
    width: 100
  }, 
  content: {
    width: 150
  }
})
