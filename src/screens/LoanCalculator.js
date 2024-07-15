import React, { useState, useRef } from 'react';
import { SafeAreaView, Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, Alert} from 'react-native';

const LoanCalculator = ({ navigation }) => {
  const [emi, setEmi] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');
  const [charges, setCharges] = useState('');
  const [result, setResult] = useState(null);
  const [paymentChart, setPaymentChart] = useState([]);
 // Refs for managing focus
 const annualRateRef = useRef(null);
 const yearsRef = useRef(null);
 const monthsRef = useRef(null);
 const chargesRef = useRef(null);

 // Function to focus next input field
 const focusNextField = (nextRef) => {
   if (nextRef.current) {
     nextRef.current.focus();
   }
 };
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
  
  

  const calculateLoan = () => {
    const emiNumber = parseFloat(emi);
    const annualRateNumber = parseFloat(annualRate);
    const yearsNumber = parseInt(years) || 0;
    const monthsNumber = parseInt(months) || 0;
    const chargesNumber = parseFloat(charges) || 0;

    if (
      isNaN(emiNumber) ||
      isNaN(annualRateNumber) ||
      (yearsNumber <= 0 && monthsNumber <= 0)
    )  {
      Alert.alert('Invalid input', 'Please fill all input fields correctly.');
      return;
    }
      const totalMonths = yearsNumber * 12 + monthsNumber;
      const monthlyRate = annualRateNumber / 12 / 100;

      // Calculate principal amount
      const principalNumber =
        (emiNumber * (Math.pow(1 + monthlyRate, totalMonths) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));

      const totalInterest = emiNumber * totalMonths - principalNumber;
      const totalCharges = chargesNumber;
      const totalAmount = principalNumber + totalInterest + totalCharges;

      let balance = principalNumber;
      const paymentChartData = [];
      for (let i = 0; i < totalMonths; i++) {
        const interest = balance * monthlyRate;
        const principalPaid = emiNumber - interest;
        balance -= principalPaid;

        paymentChartData.push({
          month: i + 1,
          principalPaid: Math.round(principalPaid ),
          interest: Math.round(interest ),
          totalPayment: Math.round(emiNumber ),
          balance: balance > 0 ? Math.round(balance ) : '0',
        });
      }

      setResult({
        principalAmount: Math.round(principalNumber ),
        totalInterest: Math.round(totalInterest ),
        totalCharges: Math.round(totalCharges ),
        totalAmount: Math.round(totalAmount ),
      });
      setPaymentChart(paymentChartData);
    
  };

  const clearAll = () => {
    setEmi('');
    setAnnualRate('');
    setYears('');
    setMonths('');
    setCharges('');
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
                  style={styles.input}
                  placeholder="EMI Amount"
                  placeholderTextColor="white"
                  keyboardType="numeric"
                  value={emi}
                  onChangeText={(text) => setEmi(text)}
                  onSubmitEditing={() => focusNextField(annualRateRef)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
               <TextInput
                  ref={annualRateRef}
                  style={styles.input}
                  placeholder="Interest %"
                  placeholderTextColor="white"
                  keyboardType="numeric"
                  value={annualRate}
                  onChangeText={(text) => setAnnualRate(text)}
                  onSubmitEditing={() => focusNextField(yearsRef)}
                  returnKeyType="next"
                  blurOnSubmit={false}
                />
                <View style={styles.row}>
                <TextInput
                    ref={yearsRef}
                    style={[styles.input, styles.tenureInput]}
                    placeholder="Year"
                    placeholderTextColor="white"
                    keyboardType="numeric"
                    value={years}
                    onChangeText={(text) => setYears(text)}
                    onSubmitEditing={() => focusNextField(monthsRef)}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                    <TextInput
                    ref={monthsRef}
                    style={[styles.input, styles.tenureInput]}
                    placeholder="Month"
                    placeholderTextColor="white"
                    keyboardType="numeric"
                    value={months}
                    onChangeText={(text) => setMonths(text)}
                    onSubmitEditing={() => focusNextField(chargesRef)}
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </View>
                <TextInput
                  ref={chargesRef}
                  style={styles.input}
                  placeholder="Charges"
                  placeholderTextColor="white"
                  keyboardType="numeric"
                  value={charges}
                  onChangeText={(text) => setCharges(text)}
                  
                  returnKeyType="done"
                />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={calculateLoan}>
                    <Text style={styles.buttonText}>CALCULATE LOAN</Text>
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
                <Text style={styles.resultText}>Principal Loan Amount: <Text style={{ color: 'white' }}> ₹ {result.principalAmount.toLocaleString('en-IN')} ({convertToIndianWords(result.principalAmount)})</Text></Text>
  </View>
  <View style={styles.resultItem}>
    <Text style={styles.resultText}>Total Interest: <Text style={{ color: 'white' }}> ₹ {result.totalInterest.toLocaleString('en-IN')} ({convertToIndianWords(result.totalInterest)})</Text></Text>
  </View>
  <View style={styles.resultItem}>
    <Text style={styles.resultText}>Total Charges: <Text style={{ color: 'white' }}> ₹ {result.totalCharges.toLocaleString('en-IN')} ({convertToIndianWords(result.totalCharges)})</Text></Text>
  </View>
  <View style={styles.resultItem}>
    <Text style={styles.resultText}>Total Payable Amount: <Text style={{ color: 'white' }}> ₹ {result.totalAmount.toLocaleString('en-IN')} ({convertToIndianWords(result.totalAmount)})</Text></Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tenureInput: {
    width: '48%',
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

export default LoanCalculator;
