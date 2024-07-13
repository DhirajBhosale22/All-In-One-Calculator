import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DistanceCalculator = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [conversionType, setConversionType] = useState('kmToMiles');

  const convertDistance = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setOutputValue('Invalid Input');
      return;
    }
    let result;
    let unit;
    switch (conversionType) {
      case 'kmToMiles':
        result = value * 0.621371;
        unit = 'Miles';
        break;
      case 'milesToKm':
        result = value * 1.60934;
        unit = 'Kilometers';
        break;
      case 'metersToFeet':
        result = value * 3.28084;
        unit = 'Feet';
        break;
      default:
        result = 'Invalid Conversion';
    }
    setOutputValue(`${result.toFixed(2)} ${unit}`);
  };

  const clearInput = () => {
    setInputValue('');
    setOutputValue('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Distance Converter</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Value:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter value"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={conversionType}
          style={styles.picker}
          onValueChange={(itemValue) => setConversionType(itemValue)}
        >
          <Picker.Item label="Kilometres to Miles" value="kmToMiles" />
          <Picker.Item label="Miles to Kilometres" value="milesToKm" />
          <Picker.Item label="Meters to Feet" value="metersToFeet" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, { marginRight: 10 }]} onPress={convertDistance}>
          <Text style={styles.buttonText}>CONVERT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={clearInput}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {outputValue !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>
            Converted Value: <Text style={styles.resultValue}>{outputValue}</Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 5,
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resultContainer: {
    marginTop: 20,
  },
  result: {
    fontSize: 20,
    marginBottom: 10,
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultValue: {
    color: 'white',
    textAlign: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'orange',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  button1: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default DistanceCalculator;
