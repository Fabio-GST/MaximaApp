import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'material-design-icons';
import * as Animatable from 'react-native-animatable';
import Colors from './src/Colors';
import AnalysisScreen from './src/AnalysisScreen';
import HomeScreen from './src/HomeScreen';
import ProfileScreen from './src/ProfileScreen';
import ShopScreen from './src/ShopScreen';

const TabArr = [
  { route: 'Home', label: 'Home', icon: 'home', component: HomeScreen },
  { route: 'Shop', label: 'Shop', icon: 'shopping-bag', component: ShopScreen },
  { route: 'Analysis', label: 'Analysis', icon: 'bar-chart-2', component: AnalysisScreen },
  { route: 'Profile', label: 'Profile', icon: 'user', component: ProfileScreen },
];

const Tab = createBottomTabNavigator();

const animate1 = { 0: { scale: 0.5, translateY: 7 }, 1: { scale: 1.2, translateY: -24 } };
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } };

const circle1 = { 0: { scale: 0 }, 1: { scale: 1 } };
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

const TabButton = ({ item, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });


    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1} style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Icon name={item.icon} size={24} color={Colors.white} />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default function App() {
  const [loaded] = useFonts({
    Feather: require('react-native-vector-icons/Fonts/Feather.ttf'),
  });

  if (!loaded) {
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  btn: {
    width: 65,
    height: 65,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.white,
    position: 'relative',
  },
  iconBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 30,
    transform: [{ scale: 0 }],
    borderColor: Colors.white,
    borderWidth: 7.5,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: Colors.white,
  },
});
