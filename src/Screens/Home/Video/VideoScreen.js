import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';
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
                        height={354}
                        play={true}
                        videoId={getVideoId(video.url)}
                        onChangeState={event => console.log(event)}
                        style={styles.videoPlayer}
                    />
                </View>

                <View style={styles.videoInfo}>
                    <View style={styles.titleContainer}>
                        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
                        <Text style={styles.title}>{video.title}</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Ionicons name="thumbs-up-outline" size={24} color={Colors.secondary} style={styles.icon}/>
                        <Ionicons name="thumbs-down-outline" size={24} color={Colors.secondary} style={styles.dislikeIcon} />
                    </View>
                </View>

                <ScrollView style={styles.scrollContainer}>
                    <Text style={styles.videoDescription}>{video.description}</Text>
                </ScrollView>

                {/* Conteúdo adicional do vídeo, se necessário */}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        height: '85%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.white,
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
        borderColor: Colors.secondary,
        borderWidth: 1,

    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    goBackButton: {
        flex: 1,
    },
    titleContainer: {
        flex: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    title: {
        fontSize: 16,
        lineHeight: 20,
        textTransform: 'capitalize',
        color: Colors.secondary,
        width: '75%',
        height: 70,
        overflow: 'ellipsis',
    },
    moreOptionsButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
    videoPlayerContainer: {
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
    },
    videoPlayer: {
        width: '100%',
    },
    videoInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    viewCount: {
        fontSize: 12,
        lineHeight: 15,
        textTransform: 'capitalize',
        color: Colors.white,
    },
    iconContainer: {
        flexDirection: 'row',
    },
    dislikeIcon: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: 8,
  
    },
    scrollContainer: {
        flex: 1,
    },
    icon: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.secondary,
        padding: 8,
        marginRight: 16,
    },

    videoDescription: {
        fontSize: 16,
        lineHeight: 24,
        textTransform: 'capitalize',
        color: Colors.secondary,
    },
});

export default VideoScreen;
