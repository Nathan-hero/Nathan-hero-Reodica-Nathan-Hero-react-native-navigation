import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Alert,
  BackHandler,
  Modal,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { CommonActions } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { createStyles } from './checkout_styles';

export default function Checkout({ navigation }: any) {
  const { cart, clearCart } = useCart();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [showSuccess, setShowSuccess] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setShowSuccess(true);
  };

  
  useEffect(() => {
    const backAction = () => {
      if (showSuccess) return true;

      Alert.alert(
        'Cancel Checkout?',
        'Do you want to go back and cancel this checkout?',
        [
          { text: 'No', style: 'cancel' },
          {
            text: 'Yes',
            onPress: () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Shopping' }],
                })
              ),
          },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation, showSuccess]);

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <View style={[styles.imageContainer, { backgroundColor: theme.border }]}>
        {item.image ? (
          <Image source={item.image} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>🛍️</Text>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={[styles.itemName, { color: theme.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.itemPrice, { color: theme.primary }]}>
          {item.quantity} × ₱{item.price.toLocaleString()} = ₱
          {(item.price * item.quantity).toLocaleString()}
        </Text>
      </View>
    </View>
  );

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyTitle, { color: theme.text }]}>
          Your cart is empty
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>

      {/* SUCCESS MODAL */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.checkoutBox}>
          <View style={styles.checkoutContainer}>
            <AntDesign
              name="check-circle"
              size={64}
              color={theme.primary}
            />

            <Text style={styles.checkoutText}>
              Order Successful
            </Text>

            <Text style={styles.checkoutTextSub}>
              Thank you for your purchase!
            </Text>

            <Pressable
              onPress={() => {
                setShowSuccess(false);
                clearCart();
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Shopping' }],
                  })
                );
              }}
              style={styles.continueButton}
            >
              <Text style={styles.continueButtonVer2}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      {/* FOOTER */}
      <View
        style={[styles.totalBar]}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{ color: theme.subtext }}>Total:</Text>
          <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700' }}>
            ₱{total.toLocaleString()}
          </Text>
        </View>

        <Pressable
          onPress={handleCheckout}
          style={[styles.footerStyle]}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
            Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
