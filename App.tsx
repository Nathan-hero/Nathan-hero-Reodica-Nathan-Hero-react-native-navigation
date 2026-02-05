import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { CartProvider } from './src/context/CartContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

import Shopping from './src/screens/shopping/shopping';
import ProductDetail from './src/screens/productdetail/productdetail';
import Cart from './src/screens/cart/cart';
import Checkout from './src/screens/checkout/checkout';

const Stack = createNativeStackNavigator();
function AppNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Shopping"
        screenOptions={{
          headerStyle: { backgroundColor: theme.box },
          headerTintColor: theme.alttext, 
          headerTitleStyle: { fontWeight: 'bold', fontSize: 22 }, 
        }}
      >
        <Stack.Screen
          name="Shopping"
          component={Shopping}
          options={{ title: 'HobbyStock' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: 'Product Detail'}}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: 'Your Cart' }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ title: 'Checkout' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppNavigator />
      </CartProvider>
    </ThemeProvider>
  );
}
