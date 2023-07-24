import React, { useState } from 'react';
import { Image, View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { loginUser } from '../controllers/UsuarioController';
import { Feather } from '@expo/vector-icons';  // Import Feather from @expo/vector-icons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Colors from '../Styles/Colors';

export default function LoginScreen() {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [secureText, setSecureText] = useState(true);
    const navigation = useNavigation(); // Get the navigation object

    const handleLogin = async () => {
        try {
            await loginUser(login, senha);
            navigation.navigate('Main'); // Navigate to Main screen on successful login
        } catch (e) {
            Alert.alert('Erro de Login', 'Falha ao fazer login. Verifique suas credenciais.');
        }
    };
    
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/logo_vertical_ALTA_preferencial_MAXIMAVOIP.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <Input
                placeholder="Usuário"
                onChangeText={setLogin}
                value={login}
            />
            <Input
                placeholder="Senha"
                onChangeText={setSenha}
                value={senha}
                secureTextEntry={secureText}
                rightIcon={
                    <Feather  // Use Feather component for the icon
                        name={secureText ? 'eye-off' : 'eye'}
                        size={24}
                        color='black'
                        onPress={() => setSecureText(!secureText)}
                    />
                }
            />
            <Button
                title="Entrar"
                onPress={handleLogin}
                buttonStyle={styles.loginButton}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,

    },
    logo: {
        width: '100%',
        alignSelf: 'center',

    },
    loginButton: {
        backgroundColor: Colors.primary, // Change this to your primary color
    },
});
