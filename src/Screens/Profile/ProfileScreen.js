import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import your icon library
import { getUser, logoutUser } from '../../controllers/UsuarioController';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

export default function ProfileScreen() {
  const [username, setUsername] = useState('');
  const navigation = useNavigation(); // Get the navigation object

  useEffect(() => {
    async function fetchUsername() {
      const user = await getUser();
      setUsername(user.nome);
    }

    fetchUsername();
  }, []);

  const onLogout = () => {
    logoutUser();
    navigation.navigate('Login'); // Navigate to Login screen on logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {username}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Icon name="logout" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    width: '80%',
    height: 31,
    left: 16,
    top: 50,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 20,
    color: '#340059',
  },
  logoutButton: {
    position: 'absolute',
    width: 35,
    height: 35,
    left: 330,
    top: 46,
    backgroundColor: '#7E00D8',
    borderRadius: 35/2, // For circular shape
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Add rest of your styles
});
