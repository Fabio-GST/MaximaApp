import React, { useState, useEffect } from 'react';
import Colors from '../../Styles/Colors';
import SearchBar from './SearchBar';
import VideoCard from './VideoCard';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import VideoList from './VideoList';
import globalStyles from '../../Styles/GlobalStyles';
import VideoScreen from './Video/VideoScreen';
import { fetchVideos } from '../../controllers/VideoController';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [videoData, setVideoData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos()
      .then(videos => setVideoData(videos))
      .catch(error => console.error('Error:', error));
  }, []);

  const renderVideoCard = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => setSelectedVideo(item)}>
        <VideoCard title={item.title} image={item.thumbnail} />
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
        <TouchableOpacity onPress={() => navigation.navigate('VideoListScreen', { videos: videoData })}> 
          <Text style={globalStyles.viewMoreText}>Ver mais</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.videoListContainer}>
          <VideoList videos={videoData} onVideoSelect={setSelectedVideo} />
        </View>
      </ScrollView>

      {selectedVideo && (
        <VideoScreen
          video={selectedVideo} 
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
