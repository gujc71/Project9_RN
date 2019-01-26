import React, { Component } from 'react';
import {FlatList, View, TouchableOpacity, StyleSheet} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'

import dateFormat from 'dateformat';
import firebase from 'react-native-firebase';

export default class HomeTab extends Component {

  state = {
    refreshing: false,
    boards: []
  };

  componentWillMount () {
    const _this = this;
    firebase.firestore().collection("boards").orderBy("brddate", "desc")
        .onSnapshot(function(snapshot) {
            var newlist = [];
            let boards = _this.state.boards;
            snapshot.docChanges.forEach(function(change) {
                var row = change.doc.data();
                if (change.type === "added") {
                  if (newlist) newlist.push(row);
                  else _this.setState( {..._this.state, boards: [row].concat(_this.state.boards) });
                } else
                if (change.type === "modified") {
                    let inx = boards.findIndex(board => row.brdno === board.brdno);
                    if (inx===-1) {                          // new : Insert
                      _this.setState( {..._this.state, boards: [row].concat(_this.state.boards) });
                    } else {                               // Update
                      boards[inx]=row;
                      _this.setState({..._this.state, boards: boards, refreshing: !_this.state.refreshing});
                    }                     
                } else
                if (change.type === "removed") {
                  _this.setState({..._this.state, boards: boards.filter(board => row.brdno !== board.brdno) });
                }
            });
            if (newlist.length>0) {
              _this.setState( {..._this.state, boards: newlist.concat(_this.state.boards) });
              newlist = null;
            }
    });
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#f3f3f3'}}>
        <FlatList
          extraData={this.state.refreshing}
          data={this.state.boards}
          keyExtractor={(item) => item.brdno}
          renderItem={({ item }) => {
            return (
              <ListItem title={item.brdtitle} subtitle={item.brdwriter} hideChevron={true} 
                  leftIcon={{ name: 'user', type:'font-awesome' }}
                  badge={{ value: dateFormat(item.brddate, "yyyy-mm-dd"), textStyle: { color: 'gray' }, containerStyle: { backgroundColor: "white" } }}
                  subtitleStyle={{ fontSize: 12 }}
                  onPress={() => this.props.navigation.navigate('Details', {board: item})} />
            );
          }}
        />
        <TouchableOpacity style={styles.floatingButton}>
          <Icon name='plus' type='font-awesome' size={20} color="#01a699" onPress={() => this.props.navigation.navigate('NewScreen')} />
        </TouchableOpacity>        
      </View>        
    );
  }
}

styles = StyleSheet.create({
  floatingButton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    height:50,
    width:50,
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10,
    backgroundColor:'#fff',
    borderRadius:100,
  },
})
