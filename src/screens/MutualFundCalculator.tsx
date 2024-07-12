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

const MutualFundCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [annualReturnRate, setAnnualReturnRate] = useState('');
  const [years, setYears] = useState('');
  const [finalAmount, setFinalAmount] = useState<string | null>(null);
  const [interestAmount, setInterestAmount] = useState<string | null>(null);
// Refs for focusing next input
const annualReturnRateRef = useRef(null);
const yearsRef = useRef(null);
  const calculateMutualFund = () => {
    const P = parseFloat(initialInvestment);
    const r = parseFloat(annualReturnRate) / 100;
    const t = parseFloat(years);

    if (isNaN(P) || isNaN(r) || isNaN(t)) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const n = 1;
    const A = P * Math.pow(1 + r / n, n * t);

    setFinalAmount(Math.round(A));
    setInterestAmount(Math.round(A - P));
  };

  const handleClear = () => {
    setInitialInvestment('');
    setAnnualReturnRate('');
    setYears('');
    setFinalAmount(null);
    setInterestAmount(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Mutual Fund Calculator</Text>
        <Text style={styles.label}>Initial Investment Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Initial Investment"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={initialInvestment}
          onChangeText={setInitialInvestment}
          returnKeyType="next"
          onSubmitEditing={() => annualReturnRateRef.current.focus()}
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Annual Return Rate (%)</Text>
        <TextInput
          ref={annualReturnRateRef}
          style={styles.input}
          placeholder="Annual Return Rate (%)"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={annualReturnRate}
          onChangeText={setAnnualReturnRate}
          returnKeyType="next"
          onSubmitEditing={() => yearsRef.current.focus()}
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Investment Duration (Years)</Text>
        <TextInput
          ref={yearsRef}
          style={styles.input}
          placeholder="Years"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={years}
          onChangeText={setYears}
          returnKeyType="done"
          
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calculateButton} onPress={calculateMutualFund}>
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
        {finalAmount && interestAmount && (
          <View style={styles.resultContainer}>
            <Text style={[styles.resultText, { color: 'orange', textAlign: 'center' }]}>
              Initial Investment: <Text style={{ color: 'white' }}>₹ {parseInt(initialInvestment).toLocaleString('en-IN')} ({convertToIndianWords(parseInt(initialInvestment))})</Text>
            </Text>
            <Text style={[styles.resultText, { color: 'orange', textAlign: 'center' }]}>
              Interest Amount: <Text style={{ color: 'white' }}>₹ {parseInt(interestAmount).toLocaleString('en-IN')} ({convertToIndianWords(parseInt(interestAmount))})</Text>
            </Text>
            <Text style={[styles.resultText, { color: 'orange', textAlign: 'center' }]}>
              Total Amount: <Text style={{ color: 'white' }}>₹ {parseInt(finalAmount).toLocaleString('en-IN')} ({convertToIndianWords(parseInt(finalAmount))})</Text>
            </Text>
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
    fontWeight: 'bold',
  },
});

export default MutualFundCalculator;
