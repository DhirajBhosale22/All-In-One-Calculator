import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const CapacitorCalculator = () => {
  // State variables to hold user input and calculated values
  const [capacitance, setCapacitance] = useState('');
  const [voltage, setVoltage] = useState('');
  const [energy, setEnergy] = useState('');

  const voltageInputRef = useRef(null);

  // Function to calculate energy based on capacitance and voltage
  const calculateEnergy = () => {
    // Check if both capacitance and voltage are provided
    if (capacitance !== '' && voltage !== '') {
      // Convert input strings to numbers
      const cap = parseFloat(capacitance);
      const volt = parseFloat(voltage);
      // Calculate energy using the formula: Energy = 0.5 * Capacitance * Voltage^2
      const calculatedEnergy =(0.5 * cap * Math.pow(volt, 2))/1000;
      // Set the calculated energy in the state
      setEnergy(calculatedEnergy.toFixed(3)); // Rounded to 2 decimal places
    } else {
      // If either capacitance or voltage is missing, reset energy to empty string
      setEnergy('');
    }
  };

  // Function to clear all input and output fields
  const clearAll = () => {
    setCapacitance('');
    setVoltage('');
    setEnergy('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Capacitor Calculator</Text>
      {/* Input fields for capacitance and voltage */}
      <TextInput
        style={styles.input}
        placeholder="Capacitance (in Farads)"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={capacitance}
        onChangeText={(text) => setCapacitance(text)}
        onSubmitEditing={() => voltageInputRef.current.focus()}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInput
        ref={voltageInputRef}
        style={styles.input}
        placeholder="Voltage (in Volts)"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={voltage}
        onChangeText={(text) => setVoltage(text)}
       
        returnKeyType="done"
      />
      {/* Button container for Calculate Energy and Clear All buttons */}
      <View style={styles.buttonContainer}>
        {/* Button to calculate energy */}
        <TouchableOpacity style={[styles.button, styles.calculateButton]} onPress={calculateEnergy}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        {/* Button to clear all input and output fields */}
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearAll}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {/* Display calculated energy */}
      {energy !== '' && (
        <Text style={styles.resultText}>
          <Text style={styles.labelText}>Energy Stored: </Text>
          <Text style={styles.valueText}>{energy} Joules</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // black background
    alignItems: 'center',
    paddingTop: 50, // Adjust as needed for top spacing
    paddingHorizontal: 16, // Horizontal padding
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF', // white text color
  },
  input: {
    width: '100%', // Full width
    height: 50,
    borderWidth: 1,
    borderColor: '#FFA500', // orange border color
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: 'white', // white text color
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Full width
    marginTop: 20, // Top margin
  },
  button: {
    width: '48%', // Button width
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    borderRadius: 5, // Border radius
    alignItems: 'center', // Center items
  },
  calculateButton: {
    backgroundColor: '#FFA500', // Orange background
  },
  clearButton: {
    backgroundColor: '#FF0000', // Red background
  },
  buttonText: {
    color: '#FFF', // White text color
    fontSize: 16,
    fontWeight: 'bold'
  },
  resultText: {
    marginTop: 20, // Top margin
    fontSize: 20, // Font size
    fontWeight: 'bold', // Bold font weight
  },
  labelText: {
    color: '#FFA500', // Orange text color for label
  },
  valueText: {
    color: '#FFF', // White text color for value
  }
});

export default CapacitorCalculator;
