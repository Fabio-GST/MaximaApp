import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect }from 'react';
import TabButton from './src/Screens/Home/TabButton';
import Colors from './src/Styles/Colors';
import AnalysisScreen from './src/Screens/Analyse/AnalysisScreen';
import HomeScreen from './src/Screens/Home/HomeScreen';
import ProfileScreen from './src/Screens/Profile/ProfileScreen';
import ShopScreen from './src/Screens/Shop/ShopScreen';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import globalStyles from './src/Styles/GlobalStyles'; // Import your global styles

const TabArr = [
  { route: 'Home', label: 'Home', icon: 'home', component: HomeScreen },
  { route: 'Shop', label: 'Shop', icon: 'store', component: ShopScreen },
  { route: 'Analysis', label: 'Analysis', icon: 'analytics', component: AnalysisScreen },
  { route: 'Profile', label: 'Profile', icon: 'person', component: ProfileScreen },
];

const Tab = createBottomTabNavigator();

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        // carrega a fonte Oriole do assets/fonts
        Oriole: require('./assets/fonts/Oriole-Regular.ttf'),
        
      });
      setFontLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontLoaded) {
    // Render a placeholder, loading screen, or return null until the font is loaded
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          lazy: false,
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />,
              }}
            />
          );
        })}
      </Tab.Navigator>
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
