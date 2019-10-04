import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Image,
  TouchableOpacity
} from 'react-native';

import styles from './styles';
import logo from '../../assets/logo.png';
import SpotList from '../../components/spotList/SpotList';

export default function List({ navigation }) {
  const [technologies, setTechnologies] = useState([]);

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
          console.log(technologies);
          console.log(technology);
          return (
            <SpotList key={technology} technology={technology} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}