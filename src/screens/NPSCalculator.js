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

const NPSCalculator = () => {
  const ageRef = useRef(null);
  const monthlyContributionRef = useRef(null);
  const interestRateRef = useRef(null);
  const annuityPercentageRef = useRef(null);
  const annuityReturnRateRef = useRef(null);
  const [age, setAge] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [annuityPercentage, setAnnuityPercentage] = useState('');
  const [annuityReturnRate, setAnnuityReturnRate] = useState('');
  const [results, setResults] = useState(null);

  const calculateNPS = () => {
    const ageInt = parseInt(age);
    const contribution = parseFloat(monthlyContribution);
    const rate = parseFloat(interestRate) / 100;
    const annuityPercent = parseFloat(annuityPercentage) / 100;
    const annuityRate = parseFloat(annuityReturnRate) / 100;
    const yearsToContribute = 60 - ageInt;
    const monthsToContribute = yearsToContribute * 12;

    let totalInvestment = contribution * monthsToContribute;
    let pensionWealth = contribution * ((Math.pow(1 + rate / 12, monthsToContribute) - 1) / (rate / 12)) * (1 + rate / 12);
    let lumpsumAmount = pensionWealth * (1 - annuityPercent);
    let annuityAmount = pensionWealth * annuityPercent;
    let monthlyPension = (annuityAmount * annuityRate) / 12;

    const calculatedResults = {
      totalInvestment: Math.round(totalInvestment),
      pensionWealth: Math.round(pensionWealth),
      lumpsumAmount: Math.round(lumpsumAmount),
      monthlyPension: Math.round(monthlyPension),
    };

    setResults(calculatedResults);
  };

  const clearFields = () => {
    setAge('');
    setMonthlyContribution('');
    setInterestRate('');
    setAnnuityPercentage('');
    setAnnuityReturnRate('');
    setResults(null);
  };
  const focusNextField = (nextField) => {
    nextField.current.focus();
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>NPS Calculator</Text>
      <Text style={styles.label}>Enter your age</Text>
      <TextInput
        ref={ageRef}
        style={styles.input}
        placeholder="Enter your age"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        maxLength={3}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => focusNextField(monthlyContributionRef)}
      />
      <Text style={styles.label}>Monthly Contribution (₹)</Text>
      <TextInput
        ref={monthlyContributionRef}
        style={styles.input}
        placeholder="Monthly Contribution (₹)"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={monthlyContribution}
        onChangeText={setMonthlyContribution}
        maxLength={10}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => focusNextField(interestRateRef)}
      />
      <Text style={styles.label}>Expected Interest Rate (%)</Text>
      <TextInput
        ref={interestRateRef}
        style={styles.input}
        placeholder="Expected Interest Rate (%)"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={interestRate}
        onChangeText={setInterestRate}
        maxLength={5}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => focusNextField(annuityPercentageRef)}
      />
      <Text style={styles.label}>Annuity Purchase Percentage (%)</Text>
      <TextInput
        ref={annuityPercentageRef}
        style={styles.input}
        placeholder="Annuity Purchase Percentage (%)"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={annuityPercentage}
        onChangeText={setAnnuityPercentage}
        maxLength={5}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => focusNextField(annuityReturnRateRef)}
      />
      <Text style={styles.label}>Expected Return on Annuity (%)</Text>
      <TextInput
        ref={annuityReturnRateRef}
        style={styles.input}
        placeholder="Expected Return on Annuity (%)"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={annuityReturnRate}
        onChangeText={setAnnuityReturnRate}
        maxLength={5}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="done"
        
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={calculateNPS}>
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearFields}>
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>

      {results && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            Total investment: <Text style={styles.resultValue}>₹ {results.totalInvestment.toLocaleString('en-IN')} ({convertToIndianWords(results.totalInvestment)})</Text>
          </Text>
          <Text style={styles.resultText}>
            Pension wealth: <Text style={styles.resultValue}>₹ {results.pensionWealth.toLocaleString('en-IN')} ({convertToIndianWords(results.pensionWealth)})</Text>
          </Text>
          <Text style={styles.resultText}>
            Lumpsum amount: <Text style={styles.resultValue}>₹ {results.lumpsumAmount.toLocaleString('en-IN')} ({convertToIndianWords(results.lumpsumAmount)})</Text>
          </Text>
          <Text style={styles.resultText}>
            Monthly pension: <Text style={styles.resultValue}>₹ {results.monthlyPension.toLocaleString('en-IN')} ({convertToIndianWords(results.monthlyPension)})</Text>
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#fff',
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF8C00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    color: 'orange',
    textAlign: 'center',
  },
  resultText: {
    fontSize:20,
    color: 'orange',
    fontWeight: 'bold',
  },
  resultValue: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NPSCalculator;
