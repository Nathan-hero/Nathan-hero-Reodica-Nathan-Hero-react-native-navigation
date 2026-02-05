import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import styles from './cart_styles';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: any;
}

export default function Cart({ navigation }: any) {
  const { cart, increase, decrease, remove } = useCart();
  const { theme } = useTheme();

  const totalPrice = cart.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View
      style={[
        styles.itemContainer,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}
    >
      {/* Image */}
      <View style={[styles.imageContainer, { backgroundColor: theme.border }]}>
        {item.image ? (
          <Image source={item.image} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>🛍️</Text>
        )}
      </View>

      {/* Info */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Info */}
        <View style={styles.itemDetails}>
          <Text style={[styles.itemName, { color: theme.text }]} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={[styles.itemPrice, { color: theme.primary }]}>
            ₱{item.price.toLocaleString()}
          </Text>
        </View>

        {/* Quantity */}
        <View style={styles.quantityContainer}>
          <Pressable
            onPress={() => item.quantity > 1 && decrease(item.id)}
            style={({ pressed }) => [
              styles.quantityButton,
              {
                backgroundColor: theme.primary,
                opacity: item.quantity <= 1 ? 0.4 : pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text style={[styles.quantityButtonText, { color: theme.text }]}>−</Text>
          </Pressable>

          <Text style={[styles.quantityText, { color: theme.text }]}>{item.quantity}</Text>

          <Pressable
            onPress={() => increase(item.id)}
            style={({ pressed }) => [
              styles.quantityButton,
              { backgroundColor: theme.primary, opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={[styles.quantityButtonText, { color: '#fff' }]}>+</Text>
          </Pressable>
        </View>
      </View>

      {/* REMOVE BUTTON */}
      <Pressable
        onPress={() => remove(item.id)}
        style={({ pressed }) => [
          styles.removeButton,
          { marginLeft: 10, opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Text style={[styles.removeText, { color: theme.danger || '#FF3B30' }]}>✕</Text>
      </Pressable>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <AntDesign
            name={'shopping-cart'}
            size={100}
            color={theme.primary}
          />
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        Your cart is empty
      </Text>
      <Text style={[styles.emptySubtitle, { color: theme.subtext }]}>
        Add some items to get started!
      </Text>

      <Pressable
        onPress={() => navigation.navigate('Shopping')}
        style={({ pressed }) => [
          styles.continueButton,
          {
            backgroundColor: theme.primary,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text style={styles.continueButtonText}>
          Continue Shopping
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {cart.length === 0 ? (
        renderEmptyState()
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />

          {/* Footer */}
          <View
            style={[
              styles.footer,
              {
                backgroundColor: theme.card,
                borderTopColor: theme.border,
              },
            ]}
          >
            <View style={styles.totalContainer}>
              <Text style={[styles.totalLabel, { color: theme.subtext }]}>
                Total:
              </Text>
              <Text style={[styles.totalPrice, { color: theme.text }]}>
                ₱{totalPrice.toLocaleString()}
              </Text>
            </View>

            <Pressable
              onPress={() => navigation.navigate('Checkout')}
              style={({ pressed }) => [
                styles.checkoutButton,
                {
                  backgroundColor: theme.primary,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={styles.checkoutButtonText}>
                Checkout ({cart.reduce((s, i) => s + i.quantity, 0)})
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}
