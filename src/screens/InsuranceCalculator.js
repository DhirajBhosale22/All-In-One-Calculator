import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

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

  return `₹ ${number.toLocaleString('en-IN')} (${inWords(number)})`;
};

const InsuranceCalculator = () => {

  const annualIncomeRef = useRef(null);
  const yearsOfIncomeReplacementRef = useRef(null);
  const outstandingDebtsRef = useRef(null);
  const futureFinancialGoalsRef = useRef(null);
  const existingCoverageRef = useRef(null);

  const [annualIncome, setAnnualIncome] = useState('');
  const [yearsOfIncomeReplacement, setYearsOfIncomeReplacement] = useState('');
  const [outstandingDebts, setOutstandingDebts] = useState('');
  const [futureFinancialGoals, setFutureFinancialGoals] = useState('');
  const [existingCoverage, setExistingCoverage] = useState('');
  const [recommendedCoverage, setRecommendedCoverage] = useState('');
  const [estimatedPremium, setEstimatedPremium] = useState('');

  const calculateCoverage = () => {
    const incomeReplacement = parseFloat(annualIncome) * parseFloat(yearsOfIncomeReplacement);
    const debtCoverage = parseFloat(outstandingDebts);
    const futureGoals = parseFloat(futureFinancialGoals);
    const existingCoverageValue = parseFloat(existingCoverage);
    const totalRecommendedCoverage = incomeReplacement + debtCoverage + futureGoals - existingCoverageValue;
    setRecommendedCoverage(totalRecommendedCoverage);

    // Assuming a rate of $5 per $1000 of coverage
    const ratePer1000 = 5;
    const estimatedAnnualPremium = (totalRecommendedCoverage / 1000) * ratePer1000;
    setEstimatedPremium(estimatedAnnualPremium);
  };

  const clearFields = () => {
    setAnnualIncome('');
    setYearsOfIncomeReplacement('');
    setOutstandingDebts('');
    setFutureFinancialGoals('');
    setExistingCoverage('');
    setRecommendedCoverage('');
    setEstimatedPremium('');
  };
  const focusNextField = (nextField) => {
    nextField.current.focus();
  };

  const handleTab = (currentRef, nextRef) => {
    if (currentRef.current && nextRef.current) {
     
      focusNextField(nextRef);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Life Insurance Calculator</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Annual Income (₹):</Text>
          <TextInput
            ref={annualIncomeRef}
            style={styles.input}
            placeholder="Enter your annual income"
            placeholderTextColor={'white'}
            keyboardType="numeric"
            value={annualIncome}
            onChangeText={setAnnualIncome}
            onSubmitEditing={() => handleTab(annualIncomeRef, yearsOfIncomeReplacementRef)}
            blurOnSubmit={false}
              returnKeyType="next"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Desired Policy Years:</Text>
          <TextInput
            ref={yearsOfIncomeReplacementRef}
            style={styles.input}
            placeholder="Enter number of years"
            placeholderTextColor={'white'}
            keyboardType="numeric"
            value={yearsOfIncomeReplacement}
            onChangeText={setYearsOfIncomeReplacement}
            onSubmitEditing={() => handleTab(yearsOfIncomeReplacementRef, outstandingDebtsRef)}
            blurOnSubmit={false}
              returnKeyType="next"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Outstanding Debts (₹):</Text>
          <TextInput
            ref={outstandingDebtsRef}
            style={styles.input}
            placeholder="Enter your outstanding debts"
            placeholderTextColor={'white'}
            keyboardType="numeric"
            value={outstandingDebts}
            onChangeText={setOutstandingDebts}
            onSubmitEditing={() => handleTab(outstandingDebtsRef, futureFinancialGoalsRef)}
            blurOnSubmit={false}
              returnKeyType="next"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Future Financial Goals (₹):</Text>
          <TextInput
            ref={futureFinancialGoalsRef}
            style={styles.input}
            placeholder="Enter future financial goals"
            placeholderTextColor={'white'}
            keyboardType="numeric"
            value={futureFinancialGoals}
            onChangeText={setFutureFinancialGoals}
            onSubmitEditing={() => handleTab(futureFinancialGoalsRef, existingCoverageRef)}
            blurOnSubmit={false}
              returnKeyType="next"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Existing Life Insurance (₹):</Text>
          <TextInput
            ref={existingCoverageRef}
            style={styles.input}
            placeholder="Enter existing coverage"
            placeholderTextColor={'white'}
            keyboardType="numeric"
            value={existingCoverage}
            onChangeText={setExistingCoverage}
              returnKeyType="done"
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calculateButton} onPress={calculateCoverage}>
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.clearButton} onPress={clearFields}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
        
        {recommendedCoverage !== '' && (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>
              Total Recommended Coverage:
              <Text style={{ color: 'white' }}> {convertToIndianWords(Math.round(recommendedCoverage))}</Text>
            </Text>
            
            <Text style={styles.result}>
              Estimated Annual Premium:
              <Text style={{ color: 'white' }}> {convertToIndianWords(Math.round(estimatedPremium))}</Text>
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 21,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 5,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  calculateButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
    color: 'orange',
    fontWeight: 'bold',
  },
});

export default InsuranceCalculator;
