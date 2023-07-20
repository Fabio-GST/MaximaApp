import React, { useState } from 'react';
import Colors from '../../Styles/Colors';
import SearchBar from './SearchBar';
import VideoCard from './VideoCard';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import VideoList from './VideoList';
import globalStyles from '../../Styles/GlobalStyles';
import VideoScreen from '../Video/VideoScreen';

const HomeScreen = () => {
  const videoData = [
    {
      title: 'Video 1',
      image: require('../../../assets/img/Video.jpeg'),
    },
    {
      title: 'Video 2',
      image: require('../../../assets/img/Video.jpeg'),
    },
    {
      title: 'Video 3',
      image: require('../../../assets/img/Video.jpeg'),
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null); // Estado para controlar o vídeo selecionado

  const renderVideoCard = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedVideo(item)}>
        <VideoCard title={item.title} image={item.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <Text style={globalStyles.titleText}>Conheça nossos produtos</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          data={videoData}
          renderItem={renderVideoCard}
          sliderWidth={400}
          itemWidth={264}
          layout={'stack'}
          layoutCardOffset={20}
          onSnapToItem={(index) => setActiveSlide(index)}
          lockScrollTimeoutDuration={250}
          loopClonesPerSide={2}
          loop={true}
        />
      </View>
      <Pagination
        dotsLength={videoData.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: Colors.primary,
        }}
      />

      <View style={styles.row}>
        <Text style={globalStyles.titleText}>Populares</Text>
        <Text style={globalStyles.viewMoreText}>Ver mais</Text>
      </View>

      {/* Lista de vídeos em uma linha */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.videoListContainer}>
          {videoData.map((video, index) => (
            <VideoList key={index} videos={videoData} />
          ))}
        </View>
      </ScrollView>

      {/* Exibir o modal com o vídeo selecionado */}
      {selectedVideo && (
        <VideoScreen
          videoTitle={selectedVideo.title}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    gap: 20,
  },
  carouselContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  paginationContainer: {
    paddingVertical: 8,
    backgroundColor: Colors.white,
  },
  videoListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;