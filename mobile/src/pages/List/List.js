import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import {
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import styles from './styles';
import logo from '../../assets/logo.png';
import SpotList from '../../components/spotList/SpotList';

export default function List({ navigation }) {
  const [technologies, setTechnologies] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.238.2:3333', {
        query: { user_id }
      });

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA' }`);
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('technologies').then(techs => {
      const techsArray = techs.split(',').map(technology => technology.trim());

      setTechnologies(techsArray);
    });
  }, []);

  async function handleLogout() {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container} >
      <TouchableOpacity onPress={handleLogout}>
        <Image style={styles.logo} source={logo} />
      </TouchableOpacity>

      <ScrollView>
        {technologies.map(technology => {
          return (
            <SpotList key={technology} technology={technology} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}