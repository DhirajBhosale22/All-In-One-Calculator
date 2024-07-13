import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// Function to convert number to Indian numbering system words
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

const InflationCalculator = () => {
  const [initialAmount, setInitialAmount] = useState('');
  const [annualInflationRate, setAnnualInflationRate] = useState('');
  const [numberOfYears, setNumberOfYears] = useState('');
  const [futureValue, setFutureValue] = useState<string | null>(null);

  const annualInflationRateRef = useRef<TextInput>(null);
  const numberOfYearsRef = useRef<TextInput>(null);

   // Function to handle tab press between input fields
   const handleTab = (currentRef) => {
    if (currentRef === annualInflationRateRef && numberOfYearsRef.current) {
      numberOfYearsRef.current.focus();
    } else {
      Keyboard.dismiss(); // Dismiss keyboard after focusing on last field
    }
  };
  // Function to calculate the future value of money
  const calculateFutureValue = () => {
    const principal = parseFloat(initialAmount);
    const rate = parseFloat(annualInflationRate) / 100;
    const years = parseFloat(numberOfYears);

    if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
      alert('Please fill in all fields correctly.');
      return;
    }

    // Future Value formula: FV = PV * (1 + r)^n
    const futureValue = principal * Math.pow(1 + rate, years);
    setFutureValue(Math.round(futureValue));
  };

  // Function to clear all inputs
  const handleClear = () => {
    setInitialAmount('');
    setAnnualInflationRate('');
    setNumberOfYears('');
    setFutureValue(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Inflation Calculator</Text>
        <Text style={styles.label}>Initial Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Initial Amount"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={initialAmount}
          onChangeText={setInitialAmount}
          returnKeyType="next"
          onSubmitEditing={() => annualInflationRateRef.current && annualInflationRateRef.current.focus()}
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Annual Inflation Rate (%)</Text>
        <TextInput
          ref={annualInflationRateRef}
          style={styles.input}
          placeholder="Annual Inflation Rate (%)"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={annualInflationRate}
          onChangeText={setAnnualInflationRate}
          returnKeyType="next"
          onSubmitEditing={() => numberOfYearsRef.current && numberOfYearsRef.current.focus()}
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Number of Years</Text>
        <TextInput
          ref={numberOfYearsRef}
          style={styles.input}
          placeholder="Number of Years"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={numberOfYears}
          onChangeText={setNumberOfYears}
          returnKeyType="done"
      
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calculateButton} onPress={calculateFutureValue}>
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
        {futureValue !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Future Value: <Text style={styles.result}> ₹ {futureValue.toLocaleString('en-IN')} ({convertToIndianWords(futureValue)})</Text>
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'orange',
    color: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
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
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 20,
    marginVertical: 5,
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  result: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default InflationCalculator;
