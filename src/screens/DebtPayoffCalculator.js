import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

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

  return `${inWords(number)}`;
};

const DebtPayoffCalculator = () => {

  // Refs for input fields
  const balanceRef = useRef(null);
  const annualInterestRateRef = useRef(null);
  const monthlyPaymentRef = useRef(null);

  // State variables to manage input fields and results
  const [balance, setBalance] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [paymentStrategy, setPaymentStrategy] = useState("minimum");
  const [results, setResults] = useState([]);

  // Function to calculate the debt payoff schedule
  const calculateDebtPayoff = () => {
    let balanceAmount = parseFloat(balance);
    const annualRate = parseFloat(annualInterestRate);
    const monthlyPaymentAmount = parseFloat(monthlyPayment);
    const monthlyInterestRate = annualRate / 12 / 100;
    let month = 0;
    let totalPaid = 0;
    let calculations = [];

    // Loop to calculate the balance, interest, principal, and total paid each month
    while (balanceAmount > 0) {
      const interest = balanceAmount * monthlyInterestRate;
      const principal = monthlyPaymentAmount - interest;
      balanceAmount -= principal;
      totalPaid += monthlyPaymentAmount;
      month += 1;
      calculations.push({
        month,
        balance: Math.round(balanceAmount),
        interest: Math.round(interest),
        principal: Math.round(principal),
        totalPaid: Math.round(totalPaid),
      });
      // Break loop if balance is paid off
      if (balanceAmount <= 0) break;
    }
    setResults(calculations); // Update the state with calculation results
  };

  const clearAll = () => {
    setBalance("");
    setAnnualInterestRate("");
    setMonthlyPayment("");
    setResults([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Debt Payoff Calculator</Text>
      <TextInput
        ref={balanceRef}
        style={styles.input}
        placeholder="Enter the balance of your debt"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={balance}
        onChangeText={setBalance}
        returnKeyType="next"
        onSubmitEditing={() => annualInterestRateRef.current.focus()}
        blurOnSubmit={false}
      />
        <TextInput
        ref={annualInterestRateRef}
        style={styles.input}
        placeholder="Enter the annual interest rate (%)"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={annualInterestRate}
        onChangeText={setAnnualInterestRate}
        returnKeyType="next"
        onSubmitEditing={() => monthlyPaymentRef.current.focus()}
        blurOnSubmit={false}
      />
             <TextInput
        ref={monthlyPaymentRef}
        style={styles.input}
        placeholder="Enter the monthly payment"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={monthlyPayment}
        onChangeText={setMonthlyPayment}
        returnKeyType="done"
       
      />


      <Text style={styles.label}>Types Of Payments:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={paymentStrategy}
          style={styles.picker}
          onValueChange={(itemValue) => setPaymentStrategy(itemValue)}
          dropdownIconColor="white" // Optional: to change the dropdown arrow color
        >
          <Picker.Item label="Minimum Payment" value="minimum" />
          <Picker.Item label="Fixed Payment" value="fixed" />
        </Picker>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.calculateButton]}
          onPress={calculateDebtPayoff}
        >
          <Text style={styles.buttonText}>CALCULATE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.clearButton]}
          onPress={clearAll}
        >
          <Text style={styles.buttonText}>CLEAR ALL</Text>
        </TouchableOpacity>
      </View>
      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsHeader}>Results</Text>
          {results.map((result, index) => (
            <View key={index} style={styles.resultRow}>
              <Text>Month: {result.month}</Text>
              <Text>Principal: ₹ {result.principal.toLocaleString('en-IN')} ({convertToIndianWords(result.principal)})</Text>
              <Text>Interest: ₹ {result.interest.toLocaleString('en-IN')} ({convertToIndianWords(result.interest)})</Text>
              <Text>Total Paid: ₹ {result.totalPaid.toLocaleString('en-IN')} ({convertToIndianWords(result.totalPaid)})</Text>
              <Text>Balance: ₹ {result.balance.toLocaleString('en-IN')} ({convertToIndianWords(result.balance)})</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20, // Adjust as needed for spacing from the top
    paddingHorizontal: 15,
    backgroundColor: "black",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center", // Center the header text
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  calculateButton: {
    backgroundColor: "orange",
    marginRight: 5,
  },
  clearButton: {
    backgroundColor: "red",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: "white",
    borderColor: "orange",
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "orange",
    backgroundColor: "orange",
    height: 50,
  },
  picker: {
    color: "white",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "orange",
    height: 50,
  },
  resultsContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "orange",
    padding: 10,
  },
  resultsHeader: {
    fontSize: 20,
    color: "black",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  resultRow: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingBottom: 10,
  },
});

export default DebtPayoffCalculator;
