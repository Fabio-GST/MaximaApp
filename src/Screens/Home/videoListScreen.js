import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Button } from 'react-native';
import Colors from '../../Styles/Colors';

const VideoCard = ({ video }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{video.title}</Text>
      <Text style={styles.description}>{video.description}</Text>
    </View>
  );
};

const VideoListScreen = ({ route }) => {
  const { videos } = route.params;


  if (!videos) {
    return (
      <View>
        <Text>Videos não encontrados.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
