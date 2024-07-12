import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

const BMICalculator = () => {
  // State variables for weight, height, BMI result, and status
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');

  const heightRef = useRef(null);


  // Function to calculate BMI and determine weight status
  const calculateBMI = () => {
    if (weight === '' || height === '') {
      Alert.alert('Please enter both weight and height');
      return;
    }

    // Convert weight and height to numbers
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || heightNum <= 0 || weightNum <= 0) {
      Alert.alert('Please enter valid numerical values');
      return;
    }

    // Calculate BMI
    const bmiValue = (weightNum * 100) / (heightNum / 10 * heightNum / 10);
    setBmi(bmiValue.toFixed(2));

    // Determine weight status
    if (bmiValue < 18.5) {
      setStatus('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setStatus('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setStatus('Overweight');
    } else {
      setStatus('Obese');
    }
  };

  // Function to clear all input and output fields
  const clearAll = () => {
    setWeight('');
    setHeight('');
    setBmi(null);
    setStatus('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BMI Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        placeholderTextColor="#FFF"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        onSubmitEditing={() => heightRef.current.focus()}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInput
        ref={heightRef}
        style={styles.input}
        placeholder="Height (cm)"
        placeholderTextColor="#FFF"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
       
        returnKeyType="done"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calculateBMI}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearAll}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {/* Display the result */}
      {bmi !== null && (
        <View style={styles.result}>
          <Text style={[styles.resultText, { color: '#FFA500' }]}>BMI: <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{bmi}</Text></Text>
          <Text style={[styles.resultText, { color: '#FFA500' }]}>Status: <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{status}</Text></Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-start', // Start from the top of the screen
    paddingTop: 20, // Adjust as needed for top spacing
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
    marginTop: 20, // Added marginTop for heading alignment
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#FFA500',
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 5,
    
  },
  button: {
    flex: 1,
    backgroundColor: 'orange',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 15,
   
  },
  clearButton: {
    backgroundColor: '#FF0000',
    marginRight: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20, // Added marginTop for result alignment
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 4,
    color: '#FFF',
  },
});

export default BMICalculator;
