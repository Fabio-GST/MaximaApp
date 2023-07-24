// App.js
import { NavigationContainer } from '@react-navigation/native';
import { useFonts, TabNavigator } from './src/navigation';
import Colors from './src/Styles/Colors';
import { StyleSheet } from 'react-native';
import globalStyles from './src/Styles/GlobalStyles'; 

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.primary,
  },
});

export default App;


// Path: src/navigation/index.js
export { TabArr } from './NavigationTabs';
export { TabNavigator } from './TabNavigator';

// Path: src/navigation/NavigationTabs.js
import HomeScreen from '../Screens/Home/HomeScreen';
import ShopScreen from '../Screens/Shop/ShopScreen';
import AnalysisScreen from '../Screens/Analyse/AnalysisScreen';
import ProfileScreen from '../Screens/Profile/ProfileScreen';

export const TabArr = [
  { route: 'Home', label: 'Home', icon: 'home', component: HomeScreen },
  { route: 'Shop', label: 'Shop', icon: 'store', component: ShopScreen },
  { route: 'Analysis', label: 'Analysis', icon: 'analytics', component: AnalysisScreen },
  { route: 'Profile', label: 'Profile', icon: 'person', component: ProfileScreen },
];

// Path: src/navigation/TabNavigator.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { TabArr } from './NavigationTabs';
import TabButton from './TabButton';
import Colors from '../Styles/Colors'; // Ajuste este caminho para a localização correta de Colors

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.primary,
  },
});

export const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tabBar,
      lazy: false,
    }}
  >
    {TabArr.map((item, index) => (
      <Tab.Screen
        key={index}
        name={item.route}
        component={item.component}
        options={{
          tabBarShowLabel: false,
          tabBarButton: (props) => <TabButton {...props} item={item} />,
        }}
      />
    ))}
  </Tab.Navigator>
);

// Path: src/navigation/TabButton.js

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

// Path: src/navigation/TabBarIcon.js

import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../Styles/Colors';

const TabBarIcon = ({ name }) => {
  return <MaterialIcons name={name} size={24} color={Colors.white} />;
};

export default TabBarIcon;

// Path: src/Styles/Colors.js

const Colors = {
    primary: '#7E00D8',
    white: '#FFFFFF',
    black: '#000000',
    secondary: '#340059'
    // Adicione outras cores aqui
  };
  
  export default Colors;
  
// Path: src/Styles/GlobalStyles.js

import { StyleSheet } from 'react-native';
import Colors from './Colors';

const globalStyles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    color: Colors.secondary,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  viewMoreText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default globalStyles;

// Path: src/Screens/Home/HomeScreen.js

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

const HomeScreen = () => {
  const [videoData, setVideoData] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null); // Estado para controlar o vídeo selecionado

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
          video={selectedVideo} // Aqui está a correção
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

// Path: src/Screens/Home/SearchBar.js

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Styles/Colors';


const SearchBar = () => {
  const [selectedTag, setSelectedTag] = useState('Todos'); 

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchInputContainer}>
        <MaterialIcons name="search" size={24} color={Colors.white} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
        />
        <MaterialIcons
          name="keyboard-voice"
          size={24}
          color={Colors.white}
          style={styles.voiceIcon}
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagsContainer}>
        <Tag label="Todos" isSelected={selectedTag === 'Todos'} onPress={() => setSelectedTag('Todos')} />
        <Tag label="Discador" isSelected={selectedTag === 'Discador'} onPress={() => setSelectedTag('Discador')} />
        <Tag label="+zap" isSelected={selectedTag === '+zap'} onPress={() => setSelectedTag('+zap')} />
        <Tag label="0800" isSelected={selectedTag === '0800'} onPress={() => setSelectedTag('0800')} />
        <Tag label="Pabx" isSelected={selectedTag === 'PABX'} onPress={() => setSelectedTag('PABX')} />
        <Tag label="Robô" isSelected={selectedTag === 'ROBO de venda'} onPress={() => setSelectedTag('ROBO de venda')} />
        <Tag label="Sms" isSelected={selectedTag === 'SMS'} onPress={() => setSelectedTag('SMS')} />
        <Tag label="Ura" isSelected={selectedTag === 'URA'} onPress={() => setSelectedTag('URA')} />
      </ScrollView>
    </View>
  );
};

