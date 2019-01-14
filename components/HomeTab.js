import React, { Component } from 'react';
import faker from 'faker';
import {FlatList, View, TouchableOpacity, StyleSheet, Modal, Text} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'

const randomUsers = (count = 10) => {
  const arr = [];
  for (let i = 0; i < count; i ++) {
    arr.push({
      key: faker.random.uuid(),
      name: faker.name.firstName(),
      avatar: faker.image.avatar(),
    });
  }

  return arr;
};

export default class HomeTab extends Component {
  static navigationOptions = {
    title: 'Project9',
  };

  state = {
    refreshing: false,
    data: randomUsers(20),
    modalVisible: false,
    selectedItem: {},
  };

  onEndReached = () => {
    this.setState(state => ({
      data: [
        ...state.data,
        ...randomUsers(),
      ]
    }));
  };

  onRefresh = () => {
    this.setState({
      data: randomUsers(20),
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handleLongPress (item) {
    this.setState({modalVisible: true, selectedItem: item});
  }

  handleShowDetail () {
    this.setModalVisible(false);
    this.props.navigation.navigate('Details', {title: this.state.selectedItem.name})
  }

  handleDelete () {
    const key = this.state.selectedItem.key;
    this.setState({modalVisible: false, data: this.state.data.filter(row => row.key !== key)});
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => {
            return (
              <ListItem title={item.name} avatar={{ source: { uri: item.avatar } }}
                  leftAvatar={{ source: { uri: item.avatar } }}
                  onPress={() => this.props.navigation.navigate('Details', {title: item.name})} 
                  onLongPress={()=>this.handleLongPress(item)}/>
            );
          }}
        />
        <TouchableOpacity style={styles.floatingButton}>
          <Icon name='plus' type='font-awesome' size={20} color="#01a699" onPress={() => this.props.navigation.navigate('NewScreen')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.setModalVisible(false)}>
          <Modal animationType="slide" transparent={true} visible={this.state.modalVisible} onRequestClose={() => {}}>
            <View style={styles.dialog}>
              <View style={styles.dialogView}>
                <Text style={styles.dialogTitle}>{this.state.selectedItem.name}</Text>
                <TouchableOpacity onPress={() => this.handleShowDetail()}>
                  <Text style={styles.dialogItem}>View Detail</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleDelete()}><Text style={styles.dialogItem}>Delete</Text></TouchableOpacity>
              </View>
            </View>
        </Modal>          
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
  dialog: {
    flex: 1, 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialogView: {
    padding: 10,
  	borderWidth: 1,
    borderColor: '#000',
    borderRadius:10,
	  backgroundColor: '#fff', 
    width: 250,
    height: 150
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  dialogItem: {
    fontSize: 16,
    marginTop: 20
  },
})