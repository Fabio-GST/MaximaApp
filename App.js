import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import TabButton from './src/TabButton';
import Colors from './src/Colors';
import AnalysisScreen from './src/AnalysisScreen';
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import ShopScreen from './src/ShopScreen';
import { StyleSheet } from 'react-native';

const TabArr = [
  { route: 'Home', label: 'Home', icon: 'home', component: HomeScreen },
  { route: 'Shop', label: 'Shop', icon: 'store', component: ShopScreen },
  { route: 'Analysis', label: 'Analysis', icon: 'analytics', component: AnalysisScreen },
  { route: 'Profile', label: 'Profile', icon: 'person', component: ProfileScreen },
];

const Tab = createBottomTabNavigator();

const App = () => {
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
