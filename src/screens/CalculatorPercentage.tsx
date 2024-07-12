import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const CalculatorPercentage = () => {
  const [part, setPart] = useState('');
  const [whole, setWhole] = useState('');
  const [percentage, setPercentage] = useState<string | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const wholeInputRef = useRef(null);

  const calculatePercentage = () => {
    const partNumber = parseFloat(part);
    const wholeNumber = parseFloat(whole);
    if (!isNaN(partNumber) && !isNaN(wholeNumber) && wholeNumber !== 0) {
      const result = (partNumber / wholeNumber) * 100;
      setPercentage(result.toFixed(2) + '%');
    } else {
      setPercentage('Invalid input');
    }
    setIsCalculated(true);
  };

  const clearAll = () => {
    setPart('');
    setWhole('');
    setPercentage(null);
    setIsCalculated(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Percentage Calculator</Text>
     <TextInput
        style={styles.input}
        placeholder="Enter part value"
        placeholderTextColor='white'
        keyboardType="numeric"
        value={part}
        onChangeText={text => setPart(text)}
        onSubmitEditing={() => wholeInputRef.current.focus()}
        returnKeyType="next"
        blurOnSubmit={false}
      />
       <TextInput
        ref={wholeInputRef}
        style={styles.input}
        placeholder="Enter whole value"
        placeholderTextColor='white'
        keyboardType="numeric"
        value={whole}
        onChangeText={text => setWhole(text)}
        
        returnKeyType="done"
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculatePercentage}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {isCalculated && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Result:</Text>
          <Text style={[styles.resultOutput, { marginLeft: 5 }]}>{percentage !== null ? percentage : ''}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    fontSize: 15,
    width: '80%',
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: 10,
  },
  calculateButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 3,
    flex: 1,
  },
  clearButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
    flex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    fontWeight:'bold',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
  resultOutput: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CalculatorPercentage;
