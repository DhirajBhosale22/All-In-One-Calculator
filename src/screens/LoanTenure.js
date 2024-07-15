import React, { useState, useRef } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';

const LoanTenure = ({ navigation }) => {
  const [emi, setEmi] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [result, setResult] = useState(null);
  const [paymentChart, setPaymentChart] = useState([]);
  const loanAmountRef = useRef(null);
  const emiRef = useRef(null);
  const interestRateRef = useRef(null);

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
  
  

  const calculateTenure = () => {
    const emiNumber = parseFloat(emi);
    const loanAmountNumber = parseFloat(loanAmount);
    const interestRateNumber = parseFloat(interestRate) / 100 / 12;

    if (!isNaN(emiNumber) && !isNaN(loanAmountNumber) && !isNaN(interestRateNumber)) {
      let balance = loanAmountNumber;
      let months = 0;
      const paymentChartData = [];
      
      while (balance > 0) {
        const interest = balance * interestRateNumber;
        const principalPaid = emiNumber - interest;
        balance -= principalPaid;
        months++;
        
        paymentChartData.push({
          month: months,
          principalPaid: Math.round(principalPaid ),
          interest: Math.round(interest ),
          totalPayment: Math.round(emiNumber ),
          balance: balance > 0 ? Math.round(balance ) : '0',
        });
      }

      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;

      setResult({
        totalMonths: months,
        years,
        remainingMonths,
        totalInterest: Math.round((emiNumber * months - loanAmountNumber) ),
        totalAmount: Math.round((emiNumber * months) ),
      });
      setPaymentChart(paymentChartData);
    } else {
      Alert.alert('Invalid input', 'Please fill all input fields correctly.');
      setResult(null);
      setPaymentChart([]);
    }
  };

  const clearAll = () => {
    setEmi('');
    setLoanAmount('');
    setInterestRate('');
    setResult(null);
    setPaymentChart([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={[{ key: 'input' }, { key: 'result' }]} // Dummy data for sections
        renderItem={({ item }) => {
          if (item.key === 'input') {
            return (
              <View style={styles.inputContainer}>
                <TextInput
                  ref={loanAmountRef}
                  style={styles.input}
                  placeholder="Loan Amount"
                  placeholderTextColor="white"
                  keyboardType="numeric"
                  value={loanAmount}
                  onChangeText={(text) => setLoanAmount(text)}
                  returnKeyType="next"
                  onSubmitEditing={() => emiRef.current.focus()}
                  blurOnSubmit={false}
                />
                <TextInput
                  ref={emiRef}
                  style={styles.input}
                  placeholder="EMI Amount"
                  placeholderTextColor="white"
                  keyboardType="numeric"
                  value={emi}
                  onChangeText={(text) => setEmi(text)}
                  returnKeyType="next"
                  onSubmitEditing={() => interestRateRef.current.focus()}
                  blurOnSubmit={false}
                />
                <TextInput
                  ref={interestRateRef}
                  style={styles.input}
                  placeholder="Interest %"
                  placeholderTextColor="white"
                  keyboardType="numeric"
                  value={interestRate}
                  onChangeText={(text) => setInterestRate(text)}
                  returnKeyType="done"
                 
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={calculateTenure}>
                    <Text style={styles.buttonText}>CALCULATE TENURE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button1} onPress={clearAll}>
                    <Text style={styles.buttonText}>CLEAR ALL</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          } else if (item.key === 'result' && result !== null) {
            return (
              <View style={styles.resultContainer}>
                <View style={styles.resultItem}>
                <Text style={styles.resultText}>Total Tenure: <Text style={{ color: "white" }}>{result.years} years and {result.remainingMonths} months</Text></Text>
  </View>
  <View style={styles.resultItem}>
    <Text style={styles.resultText}>Total Interest: <Text style={{ color: "white" }}>₹ {result.totalInterest.toLocaleString('en-IN')} ({convertToIndianWords(result.totalInterest)})</Text></Text>
  </View>
  <View style={styles.resultItem}>
    <Text style={styles.resultText}>Total Payable Amount: <Text style={{ color: "white" }}>₹ {result.totalAmount.toLocaleString('en-IN')} ({convertToIndianWords(result.totalAmount)})</Text></Text>
                </View>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() => navigation.navigate('PaymentDetails', { paymentChart })}
                >
                  <Text style={styles.detailsButtonText}>VIEW DETAILS</Text>
                </TouchableOpacity>
              </View>
            );
          }
          return null;
        }}
        keyExtractor={(item, index) => index.toString()}
        nestedScrollEnabled={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  button1: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultItem: {
    width: '100%',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    color: 'orange',
    fontWeight: 'bold',
  },
  detailsButton: {
    marginTop: 20,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoanTenure;
