import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const convertToIndianWords = (number) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const numToWords = (num) => {
    if (num === 0) return '';
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    const digit = num % 10;
    return `${tens[Math.floor(num / 10)]} ${ones[digit]}`.trim();
  };

  const inWords = (num) => {
    if (num === 0) return 'Zero';
    const crore = Math.floor(num / 10000000);
    const lakh = Math.floor((num % 10000000) / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const hundreds = Math.floor((num % 1000) / 100);
    const remainder = num % 100;

    let words = '';
    if (crore > 0) {
      words += `${numToWords(crore)} Crore `;
    }
    if (lakh > 0) {
      words += `${numToWords(lakh)} Lakh `;
    }
    if (thousand > 0) {
      words += `${numToWords(thousand)} Thousand `;
    }
    if (hundreds > 0) {
      words += `${numToWords(hundreds)} Hundred `;
    }
    if (remainder > 0) {
      words += numToWords(remainder);
    }

    return words.trim();
  };

  return inWords(number);
};

const RetirementCalculator = () => {
  const [presentValue, setPresentValue] = useState('');
  const [rateOfReturn, setRateOfReturn] = useState('');
  const [yearsUntilRetirement, setYearsUntilRetirement] = useState('');
  const [futureValue, setFutureValue] = useState('');
  const presentValueRef = useRef(null);
  const rateOfReturnRef = useRef(null);
  const yearsUntilRetirementRef = useRef(null);
  const calculateFutureValue = () => {
    const PV = parseFloat(presentValue);
    const r = parseFloat(rateOfReturn) / 100;
    const n = parseInt(yearsUntilRetirement);
    if (isNaN(PV) || isNaN(r) || isNaN(n)) {
      alert('Please fill in all fields correctly.');
      return;
    }
    const FV = PV * Math.pow(1 + r, n);
    setFutureValue(`Future Value: ₹ ${Math.round(FV).toLocaleString('en-IN')} (${convertToIndianWords(Math.round(FV))})`);
  };

  const clearFields = () => {
    setPresentValue('');
    setRateOfReturn('');
    setYearsUntilRetirement('');
    setFutureValue('');
  };

  const renderFutureValue = () => {
    if (futureValue) {
      const [label, value] = futureValue.split(': ');
      return (
        <Text style={styles.resultText}>
          <Text style={styles.resultLabel}>{label}:</Text>
          <Text style={styles.resultValue}> {value}</Text>
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Retirement Calculator</Text>
      <Text style={styles.label}>Present Value:</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Enter present value"
        keyboardType="numeric"
        value={presentValue}
        onChangeText={setPresentValue}
        returnKeyType="next"
        onSubmitEditing={() => rateOfReturnRef.current.focus()}
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Annual Rate of Return(%):</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Enter rate of return"
        keyboardType="numeric"
        value={rateOfReturn}
        onChangeText={setRateOfReturn}
        returnKeyType="next"
        ref={rateOfReturnRef}
        onSubmitEditing={() => yearsUntilRetirementRef.current.focus()}
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Years Until Retirement:</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="white"
        placeholder="Enter number of years"
        keyboardType="numeric"
        value={yearsUntilRetirement}
        onChangeText={setYearsUntilRetirement}
        returnKeyType="done"
        ref={yearsUntilRetirementRef}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateFutureValue}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {renderFutureValue()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
    borderRadius: 5,
    marginBottom: 20,
    borderColor: 'orange',
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    alignSelf: 'center',
    marginTop: 20,
  },
  resultLabel: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultValue: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RetirementCalculator;
