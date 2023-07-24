import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../../Styles/Colors'; // Importe o arquivo de cores ou defina as cores diretamente neste arquivo

const VideoList = ({ videos, onVideoSelect }) => {
  return (
    <View style={styles.container}>
      {videos.map((video, index) => (
        <TouchableOpacity key={index} onPress={() => onVideoSelect(video)}>
          <View style={styles.videoContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: video.thumbnail }} style={styles.image} />
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  videoContainer: {
    boxSizing: 'border-box',
    position: 'relative',
    width: 263,
    height: 150,
    margin: 8,
    backgroundColor: Colors.white,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.secondary,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'absolute',
    top: -9,
    left: -19,
    width: 300,
    height: 168,
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
});

export default VideoList;