const Tag = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.tagContainer, isSelected && styles.tagContainerSelected]}>
        <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    marginTop: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    marginTop: 20,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  voiceIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: Colors.white,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 8,
  },
  tagContainer: {
    borderRadius: 25,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
    height: 35,
    width: 78,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagContainerSelected: {
    backgroundColor: Colors.secondary,
  },
  tagText: {
    fontSize: 16,
    color: Colors.white,
  },
  tagTextSelected: {
    color: Colors.white,
  },
});

export default SearchBar;

// Path: src/Screens/Home/Video/VideoScreen.js

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Colors from '../../../Styles/Colors';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoScreen = ({ video, onClose }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const playerRef = useRef(null);

    const handleCloseModal = () => {
        setModalVisible(false);
        onClose();
    };

    // pega o id do vídeo pela URL
    const getVideoId = (url) => {
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition);
        }
        return videoId;
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity style={styles.goBackButton} onPress={handleCloseModal}>
                        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreOptionsButton}>
                        <Ionicons name="ellipsis-vertical" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.videoPlayerContainer}>
                    <YoutubePlayer
                        ref={playerRef}
                        height={954} // Defina a altura e a largura para serem iguais
                        play={true}
                        videoId={getVideoId(video.url)}
                        onChangeState={event => console.log(event)}
                        style={styles.videoPlayer} // Estilo adicional
                    />

                </View>


                <View style={styles.videoInfo}>
                    <Text style={styles.videoTitle}>{video.title}</Text>
                </View>

                <Text style={styles.videoDescription}>{video.description}</Text>

                {/* Conteúdo adicional do vídeo, se necessário */}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        height: '85%',
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        gap: 25,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    videoPlayerContainer: {
        height: 354,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.secondary,
        overflow: 'hidden',
    },
    videoPlayer: {
        alignSelf: 'stretch',
        height: '100%', // Adicione esta linha
        width: '100%', // Adicione esta linha
    },
    videoInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    videoTitle: {
        fontSize: 16,
        lineHeight: 20,
        textTransform: 'capitalize',
        color: Colors.secondary,
    },
    videoDescription: {
        fontSize: 20,
        lineHeight: 24,
        textTransform: 'capitalize',
        color: Colors.secondary,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
});

export default VideoScreen;

// Path: src/Screens/Home/Video/VideoCard.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import Colors from '../../Styles/Colors';

