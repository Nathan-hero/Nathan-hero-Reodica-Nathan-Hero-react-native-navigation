import { View, Text, Button, Alert } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { CommonActions } from '@react-navigation/native';
import styles from './checkout_styles';

export default function Checkout({ navigation }: any) {
  const { cart, clearCart } = useCart();
  const { theme } = useTheme();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    Alert.alert('Checkout successful', '', [
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {cart.map(item => (
        <Text key={item.id} style={{ color: theme.text }}>
          {item.name} - ₱{item.price * item.quantity}
        </Text>
      ))}
      <Text style={{ color: theme.text }}>Total: ₱{total}</Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
}
