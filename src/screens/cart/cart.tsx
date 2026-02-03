import { View, Text, Button } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './cart_styles';

export default function Cart({ navigation }: any) {
  const { cart, increase, decrease } = useCart();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {cart.map(item => (
        <View key={item.id}>
          <Text style={{ color: theme.text }}>
            {item.name} - ₱{item.price * item.quantity}
          </Text>
          <Button title="+" onPress={() => increase(item.id)} />
          <Button title="-" onPress={() => decrease(item.id)} />
        </View>
      ))}

      <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
}
