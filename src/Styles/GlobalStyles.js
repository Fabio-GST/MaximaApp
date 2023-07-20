import { StyleSheet } from 'react-native';
import Colors from './Colors';

const globalStyles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Oriole-Regular',
    fontSize: 16,
    color: Colors.secondary,
  },
  titleText: {
    fontFamily: 'Oriole-Regular',
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
