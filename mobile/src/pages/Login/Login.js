import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from './styles';

import logo from '../../assets/logo.png';

export default function Login() {
  return (
    <KeyboardAvoidingView behavior='padding' enabled={Platform.OS === 'ios'} style={styles.container} >
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
        />

        <Text style={styles.label} >TECNOLOGIAS *</Text>
        <TextInput
          style={styles.input}
          placeholder='Tecnologias de interesse'
          placeholderTextColor='#999'
          autoCapitalize='words'
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText} >Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}