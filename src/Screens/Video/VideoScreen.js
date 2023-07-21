import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Colors from '../../Styles/Colors';
import { Ionicons } from '@expo/vector-icons';

const VideoScreen = ({ videoTitle, onClose }) => {
    const [modalVisible, setModalVisible] = useState(true);

    const handleCloseModal = () => {
        setModalVisible(false);
        onClose();
    };

    return (
        <Modal
            animationType="endregion"
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
                <Image source={require('../../../assets/img/Video.jpeg')} style={styles.videoImage} />
                <View style={styles.videoInfo}>
                    <Text style={styles.videoTitle}>{videoTitle}</Text>
                </View>

                <Text style={styles.videoDescription}>Robô de Vendas</Text>

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
    videoImage: {  
        height: 400,
        width: '100%',
        borderRadius: 25,
        borderColor: Colors.secondary,
        borderWidth: 1,
    },
    videoInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
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
