import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from './Colors';


const SearchBar = () => {
  const [selectedTag, setSelectedTag] = useState('Todos'); // Estado local para rastrear a tag selecionada

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchInputContainer}>
        <MaterialIcons name="search" size={24} color={Colors.white} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          // Add your logic to handle search functionality here
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
    marginHorizontal: 16,
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
    backgroundColor: Colors.secundary,
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
