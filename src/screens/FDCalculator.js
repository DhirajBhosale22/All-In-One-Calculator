import React, { useState, useRef  } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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

const FDCalculator = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [interestPayout, setInterestPayout] = useState('On Maturity');
  const [tenure, setTenure] = useState({ years: '', months: '', days: '' });
  const [maturityAmount, setMaturityAmount] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [payoutInterest, setPayoutInterest] = useState(null);

  // Refs for input fields
  const interestRateRef = useRef(null);
  const yearsRef = useRef(null);
  const monthsRef = useRef(null);
  const daysRef = useRef(null);

  const calculateFD = () => {
    const P = parseFloat(depositAmount);
    const r = parseFloat(interestRate) / 100;

    // Calculate total tenure in years
    let t = 0;
    if (tenure.years) t += parseInt(tenure.years);
    if (tenure.months) t += parseInt(tenure.months) / 12;
    if (tenure.days) t += parseInt(tenure.days) / 365;

    if (isNaN(P) || isNaN(r) || isNaN(t)) {
      return;
    }

    const n = 4; // Interest compounded quarterly

    // Calculate maturity amount using compound interest formula
    const A = P * Math.pow((1 + r / n), (n * t));
    const totalInterest = A - P;

    setMaturityAmount(Math.round(A));
    setTotalInterest(Math.round(totalInterest));

    if (interestPayout === 'Monthly') {
      setPayoutInterest(Math.round((totalInterest / (t * 12))));
    } else if (interestPayout === 'Quarterly') {
      setPayoutInterest(Math.round((totalInterest / (t * 4))));
    } else if (interestPayout === 'Short Term') {
      setPayoutInterest(Math.round((totalInterest / (t * 2)))); // Short term is assumed to be 6 months
    } else {
      setPayoutInterest(null);
    }
  };

  const clearAll = () => {
    setDepositAmount('');
    setInterestRate('');
    setInterestPayout('On Maturity');
    setTenure({ years: '', months: '', days: '' });
    setMaturityAmount(null);
    setTotalInterest(null);
    setPayoutInterest(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>FD Calculator</Text>

        <Text style={styles.label}>Deposit Amount (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="Deposit Amount"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={depositAmount}
          onChangeText={setDepositAmount}
          onSubmitEditing={() => interestRateRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
        />

        <Text style={styles.label}>Interest Rate (%)</Text>
        <TextInput
          ref={interestRateRef}
          style={styles.input}
          placeholder="Interest Rate (%)"
          placeholderTextColor='white'
          keyboardType="numeric"
          value={interestRate}
          onChangeText={setInterestRate}
          onSubmitEditing={() => yearsRef.current.focus()}
          returnKeyType="next"
          blurOnSubmit={false}
        />

        <View style={styles.pickerContainer}>
          <Text style={[styles.label, { color: 'white' }]}>Interest Payout</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={interestPayout}
              onValueChange={(itemValue) => setInterestPayout(itemValue)}
              style={{ color: 'white' }}
            >
              <Picker.Item label="On Maturity" value="On Maturity" />
              <Picker.Item label="Monthly" value="Monthly" />
              <Picker.Item label="Quarterly" value="Quarterly" />
              <Picker.Item label="Short Term" value="Short Term" />
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Tenure</Text>
        <View style={styles.tenure}>
          <View style={styles.date}>
            <Text style={styles.label}>Years</Text>
            <TextInput
              ref={yearsRef}
              style={styles.input}
              placeholder="Years"
              placeholderTextColor='white'
              keyboardType="numeric"
              value={tenure.years}
              onChangeText={(value) => setTenure({ ...tenure, years: value })}
              onSubmitEditing={() => monthsRef.current.focus()}
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.date}>
            <Text style={styles.label}>Months</Text>
            <TextInput
              ref={monthsRef}
              style={styles.input}
              placeholder="Months"
              placeholderTextColor='white'
              keyboardType="numeric"
              value={tenure.months}
              onChangeText={(value) => setTenure({ ...tenure, months: value })}
              onSubmitEditing={() => daysRef.current.focus()}
              returnKeyType="next"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.date}>
          <Text style={styles.label}>Days</Text>
            <TextInput
              ref={daysRef}
              style={styles.input}
              placeholder="Days"
              placeholderTextColor='white'
              keyboardType="numeric"
              value={tenure.days}
              onChangeText={(value) => setTenure({ ...tenure, days: value })}
              returnKeyType="done"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.calculateButton} onPress={calculateFD}>
            <Text style={styles.buttonText}>CALCULATE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
            <Text style={styles.buttonText}>CLEAR ALL</Text>
          </TouchableOpacity>
        </View>

        {maturityAmount !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Total Deposit Amount:</Text>
            <Text style={styles.result}> ₹ {parseInt(depositAmount).toLocaleString('en-IN')} ({convertToIndianWords(depositAmount)})</Text>
            <Text style={styles.resultText}>Total Interest:</Text>
            <Text style={styles.result}> ₹ {totalInterest.toLocaleString('en-IN')} ({convertToIndianWords(totalInterest)})</Text>
            <Text style={styles.resultText}>Maturity Amount:</Text>
            <Text style={styles.result}> ₹ {maturityAmount.toLocaleString('en-IN')} ({convertToIndianWords(maturityAmount)})</Text>

            {payoutInterest !== null && (
              <View>
                <Text style={styles.resultText}>{interestPayout} Payout Interest:</Text>
                <Text style={styles.result}> ₹ {payoutInterest.toLocaleString('en-IN')} ({convertToIndianWords(payoutInterest)})</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
  input: {
    height: 40,
    borderColor: 'orange',
    color: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  tenure: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  date: {
    flex: 1,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
    backgroundColor: 'orange',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calculateButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
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
    fontWeight: 'bold',
  },
  result: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
});


export default FDCalculator;
