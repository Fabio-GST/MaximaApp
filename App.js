import { NavigationContainer } from '@react-navigation/native';
import { useFonts, TabNavigator } from './src/navigation';
import Colors from './src/Styles/Colors';
import { StyleSheet } from 'react-native';
import globalStyles from './src/Styles/GlobalStyles'; 

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.primary,
  },
});

export default App;
