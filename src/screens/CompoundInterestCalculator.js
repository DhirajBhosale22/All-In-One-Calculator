import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('Annually');
  const [amount, setAmount] = useState(null);
  const [calculatedPrincipal, setCalculatedPrincipal] = useState(null);
  const [interest, setInterest] = useState(null);
  const frequencyMap = {
    'Annually': 1,
    'Semiannually': 2,
    'Quarterly': 4,
    'Monthly': 12,
    'Daily': 365
  };
  const rateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = frequencyMap[compoundingFrequency];
    if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n)) {
      alert('Please enter valid numbers');
      return;
    }
    const A = P * Math.pow((1 + r / n), n * t);
    setAmount(Math.round(A ));
    setCalculatedPrincipal(Math.round(P) );
    const I = Number(Math.round(A)  - Math.round(P) );
    setInterest(I );
  };
  const clearFields = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompoundingFrequency('Annually');
    setAmount(null);
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Compound Interest Calculator</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Principal Amount :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={principal}
          onChangeText={setPrincipal}
          onSubmitEditing={() => rateInputRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Annual Interest :</Text>
        <TextInput
          ref={rateInputRef}
          style={styles.input}
          placeholder="Annual Interest Rate %"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={rate}
          onChangeText={setRate}
          onSubmitEditing={() => timeInputRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
        />

      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Time Period :</Text>
        <TextInput
          ref={timeInputRef}
          style={styles.input}
          placeholder="Time in years"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={time}
          onChangeText={setTime}
         
          returnKeyType="done"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Compounded :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={compoundingFrequency}
            style={styles.picker}
            onValueChange={(itemValue) => setCompoundingFrequency(itemValue)}
          >
            {Object.keys(frequencyMap).map((frequency) => (
              <Picker.Item key={frequency} label={frequency} value={frequency} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateCompoundInterest}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {amount !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Principal Amount:<Text style={styles.resultValue}> ₹ {calculatedPrincipal}</Text></Text>
          <Text style={styles.resultLabel}>Compound Interest:<Text style={styles.resultValue}> ₹ {interest}</Text></Text>
          <Text style={styles.resultLabel}>Total Amount:<Text style={styles.resultValue}> ₹ {amount}</Text></Text>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 0, // Adjusted marginTop to match the SimpleInterest component
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 20, // Adjusted margin for consistency
  },
  inputContainer: {
    marginVertical: 10, // Added to match the SimpleInterest component
  },
  label: {
    fontSize: 22,
    color: 'white',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    fontSize: 15,
    borderColor: 'orange',
    borderWidth: 1,
    paddingHorizontal: 10,
    color: 'white',
    borderRadius:5,
  },
  pickerContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'orange',
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'white',
    backgroundColor: 'orange',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  calculateButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
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
    marginVertical: 20,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 20,
    color: 'orange',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default CompoundInterestCalculator;