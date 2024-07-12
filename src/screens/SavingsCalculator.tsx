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

const SavingsCalculator = () => {
  // State variables to hold the user inputs
  const [initialSavings, setInitialSavings] = useState('');
  const [monthlyDeposit, setMonthlyDeposit] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('monthly'); // Default compounding frequency

  // State variable to hold the calculated result
  const [finalAmount, setFinalAmount] = useState<string | null>(null);
  const [totalInterest, setTotalInterest] = useState<string | null>(null);
  // References for each TextInput
  const initialSavingsRef = useRef(null);
  const monthlyDepositRef = useRef(null);
  const annualInterestRateRef = useRef(null);
  const yearsRef = useRef(null);
  // Compounding frequency options
  const frequencies = [
    { label: 'Annually', value: 'annually' },
    { label: 'Semiannually', value: 'semiannually' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  // Function to calculate the final savings amount
  const calculateSavings = () => {
    // Convert input values to numbers
    const P = parseFloat(initialSavings);
    const D = parseFloat(monthlyDeposit);
    const r = parseFloat(annualInterestRate) / 100; // Annual interest rate
    const n = parseFloat(years); // Number of years

    // Validate the input
    if (isNaN(P) || isNaN(D) || isNaN(r) || isNaN(n)) {
      alert('Please fill in all fields correctly.');
      return;
    }

    // Determine compounding frequency
    let compoundingsPerYear;
    switch (compoundingFrequency) {
      case 'annually':
        compoundingsPerYear = 11.96168;
        break;
      case 'semiannually':
        compoundingsPerYear =  11.982267;
        break;
      case 'quarterly':
        compoundingsPerYear = 11.992849;
        break;
      case 'monthly':
        compoundingsPerYear = 12;
        break;
      default:
        compoundingsPerYear = 12;
    }

    const t = n * compoundingsPerYear; // Total number of compounding periods
    const compoundRate = r / compoundingsPerYear; // Compounding rate

    // Calculate the final value based on the compounding frequency
    let finalValue = P * Math.pow(1 + compoundRate, t) + (D * ((Math.pow(1 + compoundRate, t) - 1) / compoundRate) * (compoundingFrequency === 'monthly' ? 1 : compoundingsPerYear / 12));

    const interestEarned = finalValue - (P + D * n * 12);

    // Update the final amount and total interest
    setFinalAmount(Math.round(finalValue));
    setTotalInterest(Math.round(interestEarned));
  };

  // Function to clear all inputs
  const handleClear = () => {
    setInitialSavings('');
    setMonthlyDeposit('');
    setAnnualInterestRate('');
    setYears('');
    setFinalAmount(null);
    setTotalInterest(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Savings Calculator</Text>
        <Text style={styles.label}>Initial Savings Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Initial Savings"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={initialSavings}
          onChangeText={setInitialSavings}
          returnKeyType="next"
          ref={initialSavingsRef}
          onSubmitEditing={() => monthlyDepositRef.current.focus()}
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Monthly Deposit Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Monthly Deposit"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={monthlyDeposit}
          onChangeText={setMonthlyDeposit}
          returnKeyType="next"
          ref={monthlyDepositRef}
          onSubmitEditing={() => annualInterestRateRef.current.focus()}
          blurOnSubmit={false}
        />

        <Text style={styles.label}>Interest Rate (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Interest Rate (%)"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={annualInterestRate}
          onChangeText={setAnnualInterestRate}
          returnKeyType="next"
          ref={annualInterestRateRef}
          onSubmitEditing={() => yearsRef.current.focus()}
          blurOnSubmit={false}
        />
        <Text style={styles.label}>Compounding Frequency</Text>
        <View style={styles.radioContainer}>
          {frequencies.map((freq) => (
            <TouchableOpacity
              key={freq.value}
              style={styles.radioButton}
              onPress={() => setCompoundingFrequency(freq.value)}
            >
              <View style={[
                styles.radioCircle,
                compoundingFrequency === freq.value && styles.selectedRadioCircle,
              ]} />
              <Text style={styles.radioLabel}>{freq.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>Number of Years</Text>
        <TextInput
          style={styles.input}
          placeholder="Years"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={years}
          onChangeText={setYears}
          returnKeyType="done"
          ref={yearsRef}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calculateButton} onPress={calculateSavings}>
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>
        {finalAmount && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Final Savings Amount: <Text style={styles.result}>₹ {finalAmount.toLocaleString('en-IN')} ({convertToIndianWords(finalAmount)})</Text></Text>
            <Text style={styles.resultText}>Total Interest: <Text style={styles.result}>₹ {totalInterest.toLocaleString('en-IN')} ({convertToIndianWords(totalInterest)})</Text></Text>
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
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'orange',
    marginRight: 10,
  },
  selectedRadioCircle: {
    backgroundColor: 'orange',
  },
  radioLabel: {
    color: 'white',
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
    fontSize: 18,
    marginBottom: 5,
    color: 'orange',
   
    
  },
  result: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default SavingsCalculator;
