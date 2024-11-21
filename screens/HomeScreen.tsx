import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground,Alert } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';


const backgroundimg = require('../assets/mainscreen.jpeg');

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;



  export default function HomeScreen({ navigation, route }: HomeScreenProps) {
    const [menuItems, setMenuItems] = useState<{ dishName: string; description: string; course: string; price: number }[]>([]);

// Separate items by course
const starters = menuItems.filter((item) => item.course === 'Starters');
const mains = menuItems.filter((item) => item.course === 'Mains');
const desserts = menuItems.filter((item) => item.course === 'Desserts');

// Calculate average prices
const calculateAveragePrice = (items: typeof menuItems) =>
  items.length > 0 ? items.reduce((sum, item) => sum + item.price, 0) / items.length : 0;

const averagePriceOverall = calculateAveragePrice(menuItems);
const averagePriceStarters = calculateAveragePrice(starters);
const averagePriceMains = calculateAveragePrice(mains);
const averagePriceDesserts = calculateAveragePrice(desserts);
    
    // Calculate average price
    const averagePrice = menuItems.length > 0 
      ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length 
      : 0;
  
    // Handle removal of a menu item
    const removeItem = (index: number) => {
      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "OK", onPress: () => setMenuItems(menuItems.filter((_, i) => i !== index)) }
        ]
      );
    };
 
  useEffect(() => {
    if (route.params?.newItem) {
      setMenuItems((prevItems) => [...prevItems, route.params.newItem as { dishName: string; description: string; course: string; price: number }]);
    }
  }, [route.params?.newItem]);

  return (
    <ImageBackground source={backgroundimg} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Chef's Menu</Text>
        <Button color="blue" title="Add Menu" onPress={() => navigation.navigate('AddMenu')} />
        <Button title="Filter Menu" onPress={() => navigation.navigate('FilterMenu', { menuItems })} />

        <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>
        <Text style={styles.totalItems}>Total Items: {menuItems.length}</Text>
      <Text style={styles.averagePrice}>Average Price: ${averagePriceOverall.toFixed(2)}</Text>
      <Text style={styles.averagePrice}>Average Price for starters: ${averagePriceStarters.toFixed(2)}</Text>
      <Text style={styles.averagePrice}>Average Price for mains: ${averagePriceMains.toFixed(2)}</Text>
      <Text style={styles.averagePrice}>Average Price for deserts: ${averagePriceDesserts.toFixed(2)}</Text>

        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item ,index}) => (
            <View style={styles.menuItem}>
              <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
              <Text style={styles.menuItemText}>{item.dishName} - {item.course}</Text>
              <Text style={styles.menuItemText}>{item.description}</Text>
              <Text style={styles.menuItemText}>${item.price.toFixed(2)}</Text>
              <Button title="Remove" color="red" onPress={() => removeItem(index)} />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  totalItems: {
    fontSize: 18,
    marginTop: 10,
  },
  averagePrice: {
    fontSize: 18,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'sans-serif-condensed',
    marginBottom: 20,
    color: 'white',
  }, menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%',
  },
  dishName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
 
  menuItemText: {
    fontSize: 20,
    color: 'blue',
  },
  menulength: {
    color: 'blue',
    fontSize: 24,
  },
});
