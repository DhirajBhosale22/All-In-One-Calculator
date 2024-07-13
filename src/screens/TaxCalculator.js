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

const TaxCalculator = () => {
  const [taxableIncome, setTaxableIncome] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [deductions, setDeductions] = useState('');
  const [totalTax, setTotalTax] = useState(null);
  const taxableIncomeRef = useRef(null);
  const taxRateRef = useRef(null);
  const deductionsRef = useRef(null);
  const calculateTax = () => {
    const income = parseFloat(taxableIncome);
    const rate = parseFloat(taxRate) / 100;
    const deduction = parseFloat(deductions);

    if (isNaN(income) || isNaN(rate) || isNaN(deduction)) {
      alert('Please enter valid numbers');
      return;
    }

    const tax = income * rate - deduction;
    setTotalTax(tax);
  };

  const clearFields = () => {
    setTaxableIncome('');
    setTaxRate('');
    setDeductions('');
    setTotalTax(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Tax Calculator</Text>
      <Text style={styles.label}>Taxable Income(₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Taxable Income"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={taxableIncome}
        onChangeText={setTaxableIncome}
        returnKeyType="next"
        onSubmitEditing={() => taxRateRef.current.focus()}
        blurOnSubmit={false}
        ref={taxableIncomeRef}
      />
      <Text style={styles.label}>Tax Rate (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Tax Rate (%)"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={taxRate}
        onChangeText={setTaxRate}
        returnKeyType="next"
        onSubmitEditing={() => deductionsRef.current.focus()}
        blurOnSubmit={false}
        ref={taxRateRef}
      />
      <Text style={styles.label}>Total Deductions Amount(₹)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Deductions Amount"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={deductions}
        onChangeText={setDeductions}
        returnKeyType="done"
        ref={deductionsRef}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.calculateButton} onPress={calculateTax}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {totalTax !== null && (
        <Text style={styles.result}>
          Total Tax:
          <Text style={{ color: 'white' }}> ₹ {Math.round(totalTax).toLocaleString('en-IN')} ({convertToIndianWords(Math.round(totalTax))})</Text>
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: 'white',
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
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: 'black',
    borderRadius: 5,
    fontSize: 15,
    color: 'white',
    marginRight: 12,  // Added marginRight to create space on the right
    borderRightWidth: 2  // Ensuring the right border is visible
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
    marginRight: 12,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange',
  },
});

export default TaxCalculator;
