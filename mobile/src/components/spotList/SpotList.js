import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import styles from './styles';

function SpotList({ technology, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spots', {
        params: { technology }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  function handleNavigate(id) {
    navigation.navigate('Book', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas que utilizam <Text style={styles.bold}>{technology}</Text></Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url.replace('localhost', '192.168.238.2') }} />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'GRATUITO'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default withNavigation(SpotList);