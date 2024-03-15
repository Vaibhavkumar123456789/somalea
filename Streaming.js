import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  ImageBackground,
  Pressable,
  FlatList,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeHeader from '../Custom/HomeHeader';
import {textStyle, imageStyle, viewStyle} from '../../styles/style';
import DeviceInfo from 'react-native-device-info';
import PropertySale from '../Home/PropertySale';
import PropertyRent from '../Home/PropertyRent';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import Loader from '../Custom/Loader';
import {Api, HomeProperies, LocalStorage} from '../../backend/Api';
import {
  AsyncStorageSettoken,
  AsyncStorageSetUser,
  Login,
} from '../../backend/Api';
import Chat from './Chat';
const {width} = Dimensions.get('window');
const Streaming = ({navigation, route}) => {
  const [property, setProperty] = useState([
    {
      source: require('../images/img.png'),
      title: 'Learn How to Increase\nMind’s Potential',
      subTitle: 'Mon, Dec 24 - 01:00 -\n01:30 PM',
      sub2Title: '252 1st Avenue',
    },
    {
      source: require('../images/img1.png'),
      title: 'Learn How to Increase\nMind’s Potential',
      subTitle: 'Mon, Dec 24 - 01:00 -\n01:30 PM',
      sub2Title: '252 1st Avenue',
    },
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <Loader status={state.isLoading} /> */}
      <StatusBar barStyle="dark-content" backgroundColor="#DC2F2E" />
      <HomeHeader
        menuOption={() => navigation.openDrawer()}
        leftIcon={require('../images/menu.png')}
        secondRightIcon={require('../images/pic/notification.png')}
        rightOption={() => {
          navigation.navigate('Notification');
        }}
      />
      <Chat />
    </SafeAreaView>
  );
};

export default Streaming;
const styles = StyleSheet.create({
  newstext: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    // fontWeight: '700',
    color: '#182F2B',
    marginLeft: 20,
    marginTop: 20,
  },
});
