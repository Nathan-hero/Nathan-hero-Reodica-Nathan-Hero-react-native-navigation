import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const createStyles = (theme: any) =>
  StyleSheet.create({
    /* Screen */
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    /* Header */
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.card,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },

    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },

    toggleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },

    toggleLabel: {
      fontSize: 18,
    },

    /* List */
    listContent: {
      padding: 16,
      paddingBottom: 120,
    },

    /* Product Card */
    itembox: {
      flexDirection: 'row',
      padding: 12,
      borderRadius: 16,
      marginBottom: 16,
      backgroundColor: theme.card,
      borderBlockColor: theme.primary,
      borderWidth: 2,
    },

    itemPressed: {
      opacity: 0.95,
      transform: [{ scale: 0.98 }],
    },

    /* Image */
    itemImage: {
      width: width * 0.25,
      height: width * 0.25,
      borderRadius: 12,
      backgroundColor: theme.border,
    },

    /* Content */
    itemContent: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'space-between',
    },

    itemName: { // Also used for some other text for simplicity (Gets confusing if there are too many styles)
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
      lineHeight: 22,
    },

    itemPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.primary,
      marginVertical: 6,
    },
    itemRate:{
      fontSize: 14,
      color: theme.subtext,
    },
    itemDescription:{
      fontSize: 13,
      color: theme.subtext,
      textAlign: 'justify',
      marginBottom: 12,
    },

    /* Add to Cart Button */
    addButton: {
      alignSelf: 'flex-start',
      backgroundColor: theme.primary,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 20,
      elevation: 2,
    },

    addButtonPressed: {
      transform: [{ scale: 0.90 }],
      opacity: 0.5,
    },

    addButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 14,
    },

    /* Floating Cart Button */
    cartButton: {
      position: 'absolute',
      bottom: 20,
      left: 16,
      right: 16,
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
    cartUp:{
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: theme.primary,
      borderRadius: 12,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },

    cartUpBig:{
      position: 'absolute',
      top: 12,
      right: 12,
      backgroundColor: theme.primary,
      borderRadius: 14,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    //Selectors
    select:{
      backgroundColor: theme.primary,
      paddingHorizontal: 18,
      paddingVertical: 8,
      borderRadius: 8,
    },
    cartButtonPressed: {
      transform: [{ scale: 0.98 }],
      opacity: 0.9,
    },

    cartButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
    },

    searchInput: {
      flex: 1, // fills the available horizontal space
      backgroundColor: theme.background, // or theme.card if you want it to match the header
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 10,
      fontSize: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
      marginRight: 12,
    },

    

  });
