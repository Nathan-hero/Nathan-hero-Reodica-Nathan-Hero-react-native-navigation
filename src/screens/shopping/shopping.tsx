import { View, Text, FlatList, Image, Switch, Pressable, Button } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { createStyles } from './shopping_styles';

import { shopData } from '../../shopdata';

export default function Shopping({ navigation }: any) {
  const { addToCart } = useCart();
  const { theme, dark, toggle } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Switch
        value={dark}
        onValueChange={toggle}
        style={styles.toggleSwitch}
      />

      <FlatList
        data={shopData}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itembox}>
            <View style={styles.itemRow}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>
                {item.name}
                </Text>
                <Text style={styles.itemText}> ₱{item.price}</Text>
            <Pressable
                onPress={() => addToCart(item)}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </Pressable>
            </View>
            </View>

        )}
      />
      <View style={styles.goToCartButton}>
        <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
      </View>
    </View>
  );
}
