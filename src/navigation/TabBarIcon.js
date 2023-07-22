import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../Styles/Colors';

const TabBarIcon = ({ name }) => {
  return <MaterialIcons name={name} size={24} color={Colors.white} />;
};

export default TabBarIcon;
