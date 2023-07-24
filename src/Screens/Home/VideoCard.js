import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Title } from 'react-native-paper';
import Colors from '../../Styles/Colors';

const VideoCard = ({ image, title }) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Cover source={{ uri: image }} style={styles.image} />
      <View style={styles.tagContainer}>
        <Text style={styles.tagText} numberOfLines={1} ellipsizeMode='tail'>
          {title}
        </Text>
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
    width: 235,
    height: 22,
    left: 15,
    top: 170,
  },
  tagText: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.secondary,
    textTransform: 'capitalize',
  },
});

export default VideoCard;