const VideoCard = ({ image, title }) => {
  return (
    <Card style={styles.cardContainer}>
      <Card.Cover source={{ uri: image }} style={styles.image} />
      <View style={styles.tagContainer}>
        <Title style={styles.tagText}>{title}</Title>
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

// Path: src/Screens/Home/Video/VideoList.js

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../../Styles/Colors'; // Importe o arquivo de cores ou defina as cores diretamente neste arquivo

const VideoList = ({ videos }) => {
  return (
    <View style={styles.container}>
      {videos.map((video, index) => (
        <View key={index} style={styles.videoContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: video.thumbnail }} style={styles.image} />
          </View>
          <Text style={styles.title}>{video.title}</Text>
        </View>
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
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VideoList;

// Path: src/Screens/Home/Video/VideoScreen.js

import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Colors from '../../../Styles/Colors';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoScreen = ({ video, onClose }) => {
    const [modalVisible, setModalVisible] = useState(true);
    const playerRef = useRef(null);

    const handleCloseModal = () => {
        setModalVisible(false);
        onClose();
    };

    // pega o id do vídeo pela URL
    const getVideoId = (url) => {
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return videoId.substring(0, ampersandPosition);
        }
        return videoId;
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity style={styles.goBackButton} onPress={handleCloseModal}>
                        <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.moreOptionsButton}>
                        <Ionicons name="ellipsis-vertical" size={24} color={Colors.primary} />
                    </TouchableOpacity>
                </View>
                <View style={styles.videoPlayerContainer}>
                    <YoutubePlayer
                        ref={playerRef}
                        height={954} // Defina a altura e a largura para serem iguais
                        play={true}
                        videoId={getVideoId(video.url)}
                        onChangeState={event => console.log(event)}
                        style={styles.videoPlayer} // Estilo adicional
                    />

                </View>


                <View style={styles.videoInfo}>
                    <Text style={styles.videoTitle}>{video.title}</Text>
                </View>

                <Text style={styles.videoDescription}>{video.description}</Text>

                {/* Conteúdo adicional do vídeo, se necessário */}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        height: '85%',
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        gap: 25,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    videoPlayerContainer: {
        height: 354,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.secondary,
        overflow: 'hidden',
    },
    videoPlayer: {
        alignSelf: 'stretch',
        height: '100%', // Adicione esta linha
        width: '100%', // Adicione esta linha
    },
    videoInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    videoTitle: {
        fontSize: 16,
        lineHeight: 20,
        textTransform: 'capitalize',
        color: Colors.secondary,
    },
    videoDescription: {
        fontSize: 20,
        lineHeight: 24,
        textTransform: 'capitalize',
        color: Colors.secondary,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
});

export default VideoScreen;

// Path: src/Screens/Shop/ShopScreen.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Checkout from './Checkout';
import OrderHistory from './OrderHistory';
import Support from './Support';

const Stack = createStackNavigator();

const ShopScreen = () => (
  <Stack.Navigator initialRouteName="ProductList">
    <Stack.Screen name="ProductList" component={ProductList} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="Checkout" component={Checkout} />
    <Stack.Screen name="OrderHistory" component={OrderHistory} />
    <Stack.Screen name="Support" component={Support} />
  </Stack.Navigator>
);

export default ShopScreen;

// Path: src/Screens/Shop/ProductList.js

import React from 'react';
import { View, Text } from 'react-native';

const ProductList = () => (
  <View>
    <Text>Esta é a página da Lista de Produtos</Text>
    {/* Adicione aqui os componentes da sua Lista de Produtos */}
  </View>
);

export default ProductList;

// Path: src/Screens/Shop/ProductDetails.js

import React from 'react';
import { View, Text } from 'react-native';

const ProductDetails = () => (
  <View>
    <Text>Esta é a página de Detalhes do Produto</Text>
    {/* Adicione aqui os componentes dos Detalhes do Produto */}
  </View>
);

export default ProductDetails;

// Path: src/Screens/Shop/Cart.js

import React from 'react';
import { View, Text } from 'react-native';

const Cart = () => (
  <View>
    <Text>Esta é a página do Carrinho</Text>
    {/* Adicione aqui os componentes do Carrinho */}
  </View>
);

export default Cart;

// Path: src/Screens/Shop/Checkout.js

import React from 'react';
import { View, Text } from 'react-native';

const Checkout = () => (
  <View>
    <Text>Esta é a página de Finalização da Compra</Text>
    {/* Adicione aqui os componentes da Finalização da Compra */}
  </View>
);

export default Checkout;

// Path: src/Screens/Shop/OrderHistory.js

import React from 'react';
import { View, Text } from 'react-native';

const OrderHistory = () => (
  <View>
    <Text>Esta é a página do Histórico de Pedidos</Text>
    {/* Adicione aqui os componentes do Histórico de Pedidos */}
  </View>
);

export default OrderHistory;

// Path: src/Screens/Shop/Support.js

import React from 'react';
import { View, Text } from 'react-native';

const Support = () => (
  <View>
    <Text>Esta é a página de Suporte</Text>
    {/* Adicione aqui os componentes de Suporte */}
  </View>
);

export default Support;

// Path: src/Screens/Analyse/AnalysisScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';

const AnalysisScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Analysis Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

export default AnalysisScreen;

// Path: src/Screens/Profile/ProfileScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../Styles/Colors';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

export default ProfileScreen;

