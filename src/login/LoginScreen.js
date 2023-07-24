import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { loginUser } from '../controllers/UsuarioController';


const LoginScreen = () => {
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const data = await loginUser(login, senha);

            if (data.error) {
                setError(data.error);
            } else {
                // Aqui você pode guardar o token do usuário no armazenamento local do dispositivo
                console.log('Usuário autenticado com sucesso:', data);
            }
        } catch (err) {
            setError('Ocorreu um erro durante a autenticação');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.error}>{error}</Text>
            <TextInput
                style={styles.input}
                placeholder="Usuário"
                value={login}
                onChangeText={text => setLogin(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={text => setSenha(text)}
                secureTextEntry
            />
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
    error: {
        color: 'red',
    },
});

export default LoginScreen;
