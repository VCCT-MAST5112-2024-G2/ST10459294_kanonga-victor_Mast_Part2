import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';


const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

const backgroundimg = require('../assets/seconde.jpeg');

export default function AddMenuScreen({ navigation }: AddMenuScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    const newItem = { dishName, description, course, price: parseFloat(price) };
    navigation.navigate('Home', { newItem });
  };

  return (
    <ImageBackground source={backgroundimg} style={styles.background}>

      <View style={styles.container}>
        <Text style={styles.label}>Dish Name:</Text>
        <TextInput style={styles.input} onChangeText={setDishName} value={dishName} />

        <Text style={styles.label}>Description:</Text>
        <TextInput style={styles.input} onChangeText={setDescription} value={description} />

        <Text style={styles.label}>Course:</Text>
        <Picker style={styles.course} selectedValue={course} onValueChange={setCourse}>
          {courses.map((course) => (
            <Picker.Item style={styles.course} key={course} label={course} value={course} />
          ))}
        </Picker>

        <Text style={styles.course}>Price:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPrice}
          value={price}
          keyboardType="numeric"
        />

        <Button title="Add Dish" onPress={handleSubmit} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold',
    textShadowColor: 'blue(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },


    marginVertical: 20,
  },
  input: {
    fontSize: 24,
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: 'blue',
    color: 'blue',
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  course: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold',
    textShadowColor: 'blue(0, 0, 0, 0.75)',

    marginVertical: 20,
  },
});