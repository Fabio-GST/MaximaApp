import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Checkout from './Checkout';
import OrderHistory from './OrderHistory';
import Support from './Support';

const Stack = createStackNavigator();

const ShopScreen = () => (
  <Stack.Navigator initialRouteName="ProductList">
    <Stack.Screen name="ProductList" component={ProductList} />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="Checkout" component={Checkout} />
    <Stack.Screen name="OrderHistory" component={OrderHistory} />
    <Stack.Screen name="Support" component={Support} />
  </Stack.Navigator>
);

export default ShopScreen;
