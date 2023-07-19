import React, { useState } from 'react';
import Colors from './Colors';
import SearchBar from './SearchBar';
import VideoCard from './VideoCard';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; // Importe ScrollView
import VideoList from './VideoList';

const HomeScreen = () => {
  const videoData = [
    {
      title: 'Video 1',
      image: require('../assets/img/Video.jpeg'),
    },
    {
      title: 'Video 2',
      image: require('../assets/img/Video.jpeg'),
    },
    {
      title: 'Video 3',
      image: require('../assets/img/Video.jpeg'),
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  const renderVideoCard = ({ item }) => {
    return <VideoCard title={item.title} image={item.image} />;
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <Text style={styles.text}>Conheça nossos produtos</Text>
      <View style={styles.carouselContainer}>
        <Carousel
          data={videoData}
          renderItem={renderVideoCard}
          sliderWidth={400}
          itemWidth={264}
          layout={'stack'}
          layoutCardOffset={20}
          onSnapToItem={(index) => setActiveSlide(index)}
          autoplay={true}
          autoplayDelay={1000}
          autoplayInterval={3000}
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

      <Text style={styles.text}>Populares</Text>
      

      {/* Lista de vídeos em uma linha */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.videoListContainer}>
          {videoData.map((video, index) => (
           <VideoList key={index} videos={videoData} />
          ))}
        </View>
      </ScrollView>

      {/* Alteração do estilo do "Ver mais" */}
      <Text style={styles.viewMoreText}>Ver mais</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secundary,
    marginVertical: 20,
    marginLeft: 15,
  },
  carouselContainer: {
    alignItems: 'center',
    marginTop: 20,
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
  viewMoreText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
