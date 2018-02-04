import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, AppRegistry, Image} from 'react-native';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDoORLUMSICcRc_t-m2p4SixgevqcMjth",
  authDomain: "hospital-remote.firebaseapp.com",
  databaseURL: "https://hospital-remote.firebaseio.com/",
  storageBucket: "gs://hospital-remote.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class RequestButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isHighlighted: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isHighlighted: !prevState.isHighlighted
    }));

    let requestType = null;
    if(this.props.iconName === 'warning'){
      requestType = 'emergency';
    }else if(this.props.iconName === 'chat'){
      requestType = 'happy';
    }else if(this.props.iconName === 'live-help'){
      requestType = 'custom';
    }else if(this.props.iconName === 'local-hospital'){
      requestType = 'medicine';
    }else if(this.props.iconName === 'local-dining'){
      requestType = 'food';
    }else if(this.props.iconName === 'hotel'){
      requestType = 'poop';
    }

    if(!this.state.isHighlighted){
      fetch('http://169.234.107.25:3000/patientRequest', {
        method: 'POST',
        headers: {
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          type: requestType,
          room: '420',
          fallRisk: '3',
          name: 'Meet Patel',
        })
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
      fetch('http://169.234.107.25:3000/patientRequest', {
        method: 'DELETE',
        headers: {
          Accept: 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          type: requestType,
          room: '420',
          fallRisk: '3' 
        })
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  render(){
    let isHighlighted = this.state.isHighlighted;
    let iconButton = null;
    if(isHighlighted){
      iconButton = <Icon name={this.props.iconName} raised={true} size={40} color="#e74c3c" onPress={this.handleClick}/>;
    }else{
      iconButton = <Icon name={this.props.iconName} raised={true} size={40} color="#2980b9" onPress={this.handleClick}/>;
    }

    return (
      <View>
        {iconButton}
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
            <Image
            style={{width: 300, height: 100}}
            source={{uri: 'https://imgur.com/RbOzeZD.png'}}
          />
        </View> 
        <View style={styles.logo}>
            <RequestButton iconName='warning'/>
            <RequestButton iconName='chat'/>
        </View>
        <View style={styles.logo}>
            <RequestButton iconName='live-help'/>
            <RequestButton iconName='local-hospital'/>
        </View>
        <View style={styles.logo}>
            <RequestButton iconName='local-dining'/>
            <RequestButton iconName='hotel'/>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#2980b9',
  },
  logo: {
    flex: 2,
    backgroundColor: '#2980b9',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  requestButton: {
    flex: 1,
    width: 50,
    height: 50
  },
});
