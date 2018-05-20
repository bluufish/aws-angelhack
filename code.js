import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBoufrR6OEcVwLQcqNd2-8IQF2MEjh10V8",
  authDomain: "qancierge.firebaseapp.com",
  databaseURL: "https://qancierge.firebaseio.com",
  projectId: "chat",
  storageBucket: "qancierge.appspot.com",
  messagingSenderId: "198115110173"
};


export default class ConciergeScreen4 extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    firebase.initializeApp(config);
    firebase.database().ref('qancierge').child('chat').remove();
    firebase.database().ref('qancierge/chat').on('value', (snapshot) => {
      console.log('value = ' + '[' + JSON.stringify(snapshot) + ']');
      msg = [];
      snapshot.forEach(function (child){
        msg.push(child.val());
      })
      this.setState({messages: msg});
      //if (msg != []) this.setState({messages:  });
      //this.state.messages = 
      // this.setState({
      //   messages: JSON.stringify(snapshot);
      // })
      //Alert.alert(JSON.stringify(snapshot));
    })
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'This is the beginning of your conversation with David...',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        /*{
          _id: 2,
          text: 'developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },*/
      ],
    })
  }
  onSend(messages = []) {
    var previous = this.state.messages;
    var newmsg = GiftedChat.append(previous, messages);
    this.setState(previousState => {
      //console.log("12345" + JSON.stringify(GiftedChat.append(previousState.messages, messages)));
      return {messages: newmsg};
    });
    firebase.database().ref('qancierge').child('chat').remove();
    var newMessage = firebase.database().ref('qancierge').child("chat");
    //console.log("length" + JSON.stringify(newmsg));
    for (var i=0, len=newmsg.length; i < len; i++){
      console.log(newmsg[i]);
      newMessage.push(newmsg[i]).catch((err) => {
        console.log('error = ' + err);
    })
    };
  }

  

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        createdAt={new Date()}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
          name: 'Zich'
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
