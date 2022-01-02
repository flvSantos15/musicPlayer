import React, { Component } from 'react';
import {ScrollView, View, StyleSheet, Text, Dimensions} from 'react-native';
import { AudioContext } from '../context/AudioProvider';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview'
export class Audiolist extends Component{
  static contextType = AudioContext 

  layoutProvider = new LayoutProvider(
    (index) => 'audio', 
    (type, dim) => {
      switch(type){
        case 'audio':
          dim.width = Dimensions.get('window').width
          dim.height = 70
          break
          default:
            dim.width = 0
            dim.height = 0
      }
    
  })

  rowRenderer = (type, item) => {
    
    return <Text>{item.filename}</Text>
  }

  render(){
    return(
      <AudioContext.Consumer>
        {({dataProvider}) => {
          return (
            <View style={{flex: 1}}>
              <RecyclerListView 
                dataProvider={dataProvider} 
                layoutProvider={this.layoutProvider}
                rowRenderer={this.rowRenderer}
              />
            </View>
          )
        }}
      </AudioContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100vh',
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000039',
  },
  textNameFile: {
    color: '#f0f7da',
    // color: '#002939',
    padding: 10,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  }
})

export default Audiolist;
