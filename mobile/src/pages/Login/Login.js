import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import api from '../../services/api';

import styles from './styles';
import logo from '../../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [technologies, setTechnologies] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user)
        navigation.navigate('List');
    });
  }, []);

  async function handleSubmit() {
    const response = await api.post('/sessions', {
      email
    });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('technologies', technologies.toUpperCase());

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios' || Platform.OS === 'android'}
      behavior='padding'
      style={styles.container}
    >
      <Image source={logo} />

      <View style={styles.form} >
        <Text style={styles.label} >SEU E-MAIL *</Text>
        <TextInput
          style={styles.input}
          placeholder='Seu melhor e-mail'
          placeholderTextColor='#999'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label} >TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder='Tecnologias de interesse'
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false}
          value={technologies}
          onChangeText={setTechnologies}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button} >
          <Text style={styles.buttonText} >Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}