import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
const CAGRCalculator = () => {
  // States for CAGR Calculator
  const [beginningValue, setBeginningValue] = useState('');
  const [endingValue, setEndingValue] = useState('');
  const [years, setYears] = useState('');
  const [cagrResult, setCagrResult] = useState(null);

  const endingValueRef = useRef(null);
  const yearsRef = useRef(null);
  // States for Inflation Calculator
  const [presentValue, setPresentValue] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [inflationYears, setInflationYears] = useState('');
  const [inflationResult, setInflationResult] = useState(null);
  // Calculate CAGR
  const calculateCAGR = () => {
    const begin = parseFloat(beginningValue);
    const end = parseFloat(endingValue);
    const n = parseFloat(years);
    if (isNaN(begin) || isNaN(end) || isNaN(n) || n <= 0) {
      alert('Please enter valid numbers');
      return;
    }
    const cagr = ((end / begin) ** (1 / n)) - 1;
    setCagrResult((cagr * 100).toFixed(2));
  };
  // Clear CAGR fields
  const clearCAGRFields = () => {
    setBeginningValue('');
    setEndingValue('');
    setYears('');
    setCagrResult(null);
  };
  // Calculate Inflation
  const calculateInflation = () => {
    const present = parseFloat(presentValue);
    const rate = parseFloat(inflationRate) / 100;
    const n = parseFloat(inflationYears);
    if (isNaN(present) || isNaN(rate) || isNaN(n) || n <= 0) {
      alert('Please enter valid numbers');
      return;
    }
    const futureValue = present * ((1 + rate) ** n);
    setInflationResult(futureValue.toFixed(2));
  };
  // Clear Inflation fields
  const clearInflationFields = () => {
    setPresentValue('');
    setInflationRate('');
    setInflationYears('');
    setInflationResult(null);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.calculatorContainer}>
        <Text style={styles.header}>CAGR Calculator</Text>
        <Text style={styles.textStyle}>Beginning Value</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={beginningValue}
          onChangeText={setBeginningValue}
          onSubmitEditing={() => endingValueRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Text style={styles.textStyle}>Ending Value</Text>
        <TextInput
          ref={endingValueRef}
          style={styles.input}
          keyboardType="numeric"
          value={endingValue}
          onChangeText={setEndingValue}
          onSubmitEditing={() => yearsRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Text style={styles.textStyle}>Number of Years</Text>
        <TextInput
          ref={yearsRef}
          style={styles.input}
          keyboardType="numeric"
          value={years}
          onChangeText={setYears}
         
          returnKeyType="done"
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateCAGR}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearCAGRFields}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
        {cagrResult !== null && (
          <Text style={styles.result}>
            CAGR: <Text style={{ color: 'white' }}> {cagrResult} %</Text>
          </Text>
        )}
      </View>
     
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Adjust padding or paddingTop to move content down from the top
    backgroundColor: 'black',
  },
  calculatorContainer: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 8,
    backgroundColor: 'black',
    
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  calculateButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default CAGRCalculator;