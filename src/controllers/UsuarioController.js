import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.15.158:3000/api/usuarios';

export const loginUser = async (login, senha) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, senha })
        });

        const data = await response.json();

        if (data.error) {
            console.error('Data Error:', data.error);  // Log the error from response
            setError(data.error);
        } else {
            // Save user data to AsyncStorage
            await AsyncStorage.setItem('@user', JSON.stringify(data));
            console.log('Usuário autenticado com sucesso:', data);
        }
    } catch (err) {
        console.error('Fetch Error:', err);  // Log the fetch error
        setError('Ocorreu um erro durante a autenticação');
    }
}


export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem('@user');
        return user != null ? JSON.parse(user) : null;
    } catch (err) {
        console.error(err);
    }
}

export const logoutUser = async () => {
    try {
        await AsyncStorage.removeItem('@user');
    } catch (err) {
        console.error(err);
    }
}


