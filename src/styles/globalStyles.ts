import { StyleSheet } from 'react-native';
import { Theme } from '_providers/ThemeContext';

export const createGlobalStyles = (theme: Theme) =>
  StyleSheet.create({
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text, 
    },
    bodyText: {
      fontSize: 16,
      color: theme.text,
    },
  });