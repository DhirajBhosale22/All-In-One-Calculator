import React, { useState,useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const VoltageDividerCalculator = () => {
  const [vin, setVin] = useState('');
  const [r1, setR1] = useState('');
  const [r2, setR2] = useState('');
  const [vout, setVout] = useState('');
  const r1Ref = useRef(null);
  const r2Ref = useRef(null);

  const calculateOutputVoltage = () => {
    if (vin && r1 && r2) {
      const voutValue = (vin * r2) / (parseInt(r1) + parseInt(r2));
      setVout(voutValue.toFixed(2));
    } else {
      setVout('');
    }
  };

  const clearAll = () => {
    setVin('');
    setR1('');
    setR2('');
    setVout('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Input Voltage:</Text>
      <TextInput
        style={styles.input}
        value={vin}
        onChangeText={setVin}
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => r1Ref.current.focus()}
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Resistance R1 (Ohms):</Text>
      <TextInput
        style={styles.input}
        value={r1}
        onChangeText={setR1}
        keyboardType="numeric"
        returnKeyType="next"
        onSubmitEditing={() => r2Ref.current.focus()}
        blurOnSubmit={false}
        ref={r1Ref}
      />
      <Text style={styles.label}>Resistance R2 (Ohms):</Text>
      <TextInput
        style={styles.input}
        value={r2}
        onChangeText={setR2}
        keyboardType="numeric"
        returnKeyType="done"
        ref={r2Ref}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateOutputVoltage}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {vout !== '' && (
        <Text style={styles.resultText}>
          <Text style={styles.labelText}>Output Voltage: </Text>
          <Text style={styles.valueText}>{vout} Volts</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    color: 'white',
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
  resultText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  labelText: {
    color: 'orange', // orange text color for label
  },
  valueText: {
    color: 'white', // white text color for value
  },
});

export default VoltageDividerCalculator;
