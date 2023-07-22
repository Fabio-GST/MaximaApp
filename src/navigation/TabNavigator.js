import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { TabArr } from './NavigationTabs';
import TabButton from './TabButton';
import Colors from '../Styles/Colors'; // Ajuste este caminho para a localização correta de Colors

const Tab = createBottomTabNavigator();

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

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      lazy: false,
    }}
  >
    {TabArr.map((item, index) => (
      <Tab.Screen
        key={index}
        name={item.route}
        component={item.component}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => <TabButton {...props} item={item} />,
        }}
      />
    ))}
  </Tab.Navigator>
);
