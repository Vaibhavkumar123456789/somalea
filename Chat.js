import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppState,
  SafeAreaView,
  StatusBarLight,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  Pressable,
  Alert,
  ImageBackground,
} from 'react-native';
import Backend from './Backend.js';
import {GiftedChat, Time, Send, InputToolbar} from 'react-native-gifted-chat';
// import ImagePicker from 'react-native-image-picker';
import Bubble from 'react-native-gifted-chat/lib/Bubble';

// import store from '../redux/store';

const window = Dimensions.get('window');
type Props = {};
const options = {
  title: 'Select Document',
  maxWidth: 300,
  maxHeight: 500,

  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default class Chat extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Chat Consulation',
      animations: {
        setRoot: {
          waitForRender: false,
        },
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      recognized: '',
      started: '',
      text: '',
      mystatus: false,
      results: [],
      messages: [],
      texts: '',
      remain: '',
    };
  }

  _handleAppStateChange = nextAppState => {
    //  this.setState({appState: nextAppState});
  };

  renderBubble(props) {
    return (
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.6)',
          borderRadius: 12,
          marginBottom: 6,
          borderColor: '#979797',
          borderWidth: 1,
          flexDirection: 'row',
        }}>
        <Text
          style={{
            color: '#7BAAED',
            fontFamily: 'Nunito-Bold',
            fontSize: 22,
            margin: 4,
            marginLeft: 8,
            marginBottom: 1,
          }}>
          {props.currentMessage.user.name} :
        </Text>

        <Text
          style={{
            color: 'white',
            fontFamily: 'Nunito-Bold',
            fontSize: 22,
            margin: 4,
            marginTop: 1,
          }}>
          {props.currentMessage.text}
        </Text>
      </View>
    );
  }

  renderSend(props) {
    return (
      <Send {...props}>
        <View style={{backgroundColor: 'transparent'}}>
          <Image
            source={require('../images/chaticon.png')}
            style={{
              height: 38,
              width: 38,
              resizeMode: 'contain',
              backgroundColor: 'transparent',
              marginRight: 2,
              marginBottom: 2,
            }}
          />
        </View>
      </Send>
    );
  }
  renderTime = props => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: {
            color: 'grey',
          },
          right: {
            color: 'grey',
          },
        }}
      />
    );
  };
  renderMessages = msg => {
    //  alert(JSON.stringify(msg.user._id))

    let message = msg.currentMessage;
    var ColorCode =
      'rgb(' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ',' +
      Math.floor(Math.random() * 256) +
      ')';

    console.log('single message', message);
    return (
      <View>
        <View
          style={{
            backgroundColor: '#00000050',
            borderRadius: 12,
            marginBottom: 6,
            borderColor: '#979797',
            borderWidth: 0,
            marginLeft: 6,
            width: window.width - 126,
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: 10,
              height: 10,
              backgroundColor: '#3DD7BB',
              borderRadius: 5,
              marginLeft: 4,
              marginTop: 8,
            }}></View>
          <Text
            style={{
              color: '#3DD7BB',
              fontFamily: 'Poppins-Medium',
              fontSize: 12,
              margin: 4,
              marginLeft: 2,
              padding: 1,
              lineHeight: 18,
              marginBottom: 1,
            }}>
            {message.user.name}:{' '}
          </Text>

          <Text
            style={{
              color: 'white',
              fontFamily: 'Nunito-Regular',
              fontSize: 12,
              margin: 4,
              marginLeft: -2,
              padding: 1,
              lineHeight: 18,
              marginTop: 4,
            }}>
            {message.text}{' '}
          </Text>
        </View>
      </View>
    );
  };
  renderInputToolbar(props) {
    //Add the extra styles via containerStyle
    return (
      <InputToolbar
        {...props}
        textInputStyle={{color: 'black'}}
        containerStyle={{
          backgroundColor: 'white',
          marginLeft: 10,
          borderRadius: 20,
          borderWidth: 0,
          color: 'black',
          marginBottom: 0,
          marginRight: 10,
        }}
      />
    );
  }
  render() {
    return (
      <GiftedChat
        renderUsernameOnMessage={true}
        messages={this.state.messages}
        renderInputToolbar={this.renderInputToolbar}
        renderBubble={this.renderBubble}
        renderSend={this.renderSend}
        renderMessage={message => this.renderMessages(message)}
        onInputTextChanged={text => {
          // alert(text)
        }}
        onSend={message => {
          Backend.sendMessage(message);
        }}
        user={{
          _id: '1',
          name: 'varun',
        }}
      />
    );
  }
  componentDidMount() {
    // alert(JSON.stringify(Global.data));
    //  alert('hi')
    // this.listener = EventRegister.addEventListener('pujaend', data => {
    //   this.props.navigation.replace('Rating');
    // });
    //  GLOBAL.mystatus = "Online";
    // Backend.updateMessage(message => {
    //     alert(JSON.stringify(message))
    //
    //
    // })
    Backend.loadMessages(message => {
      //  alert(JSON.stringify(message))
      if (message.length == 0) {
      } else {
        this.setState(previousState => {
          return {
            messages: GiftedChat.append(previousState.messages, message),
          };
        });
      }
    });
  }

  componentWillUnmount() {
    //  Backend.closeChat();
  }
}
const styles = StyleSheet.create({
  wrapper: {},
  container: {
    flex: 1,
    backgroundColor: '#001739',
  },
  slide1: {
    marginLeft: 50,

    width: window.width - 50,
    height: 300,
    resizeMode: 'contain',
    marginTop: window.height / 2 - 200,
  },
  loading: {
    position: 'absolute',
    left: window.width / 2 - 30,

    top: window.height / 2,

    opacity: 0.5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
