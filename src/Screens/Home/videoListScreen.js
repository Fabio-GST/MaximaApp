import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';

const VideoCard = ({ video }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{video.title}</Text>
      <Image source={{ uri: video.thumbnail }} style={styles.image} />
      <Text style={styles.description}>{video.description}</Text>
    </View>
  );
};

const VideoListScreen = ({ videos }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <searchBar />
      {videos.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.white,
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 15,
    marginBottom: 16,
    padding: 21,
    backgroundColor: Colors.white,
    height: 150,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.secondary,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '60%',
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    lineHeight: 15,
    color: Colors.secondary,
  },
});

export default VideoListScreen;
