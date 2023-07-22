import React, { useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Colors from '../Styles/Colors';
import TabBarIcon from './TabBarIcon';

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
      viewRef.current.animate(animate1, 100); 
      circleRef.current.animate(circle1, 100); 
      textRef.current.transitionTo({ scale: 1 }, 100); 
    } else {
      viewRef.current.animate(animate2, 100); 
      circleRef.current.animate(circle2, 100); 
      textRef.current.transitionTo({ scale: 0 }, 100); 
    }
  }, [focused]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0} style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <TabBarIcon name={item.icon} />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default TabButton;
