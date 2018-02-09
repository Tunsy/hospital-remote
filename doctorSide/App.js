import React from 'react';
import { StyleSheet, Text, View, ScrollView,FlatList,AsyncStorage,AppRegistry,ActivityIndicator, ListView, TouchableHighlight} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import * as firebase from 'firebase';



// var config = {
//   apiKey: "AIzaSyBb3OAt1cRLrWiuspNiaBIn0NV7A-XQ6Ts",
//   authDomain: "hospital-remote.firebaseapp.com",
//   databaseURL: "https://hospital-remote.firebaseio.com",
//   projectId: "hospital-remote",
//   storageBucket: "hospital-remote.appspot.com",
//   messagingSenderId: "438761389964"
// };


// const firebaseApp = firebase.initializeApp(config);
// const rootRef = firebaseApp.database().ref('server/saving-data');
// const typesRef=rootRef.child('doctorType');
// const doctorRef = typesRef.child('doctor');
// const nurseRef = typesRef.child('nurse');
// const nurseAssistantRef = typesRef.child('nurseAssistant');



var patientList=[
  {name: 'Meet Patel',key:310,risk:3,type:'Emergency'},
  {name: 'Chris Wong',key:305,risk:2,type:'Happy'}
];
 
class QueueItem extends React.Component{
  // constructor(props) {
  //   super(props);
  //   this.state={testText:'Test Text'};
  // }
  
  render(){
    // if (nurseRef!=null){
    //   testText=nurseRef.key;
    // }else{
    //   testText="nothing here";
    // }
    // nurseRef.once('value').then(snapshot => {
    //   // snapshot.val() is the dictionary with all your keys/values from the '/store' path
    //   snapshot.forEach(function(item) {
    //     var key = item.key;
    //     var itemRef = nurseRef.ref(key);
    //     itemRef.once('value').then(function(itemSnapshot) {
    //       var datetime = itemSnapshot.val().datetime;
    //       var message = itemSnapshot.val().message;
    //       pushAnnouncement(datetime, message);
    //     });
    //   })
    // });

    //this.setState({ testText: 'The state is updated' })
    return (
      // <Text style={styles.queueItemText}>{this.state.testText}</Text>
      <List>
      <FlatList
        data={patientList}
        renderItem={({ item }) => (
          <ListItem
            rightIcon={{name:'done'}}
            roundAvatar
            chevronColor={item.risk==3?'#e53935':item.risk==2?'#FFF176':'#4CAF50'}
            title={item.name + " requested " + item.type}
            subtitle={'Room: '+item.key}
            avatar={require('./Images/avatar1.jpg')}
          />
        )}
      />
    </List>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <QueueItem/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  scrollViewContainer:{
    flex:1,
  },
  queueItemText:{
    padding: 10,
    fontSize: 20,
    height: 70,
    flex:1,
  },
});
