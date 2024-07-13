import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const FuelEfficiencyCalculator = () => {

  const gallonsInputRef = useRef(null);

  // State variables for storing distance, gallons, and result
  const [distance, setDistance] = useState('');
  const [gallons, setGallons] = useState('');
  const [result, setResult] = useState(null);

  // Function to calculate fuel efficiency in Km/L
  const calculateEfficiency = () => {
    const distanceNum = parseFloat(distance);
    const gallonsNum = parseFloat(gallons);
    if (!isNaN(distanceNum) && !isNaN(gallonsNum) && gallonsNum !== 0) {
      const efficiency = distanceNum / gallonsNum;
      setResult(efficiency.toFixed(2));
    } else {
      setResult('Invalid input');
    }
  };

  // Function to clear all input fields and result
  const clearAll = () => {
    setDistance('');
    setGallons('');
    setResult(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fuel Efficiency Calculator</Text>
      {/* Input field for distance */}
      <TextInput
        style={styles.input}
        placeholder="Distance Driven (Km)"
        placeholderTextColor="#FFF"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
        returnKeyType="next"
        onSubmitEditing={() =>gallonsInputRef.current.focus()} // Focus on gallons input when pressing "Next"
        blurOnSubmit={false}
      />
      {/* Input field for gallons */}
      <TextInput
        ref={gallonsInputRef}
        style={styles.input}
        placeholder="Fuel Consumed (Liters)"
        placeholderTextColor="#FFF"
        keyboardType="numeric"
        value={gallons}
        onChangeText={setGallons}
        returnKeyType="done" // Change return key type to "Done" for the last input
       
      />
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateEfficiency}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {/* Display the result */}
      {result !== null && (
        <Text style={styles.result}>
          <Text style={styles.labelText}>Fuel Efficiency: </Text>
          <Text style={styles.valueText}>{result} Km/L</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000', // Set background color to black
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#FFF', // Set text color to white
  },
  input: {
    fontSize: 15,
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'white', // Set text color to white
    borderRadius:5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:15,
  },
  calculateButton: {
    backgroundColor: 'orange',
    padding: 10,
    fontWeight: 'bold',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 50,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    color: 'white', // Set text color to white
    marginTop:15,
  },
  labelText: {
    color: 'orange', // Set label text color to orange
    marginTop:15,
  },
  valueText: {
    color: 'white', // Set value text color to white
    marginTop:15,
  },
});

export default FuelEfficiencyCalculator;
