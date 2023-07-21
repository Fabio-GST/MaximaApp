import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Image } from 'react-native-paper';
import Colors from '../../Styles/Colors';
const videoImage = require('../../../assets/img/Video.jpeg');

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
    borderColor: Colors.secondary,
  },
  image: {
    width: 235,
    height: 144,
    position: 'absolute',
    top: 12,
    left: 15,
    borderWidth: 1,
    borderColor: Colors.secondary,

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
    color: Colors.secondary,
    textTransform: 'capitalize',
  },
});

export default VideoCard;
