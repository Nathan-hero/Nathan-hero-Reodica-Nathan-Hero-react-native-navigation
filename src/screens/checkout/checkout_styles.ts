import { StyleSheet, Dimensions } from 'react-native';
import { FooterComponent } from 'react-native-screens/lib/typescript/components/ScreenFooter';

const { width } = Dimensions.get('window');
export const createStyles = (theme: any) => StyleSheet.create({
    container: {
    flex: 1,
  },

  // Cart item
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  imagePlaceholder: {
    fontSize: 30,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    lineHeight: 22,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '700',
  },
  footerStyle: {
    backgroundColor: theme.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  continueButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // Checkout Success
  checkoutBox: {
    flex: 1,
    backgroundColor: 'rgba(35, 35, 35, 0.28)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutContainer: {
  width: '85%',
  backgroundColor: theme.background,
  borderRadius: 16,
  padding: 24,
  alignItems: 'center',

  borderWidth: 3,
  borderColor: theme.primary,

},
  checkoutText: {
    color: theme.text,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
  },
  checkoutTextSub: {
    color: theme.subtext,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  continueButtonVer2: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
  },

  // Footer
  totalBar:{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: theme.background,
    borderTopWidth: 1,
    borderTopColor: theme.border,
  },
});
