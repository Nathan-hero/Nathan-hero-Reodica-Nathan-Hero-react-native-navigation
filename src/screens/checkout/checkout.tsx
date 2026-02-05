import { View, Text, FlatList, Image, Pressable, Alert, BackHandler } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { CommonActions } from '@react-navigation/native';
import { useEffect } from 'react';
import styles from './checkout_styles';

export default function Checkout({ navigation }: any) {
  const { cart, clearCart } = useCart();
  const { theme } = useTheme();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert('Checkout Successful', '', [
      {
        text: 'OK',
        onPress: () => {
          clearCart();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Shopping' }],
            })
          );
        },
      },
    ]);
  };

  // Android Back Button Handling
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Cancel Checkout?', 'Do you want to go back and cancel this checkout?', [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Shopping' }],
              })
            );
          },
        },
      ]);
      return true; // prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // cleanup
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
          padding: 12,
          borderRadius: 12,
        },
      ]}
    >
      {/* Image */}
      <View style={[styles.imageContainer, { backgroundColor: theme.border }]}>
        {item.image ? (
          <Image source={item.image} style={styles.image} />
        ) : (
          <Text style={[styles.imagePlaceholder, { color: theme.text }]}>🛍️</Text>
        )}
      </View>

      {/* Item Details */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.itemPrice, { color: theme.primary }]}>
          {item.quantity} × ₱{item.price.toLocaleString()} = ₱{(item.price * item.quantity).toLocaleString()}
        </Text>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        Your cart is empty
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.subtext }]}>
        Add some items before checking out.
      </Text>
      <Pressable
        onPress={() => navigation.navigate('Shopping')}
        style={({ pressed }) => [
          styles.continueButton,
          { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
        ]}
      >
        <Text style={styles.continueButtonText}>Go Shopping</Text>
      </Pressable>
    </View>
  );

  if (cart.length === 0) return renderEmptyState();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Total & Checkout Button */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          backgroundColor: theme.card,
          borderTopWidth: 1,
          borderTopColor: theme.border,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
          <Text style={{ color: theme.subtext, fontSize: 16 }}>Total:</Text>
          <Text style={{ color: theme.text, fontSize: 20, fontWeight: '700' }}>
            ₱{total.toLocaleString()}
          </Text>
        </View>

        <Pressable
          onPress={handleCheckout}
          style={({ pressed }) => [
            {
              backgroundColor: theme.primary,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
            Checkout ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
