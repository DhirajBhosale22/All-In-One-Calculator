import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IconGroup = ({ iconName, iconImage, subIcons }) => {
  const navigation = useNavigation();
  
  const handlePress = () => {
    navigation.navigate('SubIconsScreen', { iconName, subIcons,iconImage });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.iconButton}>
        <Image source={iconImage} style={styles.iconImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  iconButton: {
    padding: 20,
    // backgroundColor: '#444',
    borderRadius: 10,
  },
  iconImage: {
    width: 30,
    height: 30,
  },
});

export default IconGroup;
