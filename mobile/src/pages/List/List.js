import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, Image } from 'react-native';

import styles from './styles';

import logo from '../../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);

  return (
    <View style={styles.container} >
      <Image source={logo} />
      <Text>{techs}</Text>
    </View>
  );
}