import React, { useState, useMemo } from 'react';
import { View, Text, Image, Pressable, ScrollView } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from '../shopping/shopping_styles';

export default function ProductDetail({ route, navigation }: any) {
  const { item } = route.params;
  const { cart, addToCart } = useCart();
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity(prev => prev + 1);
  const decrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const cartQuantity = useMemo(() => {
    return cart.find(p => p.id === item.id)?.quantity ?? 0;
  }, [cart, item.id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
    }
    setQuantity(1);
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {/* Product Image */}
        <View>
          <Image
            source={item.image}
            style={{ width: '100%', height: 300, borderRadius: 16 }}
            resizeMode="cover"
          />

          {/* Cart badge */}
          {cartQuantity > 0 && (
            <View
              style={styles.cartUpBig}
            >
              <Text style={{ color: '#fff', fontWeight: '700' }}>
                In cart: {cartQuantity}
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <Text style={{ fontSize: 22, fontWeight: '700', color: theme.text, marginTop: 16 }}>
          {item.name}
        </Text>

        <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.primary, marginVertical: 6 }}>
          ₱{item.price.toLocaleString()}
        </Text>

        <Text style={{ fontSize: 16, color: theme.subtext, marginBottom: 16 }}>
          Rating: {item.rate}
        </Text>

        <Text style={[styles.itemDescription, { marginBottom: 24 }]}>
          {item.description}
        </Text>

        {/* Quantity Selector */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <Pressable
            onPress={decrease}
            style={styles.select}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>−</Text>
          </Pressable>

          <Text style={{ marginHorizontal: 20, fontSize: 18, fontWeight: '600', color: theme.text }}>
            {quantity}
          </Text>

          <Pressable
            onPress={increase}
            style={styles.select}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>+</Text>
          </Pressable>
        </View>

        {/* Add to Cart Button */}
        <Pressable
          onPress={handleAddToCart}
          style={({ pressed }) => [
            {
              backgroundColor: cartQuantity > 0 ? theme.secondary : theme.primary,
              paddingVertical: 14,
              borderRadius: 12,
              alignItems: 'center',
            },
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>
            {cartQuantity > 0
              ? `Add ${quantity} more (Total: ${cartQuantity + quantity})`
              : `Add ${quantity} to Cart`}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
