import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

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

const IncomeTaxCalculator = () => {
  const grossIncomeRef = useRef(null);
  const deductionsRef = useRef(null);
  const exemptionsRef = useRef(null);
  const creditsRef = useRef(null);

  const [grossIncome, setGrossIncome] = useState('');
  const [deductions, setDeductions] = useState('');
  const [exemptions, setExemptions] = useState('');
  const [credits, setCredits] = useState('');
  const [taxOwed, setTaxOwed] = useState<string | null>(null);

  // Function to calculate taxable income
  const calculateTaxableIncome = () => {
    const gross = parseFloat(grossIncome) || 0;
    const deduct = parseFloat(deductions) || 0;
    const exempt = parseFloat(exemptions) || 0;
    return gross - deduct - exempt;
  };

  // Function to calculate tax based on taxable income and tax brackets
  const calculateTax = (taxableIncome: number) => {
    let tax = 0;
    if (taxableIncome <= 9875) {
      tax = taxableIncome * 0.10;
    } else if (taxableIncome <= 40125) {
      tax = 9875 * 0.10 + (taxableIncome - 9875) * 0.12;
    } else if (taxableIncome <= 85525) {
      tax = 9875 * 0.10 + (40125 - 9875) * 0.12 + (taxableIncome - 40125) * 0.22;
    } else if (taxableIncome <= 163300) {
      tax = 9875 * 0.10 + (40125 - 9875) * 0.12 + (85525 - 40125) * 0.22 + (taxableIncome - 85525) * 0.24;
    } else if (taxableIncome <= 207350) {
      tax = 9875 * 0.10 + (40125 - 9875) * 0.12 + (85525 - 40125) * 0.22 + (163300 - 85525) * 0.24 + (taxableIncome - 163300) * 0.32;
    } else if (taxableIncome <= 518400) {
      tax = 9875 * 0.10 + (40125 - 9875) * 0.12 + (85525 - 40125) * 0.22 + (163300 - 85525) * 0.24 + (207350 - 163300) * 0.32 + (taxableIncome - 207350) * 0.35;
    } else {
      tax = 9875 * 0.10 + (40125 - 9875) * 0.12 + (85525 - 40125) * 0.22 + (163300 - 85525) * 0.24 + (207350 - 163300) * 0.32 + (518400 - 207350) * 0.35 + (taxableIncome - 518400) * 0.37;
    }
    return tax;
  };

  // Function to handle the calculation of tax owed
  const handleCalculate = () => {
    const taxableIncome = calculateTaxableIncome();
    const tax = calculateTax(taxableIncome);
    const totalTaxOwed = tax - (parseFloat(credits) || 0);
    setTaxOwed(Math.round(totalTaxOwed));
  };

  // Function to clear all inputs
  const handleClear = () => {
    setGrossIncome('');
    setDeductions('');
    setExemptions('');
    setCredits('');
    setTaxOwed(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Income Tax Calculator</Text>
        <Text style={styles.label}>Gross Income Amount</Text>
       <TextInput
          ref={grossIncomeRef}
          style={styles.input}
          placeholder="Gross Income"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={grossIncome}
          onChangeText={setGrossIncome}
          onSubmitEditing={() => deductionsRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Deductions Amount</Text>
        <TextInput
          ref={deductionsRef}
          style={styles.input}
          placeholder="Deductions"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={deductions}
          onChangeText={setDeductions}
          onSubmitEditing={() => exemptionsRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Exemptions Amount</Text>
        <TextInput
          ref={exemptionsRef}
          style={styles.input}
          placeholder="Exemptions"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={exemptions}
          onChangeText={setExemptions}
          onSubmitEditing={() => creditsRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Credits Amount</Text>
        <TextInput
          ref={creditsRef}
          style={styles.input}
          placeholder="Credits"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={credits}
          onChangeText={setCredits}
        returnKeyType="done"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calculateButton} onPress={handleCalculate}>
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
        {taxOwed !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Tax Owed: <Text style={styles.result}> ₹ {taxOwed.toLocaleString('en-IN')} ({convertToIndianWords(taxOwed)})</Text></Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    borderRadius:5,
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
    textAlign:'center',
  },
  result: {
    color: 'white',
    fontSize: 20,
    marginVertical: 5,
    textAlign:'center',
  },
});

export default IncomeTaxCalculator;
