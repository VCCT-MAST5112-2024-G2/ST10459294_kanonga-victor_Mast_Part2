import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

// Import the background image
const backgroundimg = require('C:/Users/lab_services_student/Desktop/kanonga victor victor_ ST10459294_part2/kanonga-victor-ST10459294-Mast-part2/assets/mainscreen.jpeg');

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeScreenProps) {
  const [menuItems, setMenuItems] = useState<{ dishName: string, description: string, course: string, price: number }[]>([]);

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
        <Button color="green" title="Filter Menu" onPress={() => navigation.navigate('FilterMenu')} />

        <Text style={styles.menulength}>Total Items: {menuItems.length}</Text>

        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>{item.dishName} - {item.course}</Text>
              <Text style={styles.menuItemText}>{item.description}</Text>
              <Text style={styles.menuItemText}>${item.price.toFixed(2)}</Text>
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
  },
  menuItem: {
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 20, // Increased font size
    color: 'blue', // Color for all menu item text
  },
  menulength: {
    color: 'blue',
    fontSize: 24,
  },
});
