import { View, Text, FlatList, Image, Pressable, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './shopping_styles';
import { shopData } from '../../shopdata';
import { useState } from 'react';

export default function Shopping({ navigation }: any) {
  const { cart, addToCart } = useCart();
  const { theme, dark, toggle } = useTheme();
  const styles = createStyles(theme);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = shopData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }: any) => {
    const cartItem = cart.find((p) => p.id === item.id);
    const quantityInCart = cartItem?.quantity || 0;

    return (
      <Pressable
        style={({ pressed }) => [styles.itembox, pressed && styles.itemPressed]}
        onPress={() => navigation.navigate('ProductDetail', { item })}
      >
        {/* Product Image */}
        <View>
          <Image source={item.image} style={styles.itemImage} resizeMode="cover" />

          {quantityInCart > 0 && (
            <View style={styles.cartUp}>
              <Text style={{ color: '#fff', fontWeight: '700', fontSize: 12 }}>
                {quantityInCart}
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.itemContent}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.itemRate}>Rating: {item.rate}</Text>
          <Text style={styles.itemPrice}>₱{item.price.toLocaleString()}</Text>

          {/* Add to Cart Button */}
          <Pressable
            onPress={() => addToCart(item)}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed,
              quantityInCart > 0 && { backgroundColor: theme.secondary },
            ]}
            android_ripple={{ color: 'rgba(255,255,255,0.3)' }}
          >
            <Text style={styles.addButtonText}>
              {quantityInCart > 0 ? `Add more` : 'Add to Cart'}
            </Text>
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Search Bar */}
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          placeholderTextColor={theme.subtext}
          style={styles.searchInput}
        />

        {/* Dark Mode Toggle with AntDesign */}
        <Pressable
          onPress={toggle}
          style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}
        >
          <AntDesign
            name={dark ? 'moon' : 'sun'}
            size={24}
            color={dark ? theme.primary : theme.primary}
          />
        </Pressable>
      </View>

      {/* Product List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* Go to Cart Button */}
      <Pressable
        onPress={() => navigation.navigate('Cart')}
        style={({ pressed }) => [styles.cartButton, pressed && styles.cartButtonPressed]}
      >
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </Pressable>
    </View>
  );
}
