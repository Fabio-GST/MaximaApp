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
