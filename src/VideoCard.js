import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Image } from 'react-native-paper';
const videoImage = require('../assets/img/Video.jpeg');

const VideoCard = () => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Cover source={videoImage} style={styles.image} />
      <View style={styles.tagContainer}>
        <Title style={styles.tagText}>Discador ilimitado</Title>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 264,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#340059',
  },
  image: {
    width: 235,
    height: 144,
    position: 'absolute',
    top: 12,
    left: 15,
  },
  tagContainer: {
    position: 'absolute',
    width: 141,
    height: 22,
    top: 170,
    left: 55,
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 18,
    lineHeight: 22,
    color: '#340059',
    textTransform: 'capitalize',
  },
});

export default VideoCard;
