import { StyleSheet } from 'react-native';

export const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    itembox: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginBottom: 15,
      alignItems: 'center',
      backgroundColor: theme.background,
    },
    itemRow: {
      flexDirection: 'row', 
      alignItems: 'center',  
      marginBottom: 9,
    },
    itemImage: {
      width: 90,
      height: 90,
      borderRadius: 8,
      marginRight: 10, 
    },
    itemText: {
      fontSize: 16,
      color: theme.text,
      flexShrink: 1, 
    },
    addButton: {
      backgroundColor: '#bb9eff',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    toggleSwitch: {
      marginBottom: 10,
    },
    goToCartButton: {
      marginTop: 10,
    },
  });
