import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from './Colors';

const AnalysisScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Analysis Page</Text>
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

export default AnalysisScreen;
