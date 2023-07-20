import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';

const ShopScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Shop Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

export default ShopScreen;
