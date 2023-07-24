import React, { useEffect, useState } from 'react';
import { getUser } from './src/controllers/UsuarioController';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/login/LoginScreen'
import TabNavigator from './src/navigation/TabNavigator';

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      setUser(user);
    }

    checkUser();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen 
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}  // This removes the header
          />
        ) : (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}  // This removes the header
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

